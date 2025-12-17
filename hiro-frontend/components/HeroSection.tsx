"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-100"
        style={{
          backgroundImage: "url('/image 1.jpeg')",
          transform: `translateY(${offsetY * 0.4}px)`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#001f3f]/60 backdrop-blur-[1px]"></div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 px-6 text-white max-w-3xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 font-['Figtree']">
          Your One-Stop Catering Solution
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-100 font-['Figtree']">
          Professional catering, event staffing, and equipment hire for every
          occasion.
        </p>

        <Link href="get-quote">
          <button className="bg-[#001f3f] text-white px-8 py-3 rounded-md font-semibold text-lg hover:bg-[#005f99] transition-all duration-300 shadow-md">
            Get a Quote
          </button>
        </Link>
      </motion.div>
    </section>
  );
}