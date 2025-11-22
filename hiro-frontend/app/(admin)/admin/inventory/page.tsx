"use client";

import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  status: "Available" | "Low" | "Out of Stock";
}

export default function AdminInventory() {
  const [items, setItems] = useState<InventoryItem[]>([
    { id: 1, name: "Chicken", category: "Meat", quantity: 20, unit: "kg", price: 500, status: "Available" },
    { id: 2, name: "Rice", category: "Grains", quantity: 50, unit: "kg", price: 100, status: "Available" },
    { id: 3, name: "Tomatoes", category: "Vegetables", quantity: 10, unit: "kg", price: 80, status: "Low" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: 0,
    unit: "",
    price: 0,
    status: "",
  });

  const openModal = () => {
    setEditingItem(null);
    setFormData({ name: "", category: "", quantity: 0, unit: "", price: 0, status: "" });
    setIsModalOpen(true);
  };

  const editItem = (item: InventoryItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setItems((prev) =>
        prev.map((i) => (i.id === editingItem.id ? { ...formData, id: editingItem.id } : i))
      );
    } else {
      setItems((prev) => [
        ...prev,
        { ...formData, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
      ]);
    }
    closeModal();
  };

  const deleteItem = (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#002366]">Inventory Management</h1>
        <button
          onClick={openModal}
          className="flex items-center bg-[#002366] hover:bg-[#001a4d] text-white px-4 py-2 rounded-lg shadow transition"
        >
          <FaPlus className="mr-2" /> Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white shadow rounded-lg p-4 flex justify-between items-start">
            <div>
              <p className="font-semibold text-[#002366]">{item.name}</p>
              <p className="text-gray-500">{item.category}</p>
              <p className="text-gray-500">
                {item.quantity} {item.unit} - Ksh {item.price}
              </p>
              <p className={`font-medium ${
                item.status === "Available" ? "text-green-600" :
                item.status === "Low" ? "text-yellow-600" :
                "text-red-600"
              }`}>{item.status}</p>
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <button
                onClick={() => editItem(item)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => deleteItem(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-slide-in">
            <h2 className="text-2xl font-bold mb-4 text-[#002366]">
              {editingItem ? "Edit Item" : "Add Item"}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Item Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002366]"
              />
              <input
                type="text"
                placeholder="Category *"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002366]"
              />
              <input
                type="number"
                placeholder="Quantity *"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002366]"
              />
              <input
                type="text"
                placeholder="Unit (kg, L, pcs) *"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002366]"
              />
              <input
                type="number"
                placeholder="Price per unit *"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002366]"
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002366]"
              >
                <option value="">Select Status</option>
                <option value="Available">Available</option>
                <option value="Low">Low</option>
                <option value="Out of Stock">Out of Stock</option>
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
                  className="px-4 py-2 bg-[#002366] text-white rounded-lg hover:bg-[#001a4d] transition"
                >
                  {editingItem ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}