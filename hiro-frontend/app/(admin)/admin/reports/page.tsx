"use client";

import { useEffect, useState, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import axios from "axios";
import { io, Socket } from "socket.io-client";

interface Booking {
  date: string;
  count: number;
}

interface Quote {
  date: string;
  count: number;
}

interface EquipmentUsage {
  equipment: string;
  usageCount: number;
}

const API_BASE = "http://localhost:5000";

export default function ReportsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [equipmentUsage, setEquipmentUsage] = useState<EquipmentUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const socketRef = useRef<Socket | null>(null);

  /* =========================
     Fetch reports from API
  ========================= */
  const fetchReports = async (start?: string, end?: string) => {
    setLoading(true);
    try {
      const [bookingsRes, quotesRes, equipmentRes] = await Promise.all([
        axios.get(`${API_BASE}/api/reports/bookings`, { params: { start, end } }),
        axios.get(`${API_BASE}/api/reports/quotes`, { params: { start, end } }),
        axios.get(`${API_BASE}/api/reports/equipment-usage`, { params: { start, end } }),
      ]);

      setBookings(bookingsRes.data || []);
      setQuotes(quotesRes.data || []);
      setEquipmentUsage(equipmentRes.data || []);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     Socket setup for real-time updates
  ========================= */
  useEffect(() => {
    fetchReports(); // initial fetch

    const socket = io(API_BASE, { transports: ["websocket"] });
    socketRef.current = socket;

    // New booking event
    socket.on("newBooking", (booking: Booking) => {
      setBookings((prev) => {
        // Merge or append new booking for the same date
        const index = prev.findIndex((b) => b.date === booking.date);
        if (index !== -1) {
          const updated = [...prev];
          updated[index].count += booking.count;
          return updated;
        }
        return [...prev, booking];
      });
    });

    // New quote event
    socket.on("newQuote", (quote: Quote) => {
      setQuotes((prev) => {
        const index = prev.findIndex((q) => q.date === quote.date);
        if (index !== -1) {
          const updated = [...prev];
          updated[index].count += quote.count;
          return updated;
        }
        return [...prev, quote];
      });
    });

    // Equipment usage update
    socket.on("equipmentUsed", (usage: EquipmentUsage) => {
      setEquipmentUsage((prev) => {
        const index = prev.findIndex((e) => e.equipment === usage.equipment);
        if (index !== -1) {
          const updated = [...prev];
          updated[index].usageCount += usage.usageCount;
          return updated;
        }
        return [...prev, usage];
      });
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  // Re-fetch if date range changes
  useEffect(() => {
    if (startDate && endDate) {
      fetchReports(startDate, endDate);
    }
  }, [startDate, endDate]);

  if (loading) return <p className="text-center mt-20">Loading reports...</p>;

  return (
    <div className="p-6 space-y-8">
      {/* Date filters */}
      <section className="flex gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 p-2 border rounded"
          />
        </div>
        <button
          onClick={() => fetchReports(startDate, endDate)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Filter
        </button>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold">Total Bookings</h2>
          <p className="mt-2 text-3xl font-bold">{bookings.reduce((a, b) => a + b.count, 0)}</p>
        </div>
        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold">Total Quotes</h2>
          <p className="mt-2 text-3xl font-bold">{quotes.reduce((a, b) => a + b.count, 0)}</p>
        </div>
        <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold">Equipment Usage</h2>
          <p className="mt-2 text-3xl font-bold">{equipmentUsage.reduce((a, b) => a + b.usageCount, 0)}</p>
        </div>
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Bookings Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={bookings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#1D4ED8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Quotes Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={quotes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Equipment Usage Table */}
      <section className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Equipment Usage</h3>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2">Equipment</th>
              <th className="text-left px-4 py-2">Usage Count</th>
            </tr>
          </thead>
          <tbody>
            {equipmentUsage.map((eq) => (
              <tr key={eq.equipment} className="border-b">
                <td className="px-4 py-2">{eq.equipment}</td>
                <td className="px-4 py-2">{eq.usageCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}