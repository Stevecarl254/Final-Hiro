"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { FaClipboardList, FaUtensils, FaComments, FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { GiChefToque } from "react-icons/gi";
import { FaCheckCircle } from "react-icons/fa";

export default function GetQuotePage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    eventType: "",
    eventDate: "",
    guests: "",
    location: "",
    details: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/quotes", form);
      setSuccess(true);
      setForm({
        fullName: "",
        email: "",
        phoneNumber: "",
        eventType: "",
        eventDate: "",
        guests: "",
        location: "",
        details: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Automatically hide success message after 4 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="relative bg-gray-50 text-gray-800 py-10 overflow-hidden">
      {/* Background chef icons */}
      <GiChefToque className="absolute top-0 right-0 text-[#00b8e6]/10 text-[15rem] pointer-events-none -z-10" />
      <GiChefToque className="absolute bottom-0 left-0 text-[#001f3f]/10 text-[15rem] pointer-events-none -z-10" />

      {/* Success Toast */}
      {success && (
        <div className="fixed top-6 right-6 z-50 bg-white border-l-4 border-green-500 shadow-lg rounded-lg px-6 py-4 flex items-center gap-3 animate-slide-in">
          <FaCheckCircle className="text-green-500 text-2xl" />
          <div>
            <p className="font-semibold text-green-600">Request Submitted!</p>
            <p className="text-gray-600 text-sm">Our team will contact you soon with a custom quote.</p>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <div className="inline-flex items-center justify-center gap-3 bg-white shadow-md px-6 py-3 rounded-full">
          <FaClipboardList className="text-[#00b8e6] text-3xl" />
          <h1 className="text-3xl font-bold text-[#001f3f]">Request a Quote</h1>
        </div>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Get a personalized catering quote in minutes. Fill out your event details below and our team will reach out with a custom offer that fits your needs.
        </p>
      </div>

      {/* Quote Form */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-center text-[#001f3f] mb-8">Get Your Custom Quote</h2>

          <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {/* Form Fields */}
            <div>
              <label className="block mb-2 font-semibold">Full Name</label>
              <input type="text" name="fullName" value={form.fullName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b8e6]" placeholder="Your name" required />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Email Address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b8e6]" placeholder="example@email.com" required />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Phone Number</label>
              <input type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b8e6]" placeholder="+254..." required />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Event Type</label>
              <select name="eventType" value={form.eventType} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b8e6]" required>
                <option value="">Select an event type</option>
                <option>Wedding</option>
                <option>Corporate Event</option>
                <option>Birthday Party</option>
                <option>Private Dinner</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-semibold">Event Date</label>
              <input type="date" name="eventDate" value={form.eventDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b8e6]" required />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Number of Guests</label>
              <input type="number" name="guests" value={form.guests} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b8e6]" placeholder="e.g. 100" required />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">Event Location</label>
              <input type="text" name="location" value={form.location} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b8e6]" placeholder="Venue or location" />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">Special Requests / Additional Details</label>
              <textarea name="details" value={form.details} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b8e6]" rows={5} placeholder="Tell us more about your event..."></textarea>
            </div>

            <div className="md:col-span-2 text-center mt-4">
              <button type="submit" className="bg-[#001f3f] text-white px-12 py-3 rounded-full font-semibold text-lg hover:bg-[#00b8e6] hover:text-[#001f3f] transition-all duration-300">
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-10 border border-gray-100">
          <h3 className="text-2xl font-semibold text-[#001f3f] mb-6">Prefer to talk to us directly?</h3>
          <p className="text-gray-600 mb-8">You can also contact us anytime through the following channels:</p>
          <div className="flex justify-center gap-8 text-lg flex-wrap">
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-[#00b8e6]" /> <span>+254 700 123 456</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-[#00b8e6]" /> <span>info@hiro.co.ke</span>
            </div>
            <div className="flex items-center gap-2">
              <FaWhatsapp className="text-[#00b8e6]" /> <span>+254 700 123 456</span>
            </div>
          </div>
        </div>
      </section>

      {/* Animation for toast */}
      <style jsx>{`
        .animate-slide-in {
          animation: slideIn 0.5s ease forwards;
        }
        @keyframes slideIn {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}