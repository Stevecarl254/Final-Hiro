"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import {
  FaHome,
  FaUsers,
  FaBoxOpen,
  FaFileAlt,
  FaEnvelope,
  FaCog,
  FaBars,
  FaImages,
  FaClipboardCheck,
} from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { io, Socket } from "socket.io-client";

interface AdminLayoutProps {
  children: ReactNode;
}

interface Quote {
  _id: string;
}

interface Message {
  _id: string;
}

const API_BASE = "http://localhost:5000";

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [newQuotesCount, setNewQuotesCount] = useState(0);
  const [newMessagesCount, setNewMessagesCount] = useState(0);

  const socketRef = useRef<Socket | null>(null);
  const isMountedRef = useRef(false);

  /* =========================
     LOCAL STORAGE HELPERS
  ========================= */
  const getSeenQuotes = (): string[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("seenQuotes") || "[]");
  };

  const getReadMessages = (): string[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("readMessages") || "[]");
  };

  /* =========================
     INITIAL FETCH (ONCE)
  ========================= */
  const fetchInitialCounts = async () => {
    try {
      const [quotesRes, messagesRes] = await Promise.all([
        axios.get(`${API_BASE}/api/quotes`),
        axios.get(`${API_BASE}/api/messages`),
      ]);

      const quotes: Quote[] = quotesRes.data.data || [];
      const messages: Message[] = messagesRes.data.data || [];

      const unseenQuotes = quotes.filter(
        (q) => !getSeenQuotes().includes(q._id)
      );

      const unreadMessages = messages.filter(
        (m) => !getReadMessages().includes(m._id)
      );

      setNewQuotesCount(unseenQuotes.length);
      setNewMessagesCount(unreadMessages.length);
    } catch (err) {
      console.error("Initial fetch error:", err);
    }
  };

  /* =========================
     SOCKET SETUP (ONCE)
  ========================= */
  useEffect(() => {
    if (isMountedRef.current) return;
    isMountedRef.current = true;

    fetchInitialCounts();

    const socket = io(API_BASE, {
      transports: ["websocket"],
      reconnection: true,
    });

    socketRef.current = socket;

    socket.on("newQuote", (quote: Quote) => {
      if (!getSeenQuotes().includes(quote._id)) {
        setNewQuotesCount((prev) => prev + 1);
      }
    });

    socket.on("newMessage", (msg: Message) => {
      if (!getReadMessages().includes(msg._id)) {
        setNewMessagesCount((prev) => prev + 1);
      }
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  /* =========================
     MENU CONFIG
  ========================= */
  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, href: "/admin" },

    {
      name: "Equipment Bookings",
      icon: <FaClipboardCheck />,
      href: "/admin/equipment-bookings",
    },

    { name: "Staff", icon: <FaUsers />, href: "/admin/staff" },

    {
      name: "Equipment Management",
      icon: <FaBoxOpen />,
      href: "/admin/equipment",
    },

    {
      name: "Quotes",
      icon: <FaEnvelope />,
      href: "/admin/quotes",
      badge: newQuotesCount,
    },

    {
      name: "Messages",
      icon: <FaEnvelope />,
      href: "/admin/messages",
      badge: newMessagesCount,
    },

    { name: "Gallery", icon: <FaImages />, href: "/admin/gallery" },
    { name: "Reports", icon: <FaFileAlt />, href: "/admin/reports" },
    { name: "Settings", icon: <FaCog />, href: "/admin/settings" },
  ];

  /* =========================
     UI
  ========================= */
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-[#002366] text-white flex flex-col transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b border-blue-400">
          <span className={`text-xl font-bold ${!isSidebarOpen && "hidden"}`}>
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
              className={`flex items-center gap-3 px-4 py-3 hover:bg-blue-700 ${
                !isSidebarOpen ? "justify-center" : ""
              } relative`}
            >
              {item.icon}
              {isSidebarOpen && <span>{item.name}</span>}
              {item.badge && item.badge > 0 && (
                <span className="absolute top-2 right-4 bg-red-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white p-4 shadow">
          <h1 className="text-xl font-semibold text-[#002366]">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">Admin</span>
            <img
              src="/avatar.png"
              alt="Admin"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}