"use client";

import { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Staff {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default function AdminStaff() {
  const [staffList, setStaffList] = useState<Staff[]>([
    { id: 1, name: "James", email: "james@example.com", phone: "0712345678", role: "Chef" },
    { id: 2, name: "Mary", email: "mary@example.com", phone: "0723456789", role: "Waiter" },
    { id: 3, name: "Peter", email: "peter@example.com", phone: "0734567890", role: "Manager" },
    { id: 4, name: "Lucy", email: "lucy@example.com", phone: "0745678901", role: "Cleaner" },
    { id: 5, name: "Tom", email: "tom@example.com", phone: "0756789012", role: "Chef" },
    { id: 6, name: "Anna", email: "anna@example.com", phone: "0767890123", role: "Waiter" },
    { id: 7, name: "Mark", email: "mark@example.com", phone: "0778901234", role: "Manager" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", role: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const openModal = () => {
    setEditingStaff(null);
    setFormData({ name: "", email: "", phone: "", role: "" });
    setIsModalOpen(true);
  };

  const editStaff = (staff: Staff) => {
    setEditingStaff(staff);
    setFormData({ ...staff });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStaff) {
      setStaffList((prev) =>
        prev.map((s) => (s.id === editingStaff.id ? { ...formData, id: editingStaff.id } : s))
      );
    } else {
      setStaffList((prev) => [
        ...prev,
        { ...formData, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
      ]);
    }
    closeModal();
  };

  const deleteStaff = (id: number) => {
    if (confirm("Are you sure you want to delete this staff member?")) {
      setStaffList((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const filteredStaff = staffList.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (roleFilter === "" || s.role === roleFilter)
  );

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const paginatedStaff = filteredStaff.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const roles = Array.from(new Set(staffList.map((s) => s.role)));

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-[#002366]">Staff Management</h1>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002366]"
          />
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002366]"
          >
            <option value="">All Roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <button
            onClick={openModal}
            className="flex items-center bg-[#002366] hover:bg-[#9e9210] text-white px-4 py-2 rounded-lg shadow transition"
          >
            <FaPlus className="mr-2" /> Add Staff
          </button>
        </div>
      </div>

      {/* Staff Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedStaff.map((staff) => (
          <div
            key={staff.id}
            className="bg-white p-5 rounded-xl shadow flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-[#002366]">{staff.name}</h2>
              <p className="text-gray-600">Role: {staff.role}</p>
              <p className="text-gray-600">Email: {staff.email}</p>
              <p className="text-gray-600">Phone: {staff.phone}</p>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => editStaff(staff)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => deleteStaff(staff.id)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-lg flex items-center gap-1 ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <FaArrowLeft /> Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded-lg ${
              page === currentPage
                ? "bg-[#002366] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-lg flex items-center gap-1 ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Next <FaArrowRight />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-slide-in">
            <h2 className="text-2xl font-bold mb-4 text-[#002366]">
              {editingStaff ? "Edit Staff" : "Add Staff"}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002366]"
              />
              <input
                type="email"
                placeholder="Email *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002366]"
              />
              <input
                type="text"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002366]"
              />
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002366]"
              >
                <option value="">Select Role</option>
                <option value="Chef">Chef</option>
                <option value="Waiter">Waiter</option>
                <option value="Manager">Manager</option>
                <option value="Cleaner">Cleaner</option>
              </select>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#002366] text-white rounded-lg hover:bg-[#9e9210] transition"
                >
                  {editingStaff ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}