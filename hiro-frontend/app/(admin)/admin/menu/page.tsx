"use client";

import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface Meal {
  id: number;
  name: string;
  category: string;
  mealTime: string;
  price: number;
  rating: number;
  image: string;
}

export default function AdminMenu() {
  const [meals, setMeals] = useState<Meal[]>([
    { id: 1, name: "Grilled Chicken", category: "Chicken", mealTime: "Lunch", price: 1200, rating: 5, image: "/sample1.jpg" },
    { id: 2, name: "Beef Steak", category: "Beef", mealTime: "Dinner", price: 1800, rating: 4, image: "/sample2.jpg" },
    { id: 3, name: "Pancakes", category: "Dessert", mealTime: "Breakfast", price: 600, rating: 5, image: "/sample3.jpg" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [formData, setFormData] = useState({ name: "", category: "", mealTime: "", price: "", rating: 5, image: "" });

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterMealTime, setFilterMealTime] = useState("All");
  const [filterRating, setFilterRating] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 9;

  const openModal = () => {
    setEditingMeal(null);
    setFormData({ name: "", category: "", mealTime: "", price: "", rating: 5, image: "" });
    setIsModalOpen(true);
  };

  const editMeal = (meal: Meal) => {
    setEditingMeal(meal);
    setFormData({ ...meal, price: meal.price.toString() });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMeal: Meal = {
      id: editingMeal ? editingMeal.id : meals.length + 1,
      name: formData.name,
      category: formData.category,
      mealTime: formData.mealTime,
      price: Number(formData.price),
      rating: Number(formData.rating),
      image: formData.image,
    };

    if (editingMeal) {
      setMeals((prev) => prev.map((m) => (m.id === editingMeal.id ? newMeal : m)));
    } else {
      setMeals((prev) => [...prev, newMeal]);
    }
    closeModal();
  };

  const deleteMeal = (id: number) => {
    if (confirm("Are you sure you want to delete this meal?")) {
      setMeals((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const filteredMeals = meals
    .filter((meal) => meal.name.toLowerCase().includes(search.toLowerCase()))
    .filter((meal) => (filterCategory === "All" ? true : meal.category === filterCategory))
    .filter((meal) => (filterMealTime === "All" ? true : meal.mealTime === filterMealTime))
    .filter((meal) => (filterRating === "All" ? true : meal.rating === Number(filterRating)));

  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = filteredMeals.slice(indexOfFirstMeal, indexOfLastMeal);
  const totalPages = Math.ceil(filteredMeals.length / mealsPerPage);

  const renderStars = (rating: number) => "⭐".repeat(rating) + "☆".repeat(5 - rating);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#002366]">Menu Management</h1>
        <button
          onClick={openModal}
          className="flex items-center bg-[#002366] hover:bg-[#001a4d] text-white px-4 py-2 rounded-lg shadow transition"
        >
          <FaPlus className="mr-2" /> Add Meal
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <div className="w-full lg:w-1/4 space-y-4 bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold text-[#002366] mb-2">Filters</h2>

          <div>
            <label className="block mb-1">Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="All">All</option>
              <option value="Chicken">Chicken</option>
              <option value="Beef">Beef</option>
              <option value="Dessert">Dessert</option>
              <option value="Vegetarian">Vegetarian</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Meal Time</label>
            <select
              value={filterMealTime}
              onChange={(e) => setFilterMealTime(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="All">All</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Rating</label>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="All">All</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search meals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentMeals.map((meal) => (
              <div key={meal.id} className="bg-white rounded-xl shadow p-4 flex flex-col">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
                <h3 className="font-semibold text-[#002366] text-lg">{meal.name}</h3>
                <p className="text-gray-600">{meal.category} | {meal.mealTime}</p>
                <p className="font-semibold">KES {meal.price}</p>
                <p className="text-yellow-500">{renderStars(meal.rating)}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => editMeal(meal)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg flex-1"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteMeal(meal.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg flex-1"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-lg border ${
                  currentPage === i + 1 ? "bg-[#002366] text-white" : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 overflow-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative animate-slide-in">
            <h2 className="text-2xl font-bold mb-4 text-[#002366]">
              {editingMeal ? "Edit Meal" : "Add Meal"}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Meal Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002366]"
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">Select Category</option>
                <option value="Chicken">Chicken</option>
                <option value="Beef">Beef</option>
                <option value="Dessert">Dessert</option>
                <option value="Vegetarian">Vegetarian</option>
              </select>
              <select
                value={formData.mealTime}
                onChange={(e) => setFormData({ ...formData, mealTime: e.target.value })}
                required
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">Select Meal Time</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
              <input
                type="number"
                placeholder="Price *"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002366]"
              />
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                required
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value={5}>5</option>
                <option value={4}>4</option>
                <option value={3}>3</option>
                <option value={2}>2</option>
                <option value={1}>1</option>
              </select>

              <div>
                <label className="block mb-1 font-medium">Meal Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onload = (ev) => setFormData({ ...formData, image: ev.target?.result as string });
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#002366]"
                />
              </div>

              {formData.image && (
                <img src={formData.image} alt="Preview" className="mt-2 w-full h-40 object-cover rounded-lg" />
              )}

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
                  {editingMeal ? "Update" : "Create"}
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