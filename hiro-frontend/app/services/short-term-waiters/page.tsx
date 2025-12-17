"use client";

import React from "react";
import {
  CheckCircle,
  Users,
  Calendar,
  ClipboardList,
  ChefHat,
  ConciergeBell,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ShortTermWaitersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative bg-[#00142a] text-white py-28 px-6 text-center overflow-hidden">
        {/* Slanted backgrounds */}
        <div className="absolute -top-24 -left-32 w-[520px] h-[320px] bg-[#5cc3ff]/25 rotate-[-12deg] rounded-[2.5rem]" />
        <div className="absolute bottom-[-140px] right-[-140px] w-[520px] h-[320px] bg-[#0a2d4d] rotate-[10deg] rounded-[2.5rem]" />

        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 relative z-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Short Term Waiters / Waitresses & Hostesses
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto relative z-10 text-blue-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Professional, trained event staff ensuring smooth service and exceptional guest experiences.
        </motion.p>
      </section>

      {/* ===== SECTION SEPARATOR ===== */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#00142a]/20 to-transparent" />

      {/* ================= ABOUT ================= */}
      <section className="relative py-20 px-6 max-w-6xl mx-auto">
        <div className="absolute top-12 right-[-160px] w-[420px] h-[240px] bg-[#00142a]/5 rotate-[8deg] rounded-[2.5rem]" />

        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl font-semibold text-[#00142a] mb-4">
              About Our Staff
            </h2>
            <p className="text-gray-700 mb-6">
              Our short-term wait staff are trained in professional service etiquette, guest handling, and hospitality best practices.
            </p>
            <p className="text-gray-700 mb-6">
              We focus on professionalism, adaptability, and seamless event execution.
            </p>

            <ul className="space-y-3">
              {[
                "Highly professional service standards",
                "Well-trained for all event types",
                "Reliable and well-supervised staff",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#5cc3ff] mt-1" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Icon Display */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[ChefHat, ConciergeBell, UtensilsCrossed, Users].map((Icon, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-40 rounded-2xl bg-white shadow-xl border border-gray-100"
              >
                <Icon className="w-16 h-16 text-[#00142a]" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION SEPARATOR ===== */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#00142a]/15 to-transparent" />

      {/* ================= SERVICES ================= */}
      <section className="relative py-20 px-6 bg-white overflow-hidden">
        <div className="absolute -top-24 left-[-140px] w-[440px] h-[260px] bg-[#5cc3ff]/10 rotate-[-10deg] rounded-[2.5rem]" />

        <motion.h2
          className="text-3xl font-semibold text-[#00142a] mb-12 text-center relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Our Services Include
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
          {[
            {
              icon: Users,
              title: "Event Wait Staff",
              desc: "Professional waiters and waitresses for all types of events.",
            },
            {
              icon: ClipboardList,
              title: "Guest Management",
              desc: "Hostesses ensuring smooth guest flow and coordination.",
            },
            {
              icon: Calendar,
              title: "Flexible Shifts",
              desc: "Short-term or full-event staffing solutions.",
            },
          ].map((service, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <div className="bg-[#5cc3ff]/20 p-5 rounded-full mb-4">
                <service.icon className="w-10 h-10 text-[#00142a]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-700">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== SECTION SEPARATOR ===== */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#00142a]/15 to-transparent" />

      {/* ================= WHY CHOOSE US ================= */}
      <section className="relative py-20 px-6 max-w-5xl mx-auto overflow-hidden">
        <div className="absolute bottom-0 right-[-140px] w-[440px] h-[280px] bg-[#00142a]/5 rotate-[12deg] rounded-[2.5rem]" />

        <motion.h2
          className="text-3xl font-semibold text-[#00142a] mb-12 text-center relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Our Staff
        </motion.h2>

        <motion.ul
          className="space-y-5 relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {[
            "Professionally trained and experienced staff.",
            "Flexible staffing based on event size.",
            "Strong focus on guest satisfaction.",
            "Managed and supervised for quality assurance.",
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-[#5cc3ff] mt-1" />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </motion.ul>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative py-20 px-6 bg-[#00142a] text-white text-center overflow-hidden">
        <div className="absolute top-[-140px] left-[-140px] w-[520px] h-[300px] bg-[#5cc3ff]/20 rotate-[-10deg] rounded-[2.5rem]" />

        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Book Our Staff Today
        </motion.h2>

        <motion.p
          className="mb-8 max-w-xl mx-auto relative z-10 text-blue-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Let us handle your staffing needs while you focus on your event.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-10"
        >
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-[#5cc3ff] text-[#00142a] font-semibold rounded-lg hover:bg-white transition"
          >
            Contact Us
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default ShortTermWaitersPage;