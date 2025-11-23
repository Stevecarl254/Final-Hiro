"use client";

import React from "react";
import { CheckCircle, Users, Calendar, ClipboardList, Star } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ShortTermWaitersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* Hero Header */}
      <section className="relative bg-[#001f3f] text-white py-28 px-6 text-center overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#5cc3ff]/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#5cc3ff]/20 rounded-full translate-x-1/2 translate-y-1/2"></div>

        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4 z-10 relative"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Short Term Waiters / Waitress & Hostess
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto z-10 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Professional and trained staff for your events, ensuring smooth service and a memorable guest experience.
        </motion.p>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl font-semibold text-[#001f3f] mb-4">About Our Staff</h2>
            <p className="text-gray-700 mb-6">
              Our short-term wait staff are trained in professional service etiquette, guest management, and hospitality best practices. Whether it's a wedding, corporate event, or private party, we provide staff who are adaptable and attentive.
            </p>
            <p className="text-gray-700 mb-6">
              Each staff member is carefully selected and supervised to ensure seamless operations during your events.
            </p>
            <ul className="space-y-3">
              {["Friendly and professional team", "Trained in guest interaction & service", "Adaptable to any type of event"].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#5cc3ff] mt-1" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 gap-4"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
          >
            {[1,2,3,4].map((i) => (
              <div 
                key={i} 
                className="bg-gray-200 h-48 md:h-60 rounded-md flex items-center justify-center text-gray-500 hover:scale-105 shadow-lg transition-transform"
              >
                Image {i}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-20 px-6 bg-white">
        <motion.h2 
          className="text-3xl font-semibold text-[#001f3f] mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Our Services Include
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: Users, title: "Event Wait Staff", desc: "Professional waiters and waitresses for weddings, corporate events, and parties." },
            { icon: ClipboardList, title: "Guest Management", desc: "Hostesses who manage guest seating, registration, and smooth guest interactions." },
            { icon: Calendar, title: "Flexible Shifts", desc: "Staff available for short-term or full-event coverage, adaptable to your schedule." },
          ].map((service, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <div className="bg-[#5cc3ff]/20 p-4 rounded-full mb-4">
                <service.icon className="w-10 h-10 text-[#001f3f]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-700">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <motion.h2 
          className="text-3xl font-semibold text-[#001f3f] mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Our Staff
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.ul 
            className="space-y-5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {[
              "Experienced and professionally trained wait staff.",
              "Flexible staffing according to event size and duration.",
              "Focused on guest satisfaction and professional presentation.",
              "Supervised and managed by our hospitality team."
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[#5cc3ff] mt-1" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div 
            className="bg-gray-200 h-80 rounded-md flex items-center justify-center text-gray-500"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Image / Illustration
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-[#001f3f] text-white text-center relative overflow-hidden">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Book Our Staff Today
        </motion.h2>
        <motion.p
          className="mb-8 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Ensure your event runs smoothly with our professional waiters, waitresses, and hostesses.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-[#5cc3ff] text-[#001f3f] font-semibold rounded hover:bg-white hover:text-[#001f3f] transition"
          >
            Contact Us
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default ShortTermWaitersPage;
