"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck, FaTrash, FaTimes } from "react-icons/fa";

interface BookingItem {
  id: string;
  name: string;
  quantity: number;
}

interface Booking {
  _id: string;
  fullName: string;
  phone: string;
  location: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  items: BookingItem[];
  createdAt: string;
}

export default function AdminEquipmentBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [deleteBookingId, setDeleteBookingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/equipment-bookings");
      setBookings(res.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (id: string, status: "approved" | "rejected") => {
    try {
      await axios.put(`http://localhost:5000/api/equipment-bookings/${id}/status`, { status });
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDeleteBooking = async () => {
    if (!deleteBookingId) return;
    try {
      await axios.delete(`http://localhost:5000/api/equipment-bookings/${deleteBookingId}`);
      setBookings((prev) => prev.filter((b) => b._id !== deleteBookingId));
      setDeleteBookingId(null);
    } catch (err) {
      console.error("Failed to delete booking:", err);
    }
  };

  const filteredBookings = bookings.filter((b) =>
    filter === "all" ? true : b.status === filter
  );

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-[#001f3f] mb-6">Equipment Bookings</h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              filter === f
                ? "bg-[#00b8e6] text-white"
                : "bg-white border border-[#001f3f] hover:bg-[#00b8e6] hover:text-white"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && <p className="text-center text-gray-500">Loading bookings...</p>}

      {/* No Bookings */}
      {!loading && filteredBookings.length === 0 && (
        <p className="text-center text-gray-500">No bookings found.</p>
      )}

      {/* Bookings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading &&
          filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[#001f3f]">{booking.fullName}</h2>
                <p className="text-gray-600">{booking.phone}</p>
                <p className="text-gray-600">{booking.location}</p>
                <p className="text-gray-600">
                  Booking Date: {new Date(booking.date).toLocaleDateString()}
                </p>
                <p
                  className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    booking.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : booking.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {booking.status.toUpperCase()}
                </p>
              </div>

              {/* Items */}
              <div className="mb-4">
                <h3 className="font-semibold text-[#001f3f] mb-2">Booked Items:</h3>
                <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
                  {booking.items && booking.items.length > 0 ? (
                    booking.items.map((item, index) => (
                      <div
                        key={index}
                        className="bg-[#00b8e6]/20 text-[#001f3f] px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {item.name} × {item.quantity}
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400">No items selected</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {booking.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(booking._id, "approved")}
                      className="flex items-center gap-1 px-3 py-2 bg-[#001f3f] text-white rounded-lg hover:bg-[#001a35]"
                    >
                      <FaCheck /> Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(booking._id, "rejected")}
                      className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <FaTimes /> Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => setDeleteBookingId(booking._id)}
                  className="flex items-center gap-1 px-3 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteBookingId && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg flex flex-col gap-4">
            <h3 className="text-xl font-bold text-[#001f3f]">Confirm Delete</h3>
            <p>Are you sure you want to delete this booking? This action cannot be undone.</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setDeleteBookingId(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteBooking}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}