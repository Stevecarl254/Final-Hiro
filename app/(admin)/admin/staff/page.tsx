"use client";

import { useState } from "react";

interface Staff {
  name: string;
  speciality: string;
  image?: string;
  bio: string;
  role: string;
  experience: string;
}

export default function CaterersPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [staffList, setStaffList] = useState<Staff[]>([]);

  const tabs = [
    { id: "all", label: "All Caterers" },
    { id: "add", label: "Add Caterer" },
    { id: "current", label: "Currently Booked" },
    { id: "recent", label: "Recently Booked" },
    { id: "most", label: "Most Booked" },
  ];

  const handleAddStaff = (staff: Staff) => {
    setStaffList([...staffList, staff]);
    setActiveTab("all"); // redirect to All Caterers after adding
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-[#002366] mb-6 text-center underline decoration-[#9e9210] decoration-4 underline-offset-8">
        Caterers Management
      </h1>

      {/* Tabs */}
      <div className="border-b border-gray-300 flex space-x-4 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-base font-medium whitespace-nowrap relative transition 
              ${
                activeTab === tab.id
                  ? "text-[#9e9210]"
                  : "text-[#002366] hover:text-[#9e9210]"
              }`}
          >
            {tab.label}

            {activeTab === tab.id && (
              <span className="absolute left-0 right-0 -bottom-1 h-[3px] bg-[#9e9210] rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {/* ALL CATERERS */}
        {activeTab === "all" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-[#002366]">
              All Caterers
            </h2>
            {staffList.length === 0 ? (
              <p className="text-gray-600">No caterers added yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staffList.map((staff, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition"
                  >
                    {staff.image && (
                      <img
                        src={staff.image}
                        alt={staff.name}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                    )}
                    <h3 className="text-lg font-semibold text-[#002366]">
                      {staff.name}
                    </h3>
                    <p className="text-gray-700">{staff.role}</p>
                    <p className="text-gray-600">{staff.speciality}</p>
                    <p className="text-gray-500 text-sm">{staff.experience}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ADD CATERER - FULL PAGE */}
        {activeTab === "add" && (
          <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-[#002366] text-center">
              Add Caterer / Staff
            </h2>

            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const newStaff: Staff = {
                  name: (form.name as HTMLInputElement).value,
                  speciality: (form.speciality as HTMLInputElement).value,
                  image: (form.image as HTMLInputElement).value || undefined,
                  bio: (form.bio as HTMLTextAreaElement).value,
                  role: (form.role as HTMLInputElement).value,
                  experience: (form.experience as HTMLInputElement).value,
                };
                handleAddStaff(newStaff);
                form.reset();
              }}
            >
              <div>
                <label className="block font-medium text-[#002366]">Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full border border-gray-300 rounded-lg p-3"
                  placeholder="Enter staff name"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-[#002366]">Speciality</label>
                <input
                  type="text"
                  name="speciality"
                  className="w-full border border-gray-300 rounded-lg p-3"
                  placeholder="Enter speciality"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-[#002366]">
                  Image URL (Optional)
                </label>
                <input
                  type="text"
                  name="image"
                  className="w-full border border-gray-300 rounded-lg p-3"
                  placeholder="Paste image URL"
                />
              </div>

              <div>
                <label className="block font-medium text-[#002366]">Bio</label>
                <textarea
                  name="bio"
                  className="w-full border border-gray-300 rounded-lg p-3"
                  placeholder="Enter bio"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block font-medium text-[#002366]">Role</label>
                <input
                  type="text"
                  name="role"
                  className="w-full border border-gray-300 rounded-lg p-3"
                  placeholder="Enter role"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-[#002366]">Experience</label>
                <input
                  type="text"
                  name="experience"
                  className="w-full border border-gray-300 rounded-lg p-3"
                  placeholder="Enter experience"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-[#002366] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#001a4d] transition w-full"
              >
                Save Staff
              </button>
            </form>
          </div>
        )}

        {/* CURRENTLY BOOKED */}
        {activeTab === "current" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-[#002366]">
              Currently Booked
            </h2>
            <p className="text-gray-600">No current bookings.</p>
          </div>
        )}

        {/* RECENTLY BOOKED */}
        {activeTab === "recent" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-[#002366]">
              Recently Booked
            </h2>
            <p className="text-gray-600">No recent bookings.</p>
          </div>
        )}

        {/* MOST BOOKED */}
        {activeTab === "most" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-[#002366]">
              Most Booked Caterers
            </h2>
            <p className="text-gray-600">No booking stats available.</p>
          </div>
        )}
      </div>
    </div>
  );
}