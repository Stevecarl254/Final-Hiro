"use client";

import React, { useState } from "react";
import axios from "axios";
import { MapPin, Phone, Mail, MessageCircle, CheckCircle } from "lucide-react";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/messages", formData);
      setSuccess(true);
      setFormData({ fullName: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 relative">
      {/* Contact Info + Form */}
      <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-[#001f3f]">Get in Touch</h2>
          <p className="text-gray-700">
            Have a question or need more information? Send us a message and we’ll
            get back to you shortly.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-[#001f3f]" />
              <span>Nairobi, Kenya</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-[#001f3f]" />
              <span>+254 722 440 643</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-[#001f3f]" />
              <span>info@hirocompany.com</span>
            </div>
          </div>

          <p className="text-gray-600">
            We typically respond within 24 hours.
          </p>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg space-y-6 relative"
        >
          {/* Success Message */}
          {success && (
            <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center rounded-2xl">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold text-[#001f3f]">
                Message Sent!
              </h3>
              <p className="text-gray-600 mt-2 text-center">
                Thank you for reaching out. We’ll get back to you soon.
              </p>
            </div>
          )}

          <div>
            <label className="font-medium">Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#00b8e6]"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#00b8e6]"
              placeholder="Your email address"
            />
          </div>

          <div>
            <label className="font-medium">Subject</label>
            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#00b8e6]"
              placeholder="Subject"
            />
          </div>

          <div>
            <label className="font-medium">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full mt-2 border rounded-md px-4 py-2 focus:ring-2 focus:ring-[#00b8e6]"
              placeholder="Your message"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#001f3f] text-white py-3 rounded-md font-semibold hover:bg-[#00b8e6] hover:text-[#001f3f] transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        <a
          href="tel:+254722440643"
          className="bg-[#00b8e6] w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#001f3f]"
        >
          <Phone />
        </a>
        <a
          href="https://wa.me/254722440643"
          target="_blank"
          className="bg-[#00b8e6] w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#001f3f]"
        >
          <MessageCircle />
        </a>
      </div>
    </div>
  );
};

export default ContactPage;