"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";

export default function ProfilePage() {
  const router = useRouter();

  // User state
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  // Form state
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/users/me");
        setUser(res.data.user);
        setForm({
          ...form,
          name: res.data.user.name,
          phoneNumber: res.data.user.phoneNumber,
          address: res.data.user.address || "",
        });
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch profile");
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate password if provided
    if (form.newPassword || form.confirmPassword || form.currentPassword) {
      if (!form.currentPassword) {
        setError("Current password is required to change password");
        return;
      }
      if (!form.newPassword) {
        setError("Please enter new password");
        return;
      }
      if (form.newPassword !== form.confirmPassword) {
        setError("New password and confirm password do not match");
        return;
      }
      if (form.newPassword.length < 8) {
        setError("New password must be at least 8 characters");
        return;
      }
    }

    // Check if any changes were made
    const noChange =
      form.name === user.name &&
      form.phoneNumber === user.phoneNumber &&
      form.address === user.address &&
      !form.newPassword;

    if (noChange) {
      setError("No changes detected");
      return;
    }

    try {
      const payload = {
        name: form.name,
        phoneNumber: form.phoneNumber,
        address: form.address,
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      };

      const res = await axiosInstance.put("/users/me", payload);

      setUser(res.data.user);
      setSuccess(res.data.message);

      // Clear password fields
      setForm({ ...form, currentPassword: "", newPassword: "", confirmPassword: "" });

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);

      // Update localStorage name for navbar
      localStorage.setItem("userName", res.data.user.name);

    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 relative">
        <button
          onClick={() => router.push("/")}
          className="absolute top-4 left-4 flex items-center text-[#001f3f] hover:text-[#4da6ff] font-semibold"
        >
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-[#001f3f]">Profile</h2>

        {/* Success */}
        {success && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center text-green-600 font-semibold">
              {success}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#001f3f]"
          />

          <input
            type="email"
            value={user.email}
            disabled
            className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-gray-100 cursor-not-allowed"
          />

          <input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#001f3f]"
          />

          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#001f3f]"
          />

          {/* Password Change */}
          <div className="space-y-2 mt-4">
            <label className="font-medium text-[#001f3f]">Change Password</label>

            <div className="relative">
              <input
                type={showPassword.current ? "text" : "password"}
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                placeholder="Current Password"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#001f3f]"
              />
              <button
                type="button"
                onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                className="absolute right-3 top-2.5 text-gray-400"
              >
                {showPassword.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="New Password"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#001f3f]"
              />
              <button
                type="button"
                onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                className="absolute right-3 top-2.5 text-gray-400"
              >
                {showPassword.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm New Password"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#001f3f]"
              />
              <button
                type="button"
                onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                className="absolute right-3 top-2.5 text-gray-400"
              >
                {showPassword.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#001f3f] to-[#4da6ff] text-white font-semibold shadow-lg hover:scale-105 transition transform mt-4"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}