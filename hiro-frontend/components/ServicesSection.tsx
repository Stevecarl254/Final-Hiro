"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    id: 1,
    title: "Catering & Hospitality Services",
    description:
      "Delivering exquisite catering for weddings, corporate functions, and private events — crafted to perfection with warmth and professionalism.",
  },
  {
    id: 2,
    title: "Event Staffing & Hosting",
    description:
      "Providing trained, elegant, and professional staff to ensure seamless service and memorable guest experiences.",
  },
  {
    id: 3,
    title: "Catering Equipment Hire",
    description:
      "Offering a wide selection of catering equipment — from utensils to full event setups, available for short-term hire.",
  },
];

export default function ServicesSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3, // faster stagger
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // faster transition
  };

  const numberVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 bg-white font-['Figtree']">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-[#001f3f] mb-12"
        >
          Our Featured Services
        </motion.h2>

        {/* Services Cards */}
        <motion.div
          className="grid gap-10 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={containerVariants}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="group bg-[#f7faff] p-8 rounded-2xl shadow-md hover:shadow-xl relative border-t-4 border-[#00b8e6]"
              variants={cardVariants}
            >
              {/* Number badge */}
              <motion.div
                className="absolute -top-6 left-6 bg-[#001f3f] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-md border-2 border-[#00b8e6]"
                variants={numberVariants}
              >
                {service.id}
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-[#001f3f] mt-6 mb-3">
                {service.title}
              </h3>

              {/* Description with hover line */}
              <p className="text-gray-700 text-base leading-relaxed relative inline-block group-hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[3px] after:bg-[#00b8e6] after:transition-all after:duration-300">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

  {/* View More Button */}
<div className="mt-16">
  <Link href="/services/short-term-waiters">
    <button className="bg-[#001f3f] text-white px-10 py-3 rounded-full font-semibold text-lg hover:bg-[#00b8e6] hover:text-[#001f3f] transition-all duration-300 shadow-lg">
      View More Services
    </button>
  </Link>
</div>

      </div>
    </section>
  );
}
