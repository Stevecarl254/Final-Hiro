"use client";
import { FaClipboardList, FaUtensils, FaComments, FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export default function GetQuotePage() {
  return (
    <div className="bg-gray-50 text-gray-800 py-10">
      {/* Page Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <div className="inline-flex items-center justify-center gap-3 bg-white shadow-md px-6 py-3 rounded-full">
          <FaClipboardList className="text-[#00b8e6] text-3xl" />
          <h1 className="text-3xl font-bold text-[#001f3f]">Request a Quote</h1>
        </div>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Get a personalized catering quote in minutes. Just fill out your event details below and our team will reach out with a custom offer that fits your needs and budget.
        </p>
      </div>

      {/* Process Section */}
      <section className="py-10 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-[#001f3f] text-center mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 relative">
          {/* Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-[#00b8e6]/30 -z-10"></div>

          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-md w-72 text-center hover:-translate-y-2 transition">
            <FaClipboardList className="text-[#00b8e6] text-4xl mx-auto mb-3" />
            <h3 className="font-semibold mb-2 text-[#001f3f]">Step 1</h3>
            <p className="text-gray-600 text-sm">Provide your event details and preferences.</p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-md w-72 text-center hover:-translate-y-2 transition">
            <FaUtensils className="text-[#00b8e6] text-4xl mx-auto mb-3" />
            <h3 className="font-semibold mb-2 text-[#001f3f]">Step 2</h3>
            <p className="text-gray-600 text-sm">We curate a custom catering plan and quote.</p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-md w-72 text-center hover:-translate-y-2 transition">
            <FaComments className="text-[#00b8e6] text-4xl mx-auto mb-3" />
            <h3 className="font-semibold mb-2 text-[#001f3f]">Step 3</h3>
            <p className="text-gray-600 text-sm">We connect with you to finalize the details.</p>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-center text-[#001f3f] mb-8">Get Your Custom Quote</h2>

          <form className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold">Full Name</label>
              <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b8e6]" placeholder="Your name" required />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Email Address</label>
              <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b8e6]" placeholder="example@email.com" required />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Phone Number</label>
              <input type="tel" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b8e6]" placeholder="+254..." required />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Event Type</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b8e6]" required>
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
              <input type="date" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b8e6]" required />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Number of Guests</label>
              <input type="number" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b8e6]" placeholder="e.g. 100" required />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">Event Location</label>
              <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b8e6]" placeholder="Venue or location" />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">Special Requests / Additional Details</label>
              <textarea className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00b8e6]" rows={5} placeholder="Tell us more about your event..."></textarea>
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
          <p className="text-gray-600 mb-8">
            You can also contact us anytime through the following channels:
          </p>
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
    </div>
  );
}
