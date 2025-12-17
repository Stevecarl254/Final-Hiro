"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, Users, Coffee, Calendar, Award, ChefHat } from "lucide-react";

const CorporateServicesPage: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-900 overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="bg-[#001f3f] text-white py-24 px-6 text-center relative overflow-hidden">
        {/* Slanted background shapes */}
        <div className="absolute -top-24 -left-32 w-[500px] h-[300px] bg-[#5cc3ff]/30 rotate-[-12deg] rounded-3xl"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[500px] h-[300px] bg-[#5cc3ff]/20 rotate-[10deg] rounded-3xl"></div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold mb-4 relative z-10"
        >
          Corporate Services
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-lg md:text-xl max-w-2xl mx-auto relative z-10"
        >
          Premium catering and hospitality solutions designed for business events, conferences, and professional gatherings.
        </motion.p>
      </section>

      {/* ================= PROFESSIONALISM ================= */}
      <section className="py-20 px-6 max-w-6xl mx-auto relative overflow-hidden">
        {/* Slanted shapes */}
        <div className="absolute -top-20 left-[-80px] w-[300px] h-[200px] bg-[#001f3f]/5 rotate-[-10deg] rounded-3xl"></div>
        <div className="absolute bottom-[-60px] right-[-60px] w-[250px] h-[180px] bg-[#5cc3ff]/10 rotate-[12deg] rounded-3xl"></div>

        {/* Big decorative Chef Hat */}
        <ChefHat className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] text-[#5cc3ff]/10 rotate-[-15deg] pointer-events-none" />

        <motion.h2
          className="text-3xl font-semibold text-[#001f3f] mb-12 text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Professionalism That Reflects Your Brand
        </motion.h2>

        {/* Image 1 + Title beside it */}
        <motion.div
          className="flex flex-col md:flex-row items-center mb-16 gap-6 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="md:w-1/2 w-full">
            <img
              src="/image 1.jpeg"
              alt="Corporate Event"
              className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
            />
          </div>
          <div className="md:w-1/2 w-full text-center md:text-left">
            <h3 className="text-2xl font-semibold text-[#001f3f] mb-4">
              Seamless Event Execution
            </h3>
            <p className="text-gray-700">
              Our team ensures every detail is taken care of, from setup to service, leaving a lasting impression on your guests.
            </p>
          </div>
        </motion.div>

        {/* Title 2 + Image 2 below it */}
        <motion.div
          className="flex flex-col items-center gap-6 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-2xl font-semibold text-[#001f3f] text-center">
            Expertly Trained Staff
          </h3>
          <img
            src="/outdoor.jpeg"
            alt="Professional Staff"
            className="w-full md:w-3/4 h-64 md:h-80 object-cover rounded-2xl shadow-lg"
          />
        </motion.div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="py-20 bg-white px-6 relative overflow-hidden">
        {/* Slanted shapes */}
        <div className="absolute top-0 left-[-80px] w-[300px] h-[200px] bg-[#5cc3ff]/10 rotate-[-8deg] rounded-3xl"></div>
        <div className="absolute bottom-0 right-[-80px] w-[250px] h-[180px] bg-[#001f3f]/5 rotate-[10deg] rounded-3xl"></div>

        <h2 className="text-3xl font-semibold text-[#001f3f] mb-12 text-center relative z-10">
          Our Corporate Event Process
        </h2>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Desktop vertical fade line */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-transparent via-[#5cc3ff] to-transparent transform -translate-x-1/2"></div>

          <div className="flex flex-col space-y-16 relative z-10">
            {[
              {
                icon: <Calendar className="w-6 h-6 text-white" />,
                title: "Consultation & Planning",
                text: "We discuss your event needs and customize a catering solution that fits your vision.",
              },
              {
                icon: <Users className="w-6 h-6 text-white" />,
                title: "Staff Coordination",
                text: "Our experienced event staff are assigned and briefed for smooth operations.",
              },
              {
                icon: <Coffee className="w-6 h-6 text-white" />,
                title: "Setup & Service",
                text: "We handle setup, presentation, and service with precision and elegance.",
              },
              {
                icon: <Award className="w-6 h-6 text-white" />,
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
                className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                } relative`}
              >
                {/* Icon inside the flow */}
                <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-[#5cc3ff]/80">
                  {step.icon}
                </div>

                {/* Content */}
                <div className="md:w-1/2 w-full text-center md:text-left mt-8 md:mt-0">
                  <h3 className="text-xl font-semibold text-[#001f3f] mb-2">{step.title}</h3>
                  <p className="text-gray-700">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-[#001f3f] text-white text-center relative overflow-hidden">
        {/* Slanted shapes */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[250px] bg-[#5cc3ff]/20 rotate-[-10deg] rounded-3xl"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[220px] bg-[#001f3f]/10 rotate-[12deg] rounded-3xl"></div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold mb-4 relative z-10"
        >
          Partner With Us for Your Next Corporate Event
        </motion.h2>
        <p className="mb-6 max-w-2xl mx-auto text-gray-200 relative z-10">
          Experience top-tier catering, flawless coordination, and unmatched hospitality for your business gatherings.
        </p>
        <Link
          href="/contact"
          className="inline-block px-6 py-3 bg-[#5cc3ff] text-[#001f3f] font-semibold rounded hover:bg-white hover:text-[#001f3f] transition relative z-10"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default CorporateServicesPage;