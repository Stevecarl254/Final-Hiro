"use client";

import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { FaTrash, FaArrowLeft, FaUpload, FaPlus } from "react-icons/fa";
import { GiChefToque } from "react-icons/gi";
import Link from "next/link";

interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/gallery");
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file || !title) return alert("Please add an image and title.");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      await axios.post("http://localhost:5000/api/gallery", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFile(null);
      setPreview(null);
      setTitle("");
      setDescription("");
      setModalOpen(false);
      fetchImages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/gallery/${id}`);
      setDeleteModalId(null); // close confirmation modal
      fetchImages(); // refresh gallery immediately
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Back Button */}
      <Link
        href="/admin"
        className="inline-flex items-center mb-6 px-4 py-2 bg-[#001f3f] text-[#5cc3ff] rounded shadow hover:bg-[#002366] transition"
      >
        <FaArrowLeft className="mr-2" /> Back to Dashboard
      </Link>

      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <GiChefToque className="text-[#5cc3ff]" /> Gallery
        </h1>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#5cc3ff] text-[#001f3f] rounded shadow hover:bg-[#66c0ff] transition"
        >
          <FaPlus /> Add Gallery
        </button>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div
            key={img._id}
            className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            <img
              src={`http://localhost:5000${img.imageUrl}`}
              alt={img.title}
              className="w-full h-64 object-cover"
            />

            {/* Delete Button */}
            <button
              onClick={() => setDeleteModalId(img._id)}
              className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition"
            >
              <FaTrash />
            </button>

            {/* Image Title */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 font-medium">
              {img.title}
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <p className="mt-10 text-center text-gray-500">No images uploaded yet.</p>
      )}

      {/* Add Gallery Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-[#001f3f]/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-2xl font-bold mb-4 text-[#001f3f] flex items-center gap-2">
              <GiChefToque className="text-[#5cc3ff]" /> Add Gallery
            </h2>

            {preview && (
              <div className="mb-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded border"
                />
              </div>
            )}

            <input
              type="file"
              onChange={handleFileChange}
              className="border rounded px-3 py-2 w-full mb-4"
            />
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded px-3 py-2 w-full mb-4"
            />
            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded px-3 py-2 w-full mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setPreview(null);
                  setFile(null);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-[#5cc3ff] text-[#001f3f] rounded hover:bg-[#66c0ff] transition flex items-center gap-2"
              >
                <FaUpload /> Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Delete Confirmation Modal */}
      {deleteModalId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Confirm Delete
            </h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this gallery item? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModalId(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModalId)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
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