"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";

type Booking = {
  id: number;
  client: string;
  type: "Catering" | "Equipment" | "Staff";
  date: string;
  status: "Upcoming" | "Completed" | "Cancelled";
  amount: number;
};

// Dummy bookings data
const bookingsData: Booking[] = [
  { id: 1, client: "Alice", type: "Catering", date: "2025-11-20", status: "Upcoming", amount: 5000 },
  { id: 2, client: "Bob", type: "Equipment", date: "2025-11-18", status: "Completed", amount: 3000 },
  { id: 3, client: "Charlie", type: "Staff", date: "2025-11-22", status: "Upcoming", amount: 2000 },
  { id: 4, client: "David", type: "Catering", date: "2025-11-15", status: "Completed", amount: 8000 },
  { id: 5, client: "Eve", type: "Equipment", date: "2025-11-21", status: "Upcoming", amount: 4500 },
];

export default function OrdersPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"All" | "Catering" | "Equipment" | "Staff">("All");
  const [filterStatus, setFilterStatus] = useState<"All" | "Upcoming" | "Completed" | "Cancelled">("All");

  useEffect(() => {
    setBookings(bookingsData);
  }, []);

  const handleQuickAction = (action: string) => {
    alert(`Quick Action: ${action} clicked! Implement modal or redirect here.`);
  };

  const handleView = (booking: Booking) => {
    alert(`Viewing details for ${booking.client}'s ${booking.type} booking.`);
  };

  const handleEdit = (booking: Booking) => {
    alert(`Editing ${booking.client}'s ${booking.type} booking.`);
  };

  const handleDelete = (bookingId: number) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesType = filterType === "All" || b.type === filterType;
    const matchesStatus = filterStatus === "All" || b.status === filterStatus;
    const matchesSearch = b.client.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-[#002366] mb-6">Orders / Bookings - Hiro Catering</h1>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => handleQuickAction("Add Booking")}
          className="flex items-center gap-2 px-5 py-3 bg-[#002366] text-white font-semibold rounded-lg shadow hover:bg-[#001a4d] transition"
        >
          <FaPlus /> Add Booking
        </button>
        <button
          onClick={() => handleQuickAction("Add Repair")}
          className="flex items-center gap-2 px-5 py-3 bg-[#4da6ff] text-white font-semibold rounded-lg shadow hover:bg-[#3399ff] transition"
        >
          <FaPlus /> Add Repair
        </button>
        <button
          onClick={() => handleQuickAction("Add Staff Hire")}
          className="flex items-center gap-2 px-5 py-3 bg-[#9ec5fe] text-white font-semibold rounded-lg shadow hover:bg-[#80bfff] transition"
        >
          <FaPlus /> Add Staff Hire
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by client"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-60"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as any)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="All">All Types</option>
          <option value="Catering">Catering</option>
          <option value="Equipment">Equipment</option>
          <option value="Staff">Staff</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="All">All Status</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-lg rounded-xl p-5">
        <h2 className="text-xl font-semibold text-[#002366] mb-4">Bookings Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-[#002366] text-white">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Client</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Amount (KES)</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => (
                <tr key={b.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{b.id}</td>
                  <td className="p-3">{b.client}</td>
                  <td className="p-3">{b.type}</td>
                  <td className="p-3">{b.date}</td>
                  <td
                    className={`p-3 font-semibold ${
                      b.status === "Upcoming" ? "text-blue-600" :
                      b.status === "Completed" ? "text-green-600" :
                      "text-red-600"
                    }`}
                  >
                    {b.status}
                  </td>
                  <td className="p-3">{b.amount.toLocaleString()}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleView(b)}
                      className="px-3 py-1 bg-[#4da6ff] text-white rounded hover:bg-[#3399ff] transition"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleEdit(b)}
                      className="px-3 py-1 bg-[#9ec5fe] text-white rounded hover:bg-[#80bfff] transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-5 text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}