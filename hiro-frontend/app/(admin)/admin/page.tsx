"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FaPlus } from "react-icons/fa";

type Booking = {
  id: number;
  client: string;
  type: "Catering" | "Equipment" | "Staff";
  date: string;
  status: "Upcoming" | "Completed" | "Cancelled";
  amount: number;
};

type Repair = {
  id: number;
  equipment: string;
  issue: string;
  status: "Pending" | "In Progress" | "Completed";
  cost: number;
};

type Staff = {
  id: number;
  name: string;
  role: "Waiter" | "Waitress" | "Chef" | "Cleaner" | "Manager";
  status: "Available" | "Busy" | "On Leave";
  phone: string;
};

// Dummy data
const bookingsData: Booking[] = [
  { id: 1, client: "Alice", type: "Catering", date: "2025-11-20", status: "Upcoming", amount: 5000 },
  { id: 2, client: "Bob", type: "Equipment", date: "2025-11-18", status: "Completed", amount: 3000 },
  { id: 3, client: "Charlie", type: "Staff", date: "2025-11-22", status: "Upcoming", amount: 2000 },
  { id: 4, client: "David", type: "Catering", date: "2025-11-15", status: "Completed", amount: 8000 },
  { id: 5, client: "Eve", type: "Equipment", date: "2025-11-21", status: "Upcoming", amount: 4500 },
];

const repairsData: Repair[] = [
  { id: 1, equipment: "Oven", issue: "Not heating", status: "Pending", cost: 2000 },
  { id: 2, equipment: "Mixer", issue: "Broken motor", status: "In Progress", cost: 3500 },
  { id: 3, equipment: "Fridge", issue: "Cooling problem", status: "Completed", cost: 5000 },
];

const staffData: Staff[] = [
  { id: 1, name: "James", role: "Waiter", status: "Busy", phone: "0722000001" },
  { id: 2, name: "Mary", role: "Waitress", status: "Available", phone: "0722000002" },
  { id: 3, name: "Peter", role: "Chef", status: "Busy", phone: "0722000003" },
  { id: 4, name: "Lucy", role: "Cleaner", status: "On Leave", phone: "0722000004" },
  { id: 5, name: "John", role: "Manager", status: "Available", phone: "0722000005" },
];

const lineChartData = [
  { name: "Week 1", Catering: 5000, Equipment: 2000, Staff: 1000 },
  { name: "Week 2", Catering: 7000, Equipment: 3000, Staff: 2000 },
  { name: "Week 3", Catering: 4000, Equipment: 1500, Staff: 1000 },
  { name: "Week 4", Catering: 6000, Equipment: 2500, Staff: 1500 },
];

const pieData = [
  { name: "Catering", value: 45 },
  { name: "Equipment", value: 35 },
  { name: "Staff", value: 20 },
];

const repairStatusData = [
  { name: "Pending", value: 1 },
  { name: "In Progress", value: 1 },
  { name: "Completed", value: 1 },
];

const staffStatusData = [
  { name: "Available", value: staffData.filter(s => s.status === "Available").length },
  { name: "Busy", value: staffData.filter(s => s.status === "Busy").length },
  { name: "On Leave", value: staffData.filter(s => s.status === "On Leave").length },
];

const COLORS = ["#002366", "#4da6ff", "#9ec5fe"];

export default function AdminOverview() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);

  useEffect(() => {
    setBookings(bookingsData);
    setRepairs(repairsData);
    setStaff(staffData);
  }, []);

  const totalRevenue =
    bookings.reduce((acc, b) => acc + b.amount, 0) +
    repairs.reduce((acc, r) => acc + r.cost, 0);

  const totalBookings = bookings.length;
  const upcomingBookings = bookings.filter((b) => b.status === "Upcoming").length;
  const completedBookings = bookings.filter((b) => b.status === "Completed").length;
  const totalStaffHires = bookings.filter((b) => b.type === "Staff").length;
  const totalEquipmentHires = bookings.filter((b) => b.type === "Equipment").length;
  const totalCateringServices = bookings.filter((b) => b.type === "Catering").length;
  const totalStaff = staff.length;
  const staffAvailable = staff.filter((s) => s.status === "Available").length;

  const handleQuickAction = (action: string) => {
    alert(`Quick Action: ${action} clicked! Implement modal or redirect here.`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-[#002366] mb-6">Admin Overview - Hiro Catering</h1>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mb-8">
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

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Metric cards same as before */}
        <div className="bg-white shadow-lg rounded-xl p-5 flex flex-col">
          <span className="text-gray-500">Total Bookings</span>
          <span className="text-2xl font-bold text-[#002366]">{totalBookings}</span>
          <span className="text-sm text-gray-400 mt-1">
            Upcoming: {upcomingBookings} | Completed: {completedBookings}
          </span>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-5 flex flex-col">
          <span className="text-gray-500">Revenue (KES)</span>
          <span className="text-2xl font-bold text-[#002366]">KES {totalRevenue.toLocaleString()}</span>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-5 flex flex-col">
          <span className="text-gray-500">Staff Hires</span>
          <span className="text-2xl font-bold text-[#002366]">{totalStaffHires}</span>
          <span className="text-sm text-gray-400 mt-1">Total Staff: {totalStaff}</span>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-5 flex flex-col">
          <span className="text-gray-500">Equipment Hires</span>
          <span className="text-2xl font-bold text-[#002366]">{totalEquipmentHires}</span>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-5 flex flex-col">
          <span className="text-gray-500">Catering Services</span>
          <span className="text-2xl font-bold text-[#002366]">{totalCateringServices}</span>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-5 flex flex-col">
          <span className="text-gray-500">Ongoing Repairs</span>
          <span className="text-2xl font-bold text-[#002366]">
            {repairs.filter(r => r.status !== "Completed").length}
          </span>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-5 flex flex-col">
          <span className="text-gray-500">Staff Available</span>
          <span className="text-2xl font-bold text-[#002366]">{staffAvailable}</span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* same charts as before */}
        <div className="bg-white shadow-lg rounded-xl p-5">
          <h2 className="text-xl font-semibold text-[#002366] mb-4">Bookings Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="Catering" stroke="#002366" strokeWidth={2} />
              <Line type="monotone" dataKey="Equipment" stroke="#4da6ff" strokeWidth={2} />
              <Line type="monotone" dataKey="Staff" stroke="#9ec5fe" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-5">
          <h2 className="text-xl font-semibold text-[#002366] mb-4">Booking Types Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-5">
          <h2 className="text-xl font-semibold text-[#002366] mb-4">Repair Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={repairStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {repairStatusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-5">
          <h2 className="text-xl font-semibold text-[#002366] mb-4">Staff Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={staffStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {staffStatusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings Table */}
        <div className="bg-white shadow-lg rounded-xl p-5 mb-6">
          <h2 className="text-xl font-semibold text-[#002366] mb-4">Recent Bookings</h2>
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
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{b.id}</td>
                    <td className="p-3">{b.client}</td>
                    <td className="p-3">{b.type}</td>
                    <td className="p-3">{b.date}</td>
                    <td className={`p-3 font-semibold ${
                      b.status === "Upcoming" ? "text-blue-600" :
                      b.status === "Completed" ? "text-green-600" :
                      "text-red-600"
                    }`}>{b.status}</td>
                    <td className="p-3">{b.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white shadow-lg rounded-xl p-5 mb-6">
          <h2 className="text-xl font-semibold text-[#002366] mb-4">Staff Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-[#002366] text-white">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Phone</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((s) => (
                  <tr key={s.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{s.id}</td>
                    <td className="p-3">{s.name}</td>
                    <td className="p-3">{s.role}</td>
                    <td className={`p-3 font-semibold ${
                      s.status === "Available" ? "text-green-600" :
                      s.status === "Busy" ? "text-blue-600" :
                      "text-yellow-600"
                    }`}>{s.status}</td>
                    <td className="p-3">{s.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Repairs Table */}
        <div className="bg-white shadow-lg rounded-xl p-5 mb-6">
          <h2 className="text-xl font-semibold text-[#002366] mb-4">Recent Repairs</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-[#002366] text-white">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Equipment</th>
                  <th className="p-3 text-left">Issue</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Cost (KES)</th>
                </tr>
              </thead>
              <tbody>
                {repairs.map((r) => (
                  <tr key={r.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{r.id}</td>
                    <td className="p-3">{r.equipment}</td>
                    <td className="p-3">{r.issue}</td>
                    <td className={`p-3 font-semibold ${
                      r.status === "Pending" ? "text-yellow-600" :
                      r.status === "In Progress" ? "text-blue-600" :
                      "text-green-600"
                    }`}>{r.status}</td>
                    <td className="p-3">{r.cost.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}