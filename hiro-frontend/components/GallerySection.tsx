"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const galleryItems = [
  {
    id: 1,
    title: "Elegant Buffet Setup",
    description:
      "A modern buffet arrangement featuring stylish plating and exquisite attention to detail.",
    image: "/buffet.jpeg", // replace with your actual image
  },
  {
    id: 2,
    title: "Outdoor Event Perfection",
    description:
      "Our outdoor catering setup designed to impress guests with charm and class.",
    image: "/outdoor.jpeg",
  },
  {
    id: 3,
    title: "Fine Dining Experience",
    description:
      "A premium indoor dining setup, showcasing Hiro’s attention to ambiance and excellence.",
    image: "/hero.jpeg",
  },
];

export default function GallerySection() {
  return (
    <section className="w-full py-24 bg-gray-100 font-['Figtree'] overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Gallery Highlights
          </h2>
          <p className="text-gray-600 text-lg mt-3">
            A glimpse into Hiro Catering’s unforgettable moments.
          </p>
        </div>

        {/* Diagonal Layout */}
        <div className="space-y-24">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col md:flex-row items-center gap-10 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="relative w-full md:w-1/2 h-80 md:h-[400px] overflow-hidden rounded-3xl shadow-lg">
                <div className="absolute inset-0 bg-gray-200" />
                <div className="w-full h-full">
                  <div
                    className="w-full h-full overflow-hidden"
                    style={{
                      clipPath: "polygon(0 0, 100% 5%, 100% 95%, 0% 100%)",
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
          <a
            href="/gallery"
            className="inline-block bg-[#00b8e6] text-white px-8 py-3 rounded-full text-lg font-medium shadow-md hover:bg-[#0099c4] transition-all"
          >
            View Full Gallery →
          </a>
        </div>
      </div>
    </section>
  );
}
