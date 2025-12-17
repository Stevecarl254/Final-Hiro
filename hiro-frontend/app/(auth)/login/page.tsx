"use client";

import { useState } from "react";
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/lib/axiosInstance";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await axiosInstance.post("/users/login", formData);
      const { token, user } = res.data;

      if (!token || !user) {
        setError("Invalid response from server");
        return;
      }

      // Save auth info
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userName", user.name);

      // Redirect by role
      router.push(user.role === "admin" ? "/admin" : "/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#001f3f] via-[#4da6ff] to-[#e6f2ff] p-6">
      <div className="bg-white bg-opacity-95 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-md p-10 relative">
        <button
          onClick={() => router.push("/")}
          className="absolute top-4 left-4 flex items-center text-[#001f3f] hover:text-[#4da6ff] font-semibold"
        >
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </button>

        <h2 className="text-3xl font-bold text-center text-[#001f3f] mb-6 mt-2">Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="relative">
            <Lock className="absolute top-3 left-3 w-5 h-5 text-[#4da6ff]" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Password *"
              className="w-full border border-[#4da6ff] rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-[#001f3f] transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
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
          <Link href="/register" className="text-[#4da6ff] font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}