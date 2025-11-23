"use client";

import { useState } from "react";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation (replace with real auth logic)
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    console.log("Login Data:", formData);

    // Redirect to previous page or home
    const redirectTo = sessionStorage.getItem("previousPage") || "/";
    router.push(redirectTo);
  };

  // Save previous page
  if (typeof window !== "undefined") {
    const prev = document.referrer;
    if (prev) sessionStorage.setItem("previousPage", prev);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#001f3f] via-[#4da6ff] to-[#e6f2ff] p-6">
      <div className="bg-white bg-opacity-95 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-md p-10 relative">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="absolute top-4 left-4 flex items-center text-[#001f3f] hover:text-[#4da6ff] font-semibold"
        >
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </button>

        <h2 className="text-3xl font-bold text-center text-[#001f3f] mb-6 mt-2">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute top-3 left-3 w-5 h-5 text-[#4da6ff]" />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email *"
              className="w-full border border-[#4da6ff] rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-[#001f3f] transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute top-3 left-3 w-5 h-5 text-[#4da6ff]" />
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Password *"
              className="w-full border border-[#4da6ff] rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-[#001f3f] transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#001f3f] to-[#4da6ff] text-white font-semibold shadow-lg hover:scale-105 transition transform"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-[#001f3f] mt-5">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-[#4da6ff] font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
