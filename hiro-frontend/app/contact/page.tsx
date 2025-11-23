"use client";

import React from "react";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 relative">
      {/* Contact Info + Form Section */}
      <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-[#001f3f]">Get in Touch</h2>
          <p className="text-gray-700">
            We’d love to hear from you! Reach out with any questions, feedback, or partnership inquiries.
          </p>

          {/* Contact Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-[#001f3f]" />
              <span>123 Main Street, Nairobi, Kenya</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-[#001f3f]" />
              <span>+254 700 123 456</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-[#001f3f]" />
              <span>info@hirocompany.com</span>
            </div>
          </div>

          {/* Optional Instructions */}
          <p className="text-gray-600 mt-6">
            Fill out the form and we will get back to you within 24 hours. You can also reach us via call or message using the floating button.
          </p>
        </div>

        {/* Contact Form */}
        <form className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your full name"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00b8e6]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Your email address"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00b8e6]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="subject" className="text-gray-700 font-medium mb-2">Subject</label>
            <input
              type="text"
              id="subject"
              placeholder="Subject"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00b8e6]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="message" className="text-gray-700 font-medium mb-2">Message</label>
            <textarea
              id="message"
              placeholder="Your message"
              className="border border-gray-300 rounded-md px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#00b8e6]"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#001f3f] text-white font-semibold py-3 rounded-md hover:bg-[#00b8e6] hover:text-[#001f3f] transition-all duration-300 shadow"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Map Section */}
      <section className="w-full h-80 md:h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.839604515482!2d36.8219460757436!3d-1.292065998946574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10b3fba7a95f%3A0x8f1f8b1bde7dbb32!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1698687923456!5m2!1sen!2sus"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      {/* Floating Call/Message Button */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        <a
          href="tel:+254700123456"
          className="bg-[#00b8e6] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-[#001f3f] transition"
          title="Call Now"
        >
          <Phone className="w-6 h-6" />
        </a>
        <a
          href="https://wa.me/254700123456"
          target="_blank"
          className="bg-[#00b8e6] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-[#001f3f] transition"
          title="Message on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

export default ContactPage;
