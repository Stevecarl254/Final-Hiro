"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaChair, FaUtensils, FaGlassCheers, FaGift, FaPlus, FaTrash } from "react-icons/fa";

interface Equipment {
  _id: string;
  name: string;
  type: string;
  category: string;
  size?: string;
}

const categories = [
  { name: "Tents", icon: <FaChair /> },
  { name: "Chairs & Seating", icon: <FaChair /> },
  { name: "Tables & Tableware", icon: <FaUtensils /> },
  { name: "Decor & Linens", icon: <FaGift /> },
  { name: "Stage & Lighting", icon: <FaGlassCheers /> },
  { name: "Accessories", icon: <FaGift /> },
];

export default function AdminEquipment() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("");
  const [newCategory, setNewCategory] = useState(categories[0].name);
  const [newSize, setNewSize] = useState("");

  // Notification card state
  const [notification, setNotification] = useState<{
    type: "error" | "confirm";
    message: string;
    onConfirm?: () => void;
  } | null>(null);

  // Fetch all equipment
  const fetchEquipment = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/equipment");
      setEquipment(res.data.data || []);
    } catch (err) {
      console.error("Error fetching equipment:", err);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  // Handle adding new equipment
  const handleAddEquipment = async () => {
    if (!newName.trim() || !newType.trim()) {
      setNotification({ type: "error", message: "Please fill in Name and Type!" });
      return;
    }

    const duplicate = equipment.find(
      (eq) =>
        eq.name.toLowerCase() === newName.toLowerCase() &&
        eq.type.toLowerCase() === newType.toLowerCase() &&
        eq.category === newCategory &&
        eq.size === newSize
    );
    if (duplicate) {
      setNotification({ type: "error", message: "This equipment already exists in the category" });
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/equipment", {
        name: newName,
        type: newType,
        category: newCategory,
        size: newSize,
      });
      setEquipment((prev) => [...prev, res.data]);
      setShowModal(false);
      setNewName("");
      setNewType("");
      setNewCategory(categories[0].name);
      setNewSize("");
      setSelectedCategory(newCategory);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle delete
  const handleDeleteEquipment = (id: string) => {
    setNotification({
      type: "confirm",
      message: "Are you sure you want to delete this equipment?",
      onConfirm: async () => {
        try {
          await axios.delete(`http://localhost:5000/api/equipment/${id}`);
          setEquipment((prev) => prev.filter((eq) => eq._id !== id));
          setNotification(null);
        } catch (err) {
          console.error(err);
        }
      },
    });
  };

  // Filter and search
  const filteredEquipment = equipment
    .filter((eq) => eq?.category === selectedCategory)
    .filter((eq) => eq?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  const totalPages = Math.ceil(filteredEquipment.length / itemsPerPage);
  const currentItems = filteredEquipment.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="min-h-screen py-16 px-6 md:px-20 bg-gray-50 relative">
      {/* Background icons */}
      <div className="absolute inset-0 opacity-5 bg-[url('/catering-icons.svg')] bg-repeat" />

      {/* Header */}
      <section className="text-center mb-6 relative z-10">
        <h1 className="text-4xl font-bold text-[#001f3f] mb-2">
          Admin: Equipment Management
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Add and manage all catering equipment. Assign each item to a category, type, and size.
        </p>
      </section>

      {/* Add & Search */}
      <section className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#00b8e6] hover:bg-blue-700 text-white px-6 py-2 rounded transition-all"
        >
          <FaPlus /> Add Equipment
        </button>
        <input
          type="text"
          placeholder="Search equipment..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
      </section>

      {/* Category Filter */}
      <section className="relative z-10 mb-6 flex flex-wrap justify-center gap-4">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => { setSelectedCategory(cat.name); setCurrentPage(1); }}
            className={`px-6 py-2 rounded-full font-semibold border transition-colors flex items-center gap-2 ${
              selectedCategory === cat.name
                ? "bg-[#00b8e6] text-white border-[#00b8e6]"
                : "bg-white text-[#001f3f] border-gray-300 hover:bg-[#00b8e6] hover:text-white"
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </section>

      {/* Equipment Grid */}
      <section className="relative z-10 mb-12">
        {currentItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-6">No equipment in this category.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentItems.map((eq) => (
              <motion.div
                key={eq._id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all border border-gray-100 relative flex flex-col justify-between"
                whileHover={{ scale: 1.03 }}
              >
                <div>
                  <h4 className="text-lg font-bold text-[#001f3f]">{eq.name}</h4>
                  <p className="text-gray-500 mt-1"><strong>Type:</strong> {eq.type}</p>
                  {eq.size && <p className="text-gray-500 mt-1"><strong>Size:</strong> {eq.size}</p>}
                  <p className="text-gray-500 mt-1"><strong>Category:</strong> {eq.category}</p>
                </div>
                <button
                  className="absolute top-3 right-3 text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteEquipment(eq._id)}
                >
                  <FaTrash />
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 bg-[#001f3f] text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded border ${
                  currentPage === i + 1
                    ? "bg-[#00b8e6] text-white border-[#00b8e6]"
                    : "bg-white border-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 bg-[#001f3f] text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* Add Equipment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-30" onClick={() => setShowModal(false)} />
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 z-10 w-full max-w-md relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Add Equipment</h3>
            <input
              type="text"
              placeholder="Equipment name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />
            <input
              type="text"
              placeholder="Type"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />
            <input
              type="text"
              placeholder="Size (optional)"
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            >
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEquipment}
                className="px-4 py-2 rounded bg-[#00b8e6] text-white hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Notification Card */}
      {notification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-30" onClick={() => setNotification(null)} />
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-xl z-10 max-w-sm w-full text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <p className="text-gray-700 mb-4">{notification.message}</p>
            {notification.type === "confirm" ? (
              <div className="flex justify-center gap-4">
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setNotification(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={notification.onConfirm}
                >
                  Delete
                </button>
              </div>
            ) : (
              <button
                className="px-4 py-2 bg-[#00b8e6] text-white rounded hover:bg-blue-700"
                onClick={() => setNotification(null)}
              >
                OK
              </button>
            )}
          </motion.div>
        </div>
      )}
    </main>
  );
}