"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaBell, FaTrash } from "react-icons/fa";
import { io, Socket } from "socket.io-client";

interface Quote {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  eventType: string;
  eventDate: string;
  guests: number;
  location?: string;
  details?: string;
  createdAt: string;
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [newQuotes, setNewQuotes] = useState<Quote[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [quoteToDelete, setQuoteToDelete] = useState<string | null>(null);

  const getSeenQuotes = (): string[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("seenQuotes") || "[]");
  };

  const markQuoteAsSeen = (id: string) => {
    const seen = getSeenQuotes();
    if (!seen.includes(id)) {
      seen.push(id);
      localStorage.setItem("seenQuotes", JSON.stringify(seen));
    }
  };

  const fetchQuotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/quotes");
      const data: Quote[] = res.data.data || [];

      const seenIds = getSeenQuotes();
      const unseen = data.filter((q) => !seenIds.includes(q._id));

      setNewQuotes(unseen);
      setQuotes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuotes();

    const socketClient = io("http://localhost:5000");
    setSocket(socketClient);

    socketClient.on("newQuote", (quote: Quote) => {
      const seenIds = getSeenQuotes();
      if (!seenIds.includes(quote._id)) {
        setNewQuotes((prev) => [quote, ...prev]);
        setQuotes((prev) => [quote, ...prev]);
      }
    });

    return () => socketClient.disconnect();
  }, []);

  const handleMarkAllSeen = () => {
    newQuotes.forEach((q) => markQuoteAsSeen(q._id));
    setNewQuotes([]);
  };

  // Open modal
  const openDeleteModal = (id: string) => {
    setQuoteToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!quoteToDelete) return;
    try {
      await axios.delete(`http://localhost:5000/api/quotes/${quoteToDelete}`);
      setQuotes((prev) => prev.filter((q) => q._id !== quoteToDelete));
      setNewQuotes((prev) => prev.filter((q) => q._id !== quoteToDelete));
      const seen = getSeenQuotes().filter((qid) => qid !== quoteToDelete);
      localStorage.setItem("seenQuotes", JSON.stringify(seen));
    } catch (err) {
      console.error("Failed to delete quote:", err);
    } finally {
      setShowModal(false);
      setQuoteToDelete(null);
    }
  };

  return (
    <div
      className="min-h-screen p-6 max-w-7xl mx-auto bg-gray-50"
      onClick={handleMarkAllSeen}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#001f3f]">
          Get Quote Requests
        </h1>
        {newQuotes.length > 0 && (
          <div className="relative">
            <FaBell className="text-[#00b8e6] text-3xl animate-bounce" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg">
              {newQuotes.length}
            </span>
          </div>
        )}
      </div>

      {/* Quotes Grid */}
      {quotes.length === 0 ? (
        <p className="text-gray-500 text-center mt-20 text-lg">
          No quotes submitted yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <div
              key={q._id}
              className="relative bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Chef Icons */}
              <div className="absolute -top-6 -right-6 text-[#00b8e6]/20 text-[6rem] select-none pointer-events-none">
                👨‍🍳
              </div>
              <div className="absolute bottom-0 -left-6 text-[#00b8e6]/20 text-[6rem] select-none pointer-events-none">
                👩‍🍳
              </div>

              {/* Quote Info */}
              <h2 className="font-semibold text-xl text-[#001f3f] mb-2">{q.fullName}</h2>
              <div className="text-gray-700 text-sm space-y-1">
                <p><strong>Email:</strong> {q.email}</p>
                <p><strong>Phone:</strong> {q.phoneNumber}</p>
                <p><strong>Event:</strong> {q.eventType}</p>
                <p><strong>Date:</strong> {new Date(q.eventDate).toLocaleDateString()}</p>
                <p><strong>Guests:</strong> {q.guests}</p>
                {q.location && <p><strong>Location:</strong> {q.location}</p>}
                {q.details && <p><strong>Details:</strong> {q.details}</p>}
              </div>

              {/* New badge */}
              {newQuotes.find((nq) => nq._id === q._id) && (
                <div className="absolute top-4 left-4 bg-[#00b8e6] text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse shadow">
                  New
                </div>
              )}

              {/* Timestamp */}
              <p className="text-gray-400 text-xs mt-2">
                Submitted: {new Date(q.createdAt).toLocaleString()}
              </p>

              {/* Delete button */}
              <button
                onClick={() => openDeleteModal(q._id)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition-colors"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-96">
            <h2 className="text-xl font-semibold text-[#001f3f] mb-4">
              Delete Quote
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this quote? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
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