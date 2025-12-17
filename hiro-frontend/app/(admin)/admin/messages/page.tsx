"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Mail,
  User,
  Trash2,
  X,
  MessageSquare,
  Coffee,
  Box,
} from "lucide-react";

interface Message {
  _id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Message | null>(null);

  // --- Track read/unread messages using localStorage ---
  const getReadMessages = (): string[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("readMessages") || "[]");
  };

  const markAsRead = (ids: string[]) => {
    const read = getReadMessages();
    ids.forEach((id) => {
      if (!read.includes(id)) read.push(id);
    });
    localStorage.setItem("readMessages", JSON.stringify(read));
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/messages");
      const msgs: Message[] = res.data.data || [];
      setMessages(msgs);

      // --- Mark all messages as read immediately when page loads ---
      const allIds = msgs.map((m) => m._id);
      markAsRead(allIds);
    } catch (err) {
      console.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    // Socket.IO for real-time updates
    const socket = (window as any).io?.("http://localhost:5000");
    if (socket) {
      socket.on("newMessage", (msg: Message) => {
        setMessages((prev) => [msg, ...prev]);
        // Also mark new message as read immediately
        markAsRead([msg._id]);
      });
    }
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/messages/${deleteTarget._id}`
      );
      setMessages((prev) => prev.filter((m) => m._id !== deleteTarget._id));
    } catch (err) {
      console.error("Delete failed");
    } finally {
      setDeleteTarget(null);
    }
  };

  const readMessages = getReadMessages();

  return (
    <div className="relative space-y-8">
      {/* Decorative Background Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Coffee className="absolute top-10 left-10 w-32 h-32 text-[#00b8e6]/10" />
        <Box className="absolute top-60 right-20 w-48 h-48 text-[#00b8e6]/10 rotate-12" />
        <Coffee className="absolute bottom-40 left-32 w-40 h-40 text-[#00b8e6]/10 -rotate-6" />
        <Box className="absolute bottom-10 right-10 w-36 h-36 text-[#00b8e6]/10 rotate-45" />
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between z-10">
        <h2 className="text-3xl font-bold text-[#002366] flex items-center gap-2">
          <MessageSquare className="w-7 h-7" />
          Messages
        </h2>
        <span className="text-gray-500">{messages.length} total messages</span>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-gray-500 animate-pulse relative z-10">
          Loading messages...
        </p>
      )}

      {/* Empty State */}
      {!loading && messages.length === 0 && (
        <div className="bg-white p-10 rounded-2xl shadow text-center relative z-10">
          <Mail className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">No messages received yet.</p>
        </div>
      )}

      {/* Messages Grid */}
      <div className="relative z-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className="relative bg-white rounded-2xl shadow hover:shadow-xl transition p-6 cursor-pointer group"
          >
            {/* Delete Button */}
            <button
              onClick={() => setDeleteTarget(msg)}
              className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition"
            >
              <Trash2 className="w-5 h-5" />
            </button>

            <h3 className="font-semibold text-lg text-[#002366] truncate">
              {msg.subject}
            </h3>

            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
              <User className="w-4 h-4" />
              {msg.fullName}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Mail className="w-4 h-4" />
              {msg.email}
            </div>

            <p className="text-gray-600 mt-4 line-clamp-3">{msg.message}</p>

            <button
              onClick={() => setSelectedMessage(msg)}
              className="mt-4 text-sm font-medium text-[#002366] hover:underline"
            >
              Read full message →
            </button>

            <p className="text-xs text-gray-400 mt-3">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* View Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 relative">
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-4 right-4 text-gray-500"
            >
              <X />
            </button>

            <h3 className="text-2xl font-bold text-[#002366] mb-4">
              {selectedMessage.subject}
            </h3>

            <div className="text-sm text-gray-600 mb-2">
              <strong>Name:</strong> {selectedMessage.fullName}
            </div>
            <div className="text-sm text-gray-600 mb-4">
              <strong>Email:</strong> {selectedMessage.email}
            </div>

            <p className="text-gray-700 whitespace-pre-line">
              {selectedMessage.message}
            </p>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-[#002366] mb-3">
              Delete Message?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this message? This action cannot
              be undone.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-md border"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}