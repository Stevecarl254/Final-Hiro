"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Phone, Lock, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword } = formData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const redirectTo = sessionStorage.getItem("previousPage") || "/";
    router.push(redirectTo);
  };

  if (typeof window !== "undefined") {
    const prev = document.referrer;
    if (prev) sessionStorage.setItem("previousPage", prev);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#001f3f] via-[#4da6ff] to-[#e6f2ff] p-6">
      <div className="bg-white bg-opacity-95 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-md p-10 relative">
        <button
          onClick={() => router.push("/")}
          className="absolute top-4 left-4 flex items-center text-[#001f3f] hover:text-[#4da6ff] font-semibold"
        >
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </button>

        <h2 className="text-3xl font-bold text-center text-[#001f3f] mb-6 mt-2">
          Register
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute top-3 left-3 w-5 h-5 text-[#4da6ff]" />
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Full Name *"
              className="w-full border border-[#4da6ff] rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-[#001f3f] transition"
            />
          </div>

          <div className="relative">
            <Mail className="absolute top-3 left-3 w-5 h-5 text-[#4da6ff]" />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email *"
              className="w-full border border-[#4da6ff] rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-[#001f3f] transition"
            />
          </div>

          <div className="relative">
            <Phone className="absolute top-3 left-3 w-5 h-5 text-[#4da6ff]" />
            <input
              type="text"
              name="phone"
              required
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Phone Number *"
              className="w-full border border-[#4da6ff] rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-[#001f3f] transition"
            />
          </div>

          <div className="relative">
            <Lock className="absolute top-3 left-3 w-5 h-5 text-[#4da6ff]" />
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              placeholder="Password *"
              className="w-full border border-[#4da6ff] rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-[#001f3f] transition"
            />
          </div>

          <div className="relative">
            <Lock className="absolute top-3 left-3 w-5 h-5 text-[#4da6ff]" />
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Confirm Password *"
              className="w-full border border-[#4da6ff] rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-[#001f3f] transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#001f3f] to-[#4da6ff] text-white font-semibold shadow-lg hover:scale-105 transition transform"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-[#001f3f] mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-[#4da6ff] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
