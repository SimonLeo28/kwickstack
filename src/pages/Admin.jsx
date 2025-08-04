import React, { useState } from "react";
import axios from "axios";
import logo from "../../images/kwickstack-logo.svg";
import Calendar from "./Calendar";
import Navbar from "./Navbar";
import { Dialog } from "@headlessui/react";
import ClientSlot from "./ClientSlot";
import Blog from "./Blog";

const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("All");

  // Admin form state
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [message, setMessage] = useState("");

  // Add admin handler
  const handleAddAdmin = async () => {
    if (!adminUsername || !adminPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/AddUser",
        {
          username: adminUsername,
          password: adminPassword,
        },
        { withCredentials: true }
      );

      setMessage(res.data.message || "Admin added successfully!");
      setAdminUsername("");
      setAdminPassword("");
      setTimeout(() => {
        setIsOpen(false);
        setMessage("");
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding admin.");
    }
  };

  return (
    <>
      {/* Header */}
      <div id="Admin" className="flex justify-center items-center flex-col">
        <img className="p-3" src={logo} alt="KwickStack logo" />
        <hr className="w-[90%] border-black border-1" />
      </div>

      {/* Main Layout */}
      <div className="p-10 flex flex-col lg:flex-row justify-start items-start gap-5">
        {/* Sidebar */}
        <Navbar
          setSelectedSection={setSelectedSection}
          selectedSection={selectedSection}
        />

        {/* Main Content */}
        <div className="flex flex-col w-full gap-5">
          <h1 className="font-semibold text-2xl">Dashboard</h1>

          {/* Add Admin Button */}
          <div className="relative flex justify-end">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600"
            >
              + Admin
            </button>

            {/* Modal */}
            <Dialog
              open={isOpen}
              onClose={() => setIsOpen(false)}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-black font-extrabold hover:text-orange-500 float-right"
                >
                  X
                </button>

                <h2 className="text-lg font-semibold text-center mt-2">
                  Add Admin Details
                </h2>

                <div className="mt-4">
                  <input
                    type="text"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="Enter UserName"
                    className="w-full p-2 border rounded-lg mb-3"
                  />
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                {message && (
                  <p className="text-center text-sm text-red-500 mt-2">
                    {message}
                  </p>
                )}

                <div className="mt-4 text-center">
                  <button
                    onClick={handleAddAdmin}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            </Dialog>
          </div>

          {/* Section Renderer */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            {selectedSection === "All" && <Calendar />}
            {selectedSection === "Client Slot Data" && <ClientSlot />}
            {selectedSection === "Invoice" && <p>Invoice Details</p>}
            {selectedSection === "Blog" && <Blog />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
