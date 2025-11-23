"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, Users, Coffee, Calendar, Award } from "lucide-react";

const CorporateServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="bg-[#001f3f] text-white py-24 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-5xl font-bold mb-4"
        >
          Corporate Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg max-w-2xl mx-auto"
        >
          Premium catering and hospitality solutions designed for business events,
          conferences, and professional gatherings.
        </motion.p>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-[#001f3f] mb-4">
            Professionalism That Reflects Your Brand
          </h2>
          <p className="text-gray-700 mb-6">
            We specialize in providing exceptional hospitality and catering services
            that align with your company’s image. From boardroom meetings to large
            conferences, our team ensures seamless service and impeccable presentation.
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-2">
              <Users className="text-[#5cc3ff] w-5 h-5" /> Trained event staff
            </li>
            <li className="flex items-center gap-2">
              <Coffee className="text-[#5cc3ff] w-5 h-5" /> Corporate dining services
            </li>
            <li className="flex items-center gap-2">
              <Briefcase className="text-[#5cc3ff] w-5 h-5" /> Executive catering packages
            </li>
            <li className="flex items-center gap-2">
              <Award className="text-[#5cc3ff] w-5 h-5" /> Attention to detail and quality
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="bg-white h-48 rounded-xl shadow flex items-center justify-center text-gray-400 font-semibold">
            Event Setup
          </div>
          <div className="bg-white h-48 rounded-xl shadow flex items-center justify-center text-gray-400 font-semibold">
            Staff Service
          </div>
          <div className="bg-white h-48 rounded-xl shadow flex items-center justify-center text-gray-400 font-semibold">
            Corporate Dining
          </div>
          <div className="bg-white h-48 rounded-xl shadow flex items-center justify-center text-gray-400 font-semibold">
            Beverage Bar
          </div>
        </motion.div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white px-6">
        <h2 className="text-3xl font-semibold text-[#001f3f] mb-12 text-center">
          Our Corporate Event Process
        </h2>
        <div className="relative max-w-4xl mx-auto">
          <div className="border-l-4 border-[#5cc3ff] absolute left-1/2 transform -translate-x-1/2 h-full"></div>

          <div className="space-y-16">
            {[
              {
                icon: <Calendar className="w-6 h-6 text-[#001f3f]" />,
                title: "Consultation & Planning",
                text: "We discuss your event needs and customize a catering solution that fits your vision.",
              },
              {
                icon: <Users className="w-6 h-6 text-[#001f3f]" />,
                title: "Staff Coordination",
                text: "Our experienced event staff are assigned and briefed for smooth operations.",
              },
              {
                icon: <Coffee className="w-6 h-6 text-[#001f3f]" />,
                title: "Setup & Service",
                text: "We handle setup, presentation, and service with precision and elegance.",
              },
              {
                icon: <Award className="w-6 h-6 text-[#001f3f]" />,
                title: "Feedback & Follow-up",
                text: "Post-event evaluation to ensure satisfaction and continuous improvement.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                } gap-8`}
              >
                <div className="flex flex-col items-center justify-center w-full md:w-1/2 text-center md:text-left">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#5cc3ff]/20 mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#001f3f] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-700">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#001f3f] text-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Partner With Us for Your Next Corporate Event
        </motion.h2>
        <p className="mb-6 max-w-2xl mx-auto text-gray-200">
          Experience top-tier catering, flawless coordination, and unmatched hospitality for your business gatherings.
        </p>
        <Link
          href="/contact"
          className="inline-block px-6 py-3 bg-[#5cc3ff] text-[#001f3f] font-semibold rounded hover:bg-white hover:text-[#001f3f] transition"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default CorporateServicesPage;
