"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  FaTruck,
  FaUtensils,
  FaChair,
  FaGlassCheers,
  FaGift,
  FaFileContract,
} from "react-icons/fa";

export default function HiringCateringEquipment() {
  const tablesRef = useRef<HTMLDivElement>(null);
  const cutleryRef = useRef<HTMLDivElement>(null);
  const glasswareRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6 md:px-20">
      {/* Header */}
      <section className="text-center mb-12">
        <motion.h1
          className="text-4xl font-bold text-[#001f3f] mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Hiring of Catering Equipment
        </motion.h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our wide range of premium catering and event equipment for
          hire. From elegant tableware to professional-grade tools, we make
          every event seamless and stylish.
        </p>
      </section>

      {/* Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-[#001f3f] mb-6 text-center">
          Equipment Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection(tablesRef)}
            className="cursor-pointer bg-white p-6 rounded-2xl shadow-md flex flex-col items-center hover:shadow-lg border hover:border-[#00b8e6] transition-all"
          >
            <FaChair className="text-4xl text-[#00b8e6] mb-3" />
            <h3 className="text-lg font-semibold text-[#001f3f]">
              Tables & Chairs
            </h3>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection(cutleryRef)}
            className="cursor-pointer bg-white p-6 rounded-2xl shadow-md flex flex-col items-center hover:shadow-lg border hover:border-[#00b8e6] transition-all"
          >
            <FaUtensils className="text-4xl text-[#00b8e6] mb-3" />
            <h3 className="text-lg font-semibold text-[#001f3f]">
              Cutlery & Crockery
            </h3>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection(glasswareRef)}
            className="cursor-pointer bg-white p-6 rounded-2xl shadow-md flex flex-col items-center hover:shadow-lg border hover:border-[#00b8e6] transition-all"
          >
            <FaGlassCheers className="text-4xl text-[#00b8e6] mb-3" />
            <h3 className="text-lg font-semibold text-[#001f3f]">Glassware</h3>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection(decorRef)}
            className="cursor-pointer bg-white p-6 rounded-2xl shadow-md flex flex-col items-center hover:shadow-lg border hover:border-[#00b8e6] transition-all"
          >
            <FaGift className="text-4xl text-[#00b8e6] mb-3" />
            <h3 className="text-lg font-semibold text-[#001f3f]">
              Decor & Linens
            </h3>
          </motion.div>
        </div>
      </section>

      {/* Equipment Sections */}
      <div ref={tablesRef} className="mb-16">
        <h3 className="text-2xl font-semibold text-[#001f3f] mb-6">
          Tables & Chairs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Round Table", price: "Ksh 500" },
            { name: "Banquet Chair", price: "Ksh 200" },
            { name: "Cocktail Table", price: "Ksh 600" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all border border-gray-100"
              whileHover={{ scale: 1.03 }}
            >
              <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-sm">
                Image Placeholder
              </div>
              <h4 className="text-lg font-semibold text-[#001f3f] mb-2">
                {item.name}
              </h4>
              <p className="font-bold text-[#00b8e6]">{item.price}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div ref={cutleryRef} className="mb-16">
        <h3 className="text-2xl font-semibold text-[#001f3f] mb-6">
          Cutlery & Crockery
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Dinner Set", price: "Ksh 300" },
            { name: "Serving Utensils", price: "Ksh 250" },
            { name: "Dessert Cutlery", price: "Ksh 150" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all border border-gray-100"
              whileHover={{ scale: 1.03 }}
            >
              <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-sm">
                Image Placeholder
              </div>
              <h4 className="text-lg font-semibold text-[#001f3f] mb-2">
                {item.name}
              </h4>
              <p className="font-bold text-[#00b8e6]">{item.price}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div ref={glasswareRef} className="mb-16">
        <h3 className="text-2xl font-semibold text-[#001f3f] mb-6">Glassware</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Wine Glass", price: "Ksh 150" },
            { name: "Water Goblet", price: "Ksh 100" },
            { name: "Champagne Flute", price: "Ksh 180" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all border border-gray-100"
              whileHover={{ scale: 1.03 }}
            >
              <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-sm">
                Image Placeholder
              </div>
              <h4 className="text-lg font-semibold text-[#001f3f] mb-2">
                {item.name}
              </h4>
              <p className="font-bold text-[#00b8e6]">{item.price}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div ref={decorRef} className="mb-16">
        <h3 className="text-2xl font-semibold text-[#001f3f] mb-6">
          Decor & Linens
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Table Linen", price: "Ksh 250" },
            { name: "Flower Centerpieces", price: "Ksh 700" },
            { name: "Chair Covers & Sashes", price: "Ksh 300" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all border border-gray-100"
              whileHover={{ scale: 1.03 }}
            >
              <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-sm">
                Image Placeholder
              </div>
              <h4 className="text-lg font-semibold text-[#001f3f] mb-2">
                {item.name}
              </h4>
              <p className="font-bold text-[#00b8e6]">{item.price}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Special Packages */}
      <section className="mb-16 bg-[#001f3f] text-white p-10 rounded-2xl shadow-md">
        <h3 className="text-2xl font-semibold mb-4">
          Special Packages & Bundles
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Basic Event Setup – From <strong>Ksh 25,000</strong></li>
          <li>Corporate Luncheon Package – From <strong>Ksh 45,000</strong></li>
          <li>Wedding Full Set – From <strong>Ksh 120,000</strong></li>
        </ul>
      </section>

      {/* Delivery & Setup */}
      <section className="mb-16 flex flex-col md:flex-row items-center gap-8">
        <div className="text-5xl text-[#00b8e6]">
          <FaTruck />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-[#001f3f] mb-3">
            Delivery & Setup Options
          </h3>
          <p className="text-gray-600">
            We offer on-site delivery and professional setup within Nairobi and
            nearby regions. Additional transport fees may apply for
            long-distance deliveries.
          </p>
        </div>
      </section>

      {/* Terms & Conditions */}
      <section className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
        <h3 className="text-2xl font-semibold text-[#001f3f] mb-4 flex items-center gap-2">
          <FaFileContract className="text-[#00b8e6]" /> Terms & Conditions
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>All rentals must be booked at least 3 days in advance.</li>
          <li>A 50% deposit is required to confirm your booking.</li>
          <li>Damaged or lost equipment will be charged accordingly.</li>
          <li>Cancellation within 24 hours will incur a 30% fee.</li>
        </ul>
      </section>
    </main>
  );
}
