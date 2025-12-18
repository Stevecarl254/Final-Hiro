"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Info, Bell, CheckCircle, Users, Calendar, FileText } from "lucide-react";

const tipsData = [
  {
    id: 1,
    icon: <Info className="w-5 h-5 text-white" />,
    title: "System Tip",
    message: "Check pending bookings daily to avoid delays.",
    color: "bg-blue-500",
  },
  {
    id: 2,
    icon: <Bell className="w-5 h-5 text-white" />,
    title: "Reminder",
    message: "Review new quotes to respond to clients promptly.",
    color: "bg-yellow-500",
  },
  {
    id: 3,
    icon: <CheckCircle className="w-5 h-5 text-white" />,
    title: "Quick Tip",
    message: "Update gallery regularly to showcase recent events.",
    color: "bg-green-500",
  },
];

const quickLinks = [
  {
    title: "Equipment Bookings",
    icon: <Calendar className="w-6 h-6 text-white" />,
    href: "/admin/equipment-bookings",
    color: "from-blue-400 to-blue-600",
  },
  {
    title: "Staff Management",
    icon: <Users className="w-6 h-6 text-white" />,
    href: "/admin/staff",
    color: "from-purple-400 to-purple-600",
  },
  {
    title: "Quotes",
    icon: <FileText className="w-6 h-6 text-white" />,
    href: "/admin/quotes",
    color: "from-green-400 to-green-600",
  },
];

export default function AdminLanding() {
  const [adminName, setAdminName] = useState<string | null>(null);
  const [currentTip, setCurrentTip] = useState(0);

  // Rotate tips every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tipsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch admin info from backend using JWT
  useEffect(() => {
    const fetchAdmin = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setAdminName("Admin");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Extract first name from full name
        const fullName = res.data.user?.name || "Admin";
        const firstName = fullName.split(" ")[0];
        setAdminName(firstName);
      } catch (err) {
        console.error("Failed to fetch admin info:", err);
        setAdminName("Admin");
      }
    };

    fetchAdmin();
  }, []);

  const tip = tipsData[currentTip];

  return (
    <main className="relative min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Faded Logo Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/logo.png"
          alt="Hiro Logo"
          fill
          className="object-contain opacity-40 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/80"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-[#002366] animate-fadeIn">
            Welcome, {adminName ?? "..."}
          </h1>
          <p className="text-gray-700 mt-4 text-lg animate-fadeIn delay-200">
            Manage your dashboard and stay on top of your operations
          </p>
        </section>

        {/* Tips / Announcements */}
        <section className="mb-12 w-full max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center space-x-4 transition-all duration-500 animate-fadeSlide">
            <div className={`p-3 rounded-full ${tip.color} flex-shrink-0`}>
              {tip.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm font-semibold">{tip.title}</p>
              <p className="text-gray-800 mt-1">{tip.message}</p>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {quickLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className={`bg-gradient-to-br ${link.color} shadow-lg rounded-2xl p-6 flex items-center space-x-4 transform hover:scale-105 transition-transform duration-300`}
            >
              <div className="p-3 bg-white/20 rounded-full">{link.icon}</div>
              <p className="text-white font-semibold text-lg">{link.title}</p>
            </a>
          ))}
        </section>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlide {
          0% { opacity: 0; transform: translateX(-10px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s ease-in-out forwards; }
        .animate-fadeIn.delay-200 { animation-delay: 0.2s; }
        .animate-fadeSlide { animation: fadeSlide 0.6s ease-in-out forwards; }
      `}</style>
    </main>
  );
}