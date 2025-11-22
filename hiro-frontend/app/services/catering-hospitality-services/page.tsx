"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, UtensilsCrossed, Wine, ConciergeBell } from "lucide-react";

const CateringHospitalityPage: React.FC = () => {
  return (
    <main className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section
        className="relative text-white py-28 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-[#001f3f]/80"></div>

        <motion.div
          className="relative z-10 max-w-5xl mx-auto text-center px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-[#e5c07b]">
            Catering & Hospitality Services
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto">
            Experience premium catering and hospitality designed to impress.
            From elegant weddings to corporate galas, we deliver exceptional service,
            gourmet menus, and unmatched presentation.
          </p>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[#001f3f] mb-4">
            Elevate Every Occasion
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We combine culinary expertise with sophisticated hospitality to bring your events to life — 
            with precision, elegance, and creativity. From menu planning to guest service, 
            we handle it all with finesse.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <UtensilsCrossed className="w-10 h-10 text-[#001f3f] mb-4" />,
              title: "Gourmet Catering",
              desc: "Customized menus crafted by our chefs for weddings, conferences, and private events.",
            },
            {
              icon: <Wine className="w-10 h-10 text-[#001f3f] mb-4" />,
              title: "Beverage & Bar Services",
              desc: "Premium beverage setups and trained bartenders ensuring a delightful experience.",
            },
            {
              icon: <ConciergeBell className="w-10 h-10 text-[#001f3f] mb-4" />,
              title: "Event Hospitality",
              desc: "Professional service staff ensuring your guests are attended to with class and care.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-xl p-8 text-center hover:shadow-lg transition-transform transform hover:-translate-y-1"
              whileHover={{ scale: 1.03 }}
            >
              {item.icon}
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Signature Experience Section */}
      <section className="bg-[#001f3f] text-white py-20">
        <motion.div
          className="max-w-6xl mx-auto text-center px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#e5c07b]">
            Our Signature Experience
          </h2>
          <p className="max-w-3xl mx-auto text-gray-200 mb-12">
            Every event we serve is a reflection of our commitment to quality and detail.
            Our team ensures seamless coordination — from setup to service —
            ensuring your guests enjoy a smooth and elegant experience.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Elegant Buffet Displays",
              "Professional Service Team",
              "Impeccable Presentation",
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white text-[#001f3f] rounded-xl shadow hover:shadow-lg"
                whileHover={{ scale: 1.03 }}
              >
                <CheckCircle className="w-8 h-8 mx-auto mb-3 text-[#001f3f]" />
                <p className="font-medium">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold text-[#001f3f] mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Why Choose Us
          </motion.h2>

          <ul className="grid md:grid-cols-2 gap-6 justify-center max-w-3xl mx-auto">
            {[
              "Experienced chefs and professional servers",
              "Elegant and timely event setups",
              "Tailored menus for every occasion",
              "Trusted by corporate and private clients",
            ].map((item, index) => (
              <motion.li
                key={index}
                className="flex items-center justify-center bg-white p-4 rounded-lg shadow"
                whileHover={{ scale: 1.03 }}
              >
                <CheckCircle className="w-6 h-6 text-[#001f3f] mr-3" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#001f3f] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#e5c07b]">
            Ready to elevate your next event?
          </h3>
          <p className="text-gray-100 mb-6">
            Our team is ready to plan, cater and manage every detail — let’s make your event exceptional.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-[#e5c07b] text-[#001f3f] rounded font-semibold hover:brightness-95 transition"
          >
            Contact our team
          </Link>
        </div>
      </section>
    </main>
  );
};

export default CateringHospitalityPage;
