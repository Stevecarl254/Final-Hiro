"use client";

import { ReactNode, useState } from "react";
import {
  FaHome,
  FaClipboardList,
  FaUtensils,
  FaUsers,
  FaBoxOpen,
  FaCalendarAlt,
  FaFileAlt,
  FaEnvelope,
  FaCog,
  FaBars,
} from "react-icons/fa";
import Link from "next/link";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, href: "/admin" },
    { name: "orders", icon: <FaClipboardList />, href: "/admin/orders" },
    { name: "Menu", icon: <FaUtensils />, href: "/admin/menu" },
    { name: "Staff", icon: <FaUsers />, href: "/admin/staff" },
    { name: "Inventory", icon: <FaBoxOpen />, href: "/admin/inventory" },
    { name: "Events", icon: <FaCalendarAlt />, href: "/admin/events" },
    { name: "Clients", icon: <FaUsers />, href: "/admin/clients" },
    { name: "Reports", icon: <FaFileAlt />, href: "/admin/reports" },
    { name: "Messages", icon: <FaEnvelope />, href: "/admin/messages" },
    { name: "Settings", icon: <FaCog />, href: "/admin/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-[#002366] text-white flex flex-col transition-width duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b border-blue-400">
          <span className={`text-xl font-bold ${isSidebarOpen ? "" : "hidden"}`}>
            Hiro Admin
          </span>
          <button
            className="p-1 hover:bg-blue-500 rounded"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars />
          </button>
        </div>

        <nav className="flex-1 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 hover:bg-blue-700 transition-colors ${
                !isSidebarOpen ? "justify-center" : ""
              }`}
            >
              {item.icon}
              {isSidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between bg-white p-4 shadow">
          <h1 className="text-xl font-semibold text-[#002366]">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">Admin Name</span>
            <img
              src="/avatar.png"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}