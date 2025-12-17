"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaChair, FaUtensils, FaGift, FaGlassCheers } from "react-icons/fa";

// --- Equipment Interface ---
interface Equipment {
  _id: string;
  name: string;
  type: string;
  category: string;
  size?: string;
}

// --- Categories ---
const categories = [
  {
    name: "Tents",
    icon: <FaChair />,
    btn: "bg-blue-500 text-white border-blue-500",
    badge: "bg-blue-100 text-blue-800",
  },
  {
    name: "Chairs & Seating",
    icon: <FaChair />,
    btn: "bg-indigo-500 text-white border-indigo-500",
    badge: "bg-indigo-100 text-indigo-800",
  },
  {
    name: "Tables & Tableware",
    icon: <FaUtensils />,
    btn: "bg-green-500 text-white border-green-500",
    badge: "bg-green-100 text-green-800",
  },
  {
    name: "Decor & Linens",
    icon: <FaGift />,
    btn: "bg-purple-500 text-white border-purple-500",
    badge: "bg-purple-100 text-purple-800",
  },
  {
    name: "Stage & Lighting",
    icon: <FaGlassCheers />,
    btn: "bg-pink-500 text-white border-pink-500",
    badge: "bg-pink-100 text-pink-800",
  },
  {
    name: "Accessories",
    icon: <FaGift />,
    btn: "bg-yellow-500 text-white border-yellow-500",
    badge: "bg-yellow-100 text-yellow-800",
  },
];

// --- ModalSearch Props Interface ---
interface ModalSearchProps {
  modalSearch: string;
  setModalSearch: (value: string) => void;
  modalFiltered: Equipment[];
  selectedEquipments: { id: string; name: string; quantity: number }[];
  handleEquipmentToggle: (eq: Equipment) => void;
}

// --- ModalSearch Component ---
function ModalSearch({
  modalSearch,
  setModalSearch,
  modalFiltered,
  selectedEquipments,
  handleEquipmentToggle,
}: ModalSearchProps) {
  const modalDropdownRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [alreadySelectedMessage, setAlreadySelectedMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalSearch(e.target.value);
    setAlreadySelectedMessage("");
    setIsDropdownOpen(true);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalDropdownRef.current &&
        !modalDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Show available equipments including variants (size/type)
  const availableEquipments = modalFiltered.filter((eq) => {
    // Already selected check
    const exists = selectedEquipments.find(
      (se) => se.id === eq._id
    );
    return !exists;
  });

  const handleSelect = (eq: Equipment) => {
    const exists = selectedEquipments.find((se) => se.id === eq._id);
    if (exists) {
      setAlreadySelectedMessage("This equipment is already selected");
      return;
    }
    handleEquipmentToggle(eq);
    setIsDropdownOpen(false);
    setModalSearch(""); // reset search after selection
  };

  return (
    <div className="relative" ref={modalDropdownRef}>
      <input
        type="text"
        placeholder="Search for equipment..."
        value={modalSearch}
        onChange={handleChange}
        className="border p-3 w-full rounded"
      />

      {alreadySelectedMessage && (
        <p className="text-red-500 mt-1">{alreadySelectedMessage}</p>
      )}

      {isDropdownOpen && modalSearch.trim() !== "" && (
        <div className="absolute z-20 mt-1 w-full bg-white border rounded shadow max-h-48 overflow-y-auto">
          {availableEquipments.length > 0 ? (
            availableEquipments.map((eq) => {
              // Check other variants with same name
              const variants = modalFiltered.filter(
                (v) => v.name === eq.name && v._id !== eq._id
              );
              const variantText =
                variants.length > 0
                  ? ` (Also available: ${variants
                      .map((v) => v.size || v.type || "")
                      .filter(Boolean)
                      .join(", ")})`
                  : "";
              return (
                <div
                  key={eq._id}
                  className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(eq)}
                >
                  <span>
                    {eq.name}
                    {eq.size ? ` - ${eq.size}` : ""}
                    {eq.type ? ` (${eq.type})` : ""}
                    {variantText}
                  </span>
                </div>
              );
            })
          ) : (
            <p className="p-2 text-gray-500">No equipment available.</p>
          )}
        </div>
      )}
    </div>
  );
}

// --- Main Component ---
export default function UserEquipment() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Tents");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    fullName: "",
    phone: "",
    location: "",
    date: "",
    selectedEquipments: [] as { id: string; name: string; quantity: number }[],
  });
  // Booking message state for showing success or error
const [bookingMessage, setBookingMessage] = useState<{
  type: "success" | "error";
  text: string;
} | null>(null);
  const [modalSearch, setModalSearch] = useState("");
// Inside your UserEquipment component, near the other useState hooks
const [isSubmitting, setIsSubmitting] = useState(false);

  /* Disable page scroll when modal is open */
  useEffect(() => {
    if (isBookingOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isBookingOpen]);

  useEffect(() => {
    const fetchEquipment = async () => {
      const res = await axios.get("http://localhost:5000/api/equipment");
      setEquipment(res.data.data || []);
    };
    fetchEquipment();
  }, []);

  const filtered = equipment
    .filter((eq) => eq.category === selectedCategory)
    .filter(
      (eq) =>
        eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eq.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (eq.size && eq.size.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const modalFiltered = equipment
    .filter((eq) =>
      eq.name.toLowerCase().includes(modalSearch.toLowerCase())
    )
    .filter((eq) => eq.category === selectedCategory)
    .sort((a, b) => a.name.localeCompare(b.name));

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const activeCategory = categories.find((c) => c.name === selectedCategory);

const handleBookingSubmit = async () => {
  // Prevent double submission
  if (isSubmitting) return;

  // Trim inputs safely
  const fullName = bookingData.fullName?.trim();
  const phone = bookingData.phone?.trim();
  const location = bookingData.location?.trim();
  const date = bookingData.date;
  const selectedEquipments = bookingData.selectedEquipments || [];

  // Validate inputs
  if (!fullName || !phone || !location || !date || selectedEquipments.length === 0) {
    setBookingMessage({
      type: "error",
      text: "Please fill in all fields and select at least one equipment.",
    });
    return;
  }

  try {
    setIsSubmitting(true);

    const res = await axios.post("http://localhost:5000/api/equipment-bookings", {
      fullName,
      phone,
      location,
      date,
      selectedEquipments,
      status: "pending", // optional default status
    });

    if (res.data.success) {
      setBookingMessage({ type: "success", text: "Booking submitted successfully!" });
      
      // Reset form
      setBookingData({
        fullName: "",
        phone: "",
        location: "",
        date: "",
        selectedEquipments: [],
      });
      setModalSearch(""); 
      
      // Close modal after short delay
      setTimeout(() => {
        setIsBookingOpen(false);
        setBookingMessage(null);
      }, 1500);
    } else {
      setBookingMessage({ type: "error", text: "Failed to submit booking. Please try again." });
    }
  } catch (err: any) {
  // Safely log the full error object
  console.error("Booking submit error:", err);

  // Extract a meaningful message
  const msg =
    err?.response?.data?.message || // if server sends { message: "..." }
    err?.message ||                 // Axios/network error message
    "An unexpected error occurred. Please try again.";

  setBookingMessage({ type: "error", text: msg });
} finally {
    setIsSubmitting(false);
  }
};

  const handleEquipmentToggle = (eq: Equipment) => {
    const exists = bookingData.selectedEquipments.find((e) => e.id === eq._id);
    if (exists) {
      setBookingData((prev) => ({
        ...prev,
        selectedEquipments: prev.selectedEquipments.filter(
          (e) => e.id !== eq._id
        ),
      }));
    } else {
      setBookingData((prev) => ({
        ...prev,
        selectedEquipments: [
          ...prev.selectedEquipments,
          { id: eq._id, name: eq.name, quantity: 1 },
        ],
      }));
    }
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setBookingData((prev) => ({
      ...prev,
      selectedEquipments: prev.selectedEquipments.map((eq) =>
        eq.id === id ? { ...eq, quantity } : eq
      ),
    }));
  };

  return (
    <main className="min-h-screen py-16 px-6 md:px-20 bg-gray-50 relative overflow-hidden">

      {/* Background icons */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <FaChair className="absolute top-10 left-10 text-7xl text-[#00b8e6]" />
        <FaUtensils className="absolute top-1/3 right-16 text-8xl text-[#00b8e6]" />
        <FaGift className="absolute bottom-20 left-1/4 text-7xl text-[#00b8e6]" />
        <FaGlassCheers className="absolute bottom-10 right-1/3 text-7xl text-[#00b8e6]" />
      </div>

      {/* Header */}
      <section className="text-center mb-10 relative z-10">
        <h1 className="text-4xl font-bold text-[#001f3f] mb-2">
          Available Equipment
        </h1>
        <p className="text-gray-600">
          Browse our professional catering equipment by category.
        </p>
      </section>

      {/* Search & Categories */}
      <section className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <input
          className="border p-3 rounded w-full md:w-1/3 shadow"
          placeholder="Search equipment..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => {
                setSelectedCategory(cat.name);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full border font-semibold transition ${
                selectedCategory === cat.name
                  ? cat.btn
                  : "bg-white border-gray-300 hover:bg-[#00b8e6] hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* CATEGORY TITLE */}
      <section className="text-center mb-8 relative z-10">
        <h2 className="text-3xl font-bold text-[#001f3f]">
          {selectedCategory} Equipment
        </h2>
      </section>

      {/* Equipment Grid */}
      <section className="relative z-10 mb-6">
        {paginated.length === 0 ? (
          <p className="text-center text-gray-500">No equipment found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginated.map((eq) => (
              <motion.div
                key={eq._id}
                whileHover={{ scale: 1.04 }}
                className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 relative"
              >
                <h4 className="text-lg font-bold text-[#001f3f] mb-3">
                  {eq.name}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                    {eq.type}
                  </span>
                  {eq.size && (
                    <span className="bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded-full">
                      {eq.size}
                    </span>
                  )}
                  <span className={`text-sm px-2 py-1 rounded-full ${activeCategory?.badge}`}>
                    {eq.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Booking Button */}
      <div className="text-center mb-12">
        <button
          onClick={() => setIsBookingOpen(true)}
          className="bg-[#00b8e6] hover:bg-[#0095c7] text-white py-3 px-8 rounded-lg font-semibold"
        >
          Book Equipment
        </button>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mb-16">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 bg-[#001f3f] text-white rounded disabled:opacity-40"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1 ? "bg-[#00b8e6] text-white" : "bg-white border"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 bg-[#001f3f] text-white rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {/* Terms */}
      <section className="bg-white p-8 rounded-2xl shadow border relative z-10">
        <h3 className="text-3xl font-semibold text-[#001f3f] mb-4">Terms & Conditions</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Bookings must be made at least 3 days in advance.</li>
          <li>50% deposit required to confirm.</li>
          <li>Damaged or lost items will be charged.</li>
          <li>Late cancellations attract a 30% fee.</li>
        </ul>
      </section>

      {/* Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/30">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col">

            {/* Header */}
            <div className="flex justify-between items-center p-4 md:p-6 border-b sticky top-0 bg-white z-10">
              <h3 className="text-xl md:text-2xl font-bold text-[#001f3f]">Equipment Booking</h3>
              <button
                onClick={() => setIsBookingOpen(false)}
                className="text-gray-500 hover:text-gray-800 font-bold text-xl"
              >
                X
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-4 md:p-6 flex-1 overflow-y-auto space-y-4">
              {/* Modal Search */}
              <ModalSearch
                modalSearch={modalSearch}
                setModalSearch={setModalSearch}
                modalFiltered={modalFiltered}
                selectedEquipments={bookingData.selectedEquipments}
                handleEquipmentToggle={handleEquipmentToggle}
              />

              {/* Selected Equipments with Quantity */}
              {bookingData.selectedEquipments.length > 0 && (
                <div className="space-y-2 border-t pt-4">
                  {bookingData.selectedEquipments.map((eq) => (
                    <div key={eq.id} className="flex justify-between items-center gap-2">
                      <span>{eq.name}</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          className="border rounded w-16 p-1"
                          value={eq.quantity}
                          onChange={(e) =>
                            handleQuantityChange(eq.id, Number(e.target.value))
                          }
                        />
                        <button
                          onClick={() => handleEquipmentToggle({ _id: eq.id, name: eq.name, type: "", category: "" })}
                          className="text-red-500 hover:text-red-700 font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

{/* Booking Message Card */}
{bookingMessage && (
  <div
    className={`p-4 mb-4 rounded-lg text-white font-semibold ${
      bookingMessage.type === "success" ? "bg-green-500" : "bg-red-500"
    } shadow-md flex items-center justify-between`}
  >
    <span>{bookingMessage.text}</span>
    <button
      className="font-bold text-white ml-4"
      onClick={() => setBookingMessage(null)}
    >
      ✕
    </button>
  </div>
)}

              {/* Booking Details */}
              <input
                className="border p-3 w-full rounded"
                placeholder="Full Name"
                value={bookingData.fullName}
                onChange={(e) =>
                  setBookingData({ ...bookingData, fullName: e.target.value })
                }
              />
              <input
                className="border p-3 w-full rounded"
                placeholder="Phone Number"
                value={bookingData.phone}
                onChange={(e) =>
                  setBookingData({ ...bookingData, phone: e.target.value })
                }
              />
              <input
                className="border p-3 w-full rounded"
                placeholder="Location"
                value={bookingData.location}
                onChange={(e) =>
                  setBookingData({ ...bookingData, location: e.target.value })
                }
              />
              <input
                type="date"
                className="border p-3 w-full rounded"
                value={bookingData.date}
                onChange={(e) =>
                  setBookingData({ ...bookingData, date: e.target.value })
                }
              />
            </div>

           {/* Footer */}
      <div className="p-4 md:p-6 border-t sticky bottom-0 bg-white z-10">
        <button
          onClick={handleBookingSubmit}
          className="w-full bg-[#00b8e6] hover:bg-[#0095c7] text-white py-3 rounded-lg font-semibold"
        >
          Submit Booking
        </button>
      </div>
    </div>
  </div>
)}
    </main>
  );
}