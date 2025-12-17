"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    // Fetch gallery data from backend
    fetch("http://localhost:5000/api/gallery")
      .then((res) => res.json())
      .then((data) => setGalleryItems(data))
      .catch((err) => console.error("Failed to fetch gallery:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#001f3f] mb-4">
          Event Gallery
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Explore our professionally executed events, showcasing our premium
          hospitality and catering services.
        </p>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryItems.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No gallery items yet.
          </p>
        ) : (
          galleryItems.map((item) => (
            <motion.div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <img
                  src={`http://localhost:5000${item.imageUrl}`}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold px-2 text-center">
                    {item.title}
                  </p>
                </div>
              </div>
              {item.description && (
                <div className="p-4">
                  <p className="text-gray-700">{item.description}</p>
                </div>
              )}
            </motion.div>
          ))
        )}
      </section>
    </div>
  );
};

export default GalleryPage;