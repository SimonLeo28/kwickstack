import React, { useState } from "react";
import logo from "../../images/kwickstack-logo.svg";
import Calendar from "./Calendar";
import Navbar from "./Navbar";
import { Dialog } from "@headlessui/react";
import ClientSlot from "./ClientSlot";
import Blog from "./Blog";

const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("All"); // Default section

  return (
    <>
      <div id="Admin" className="flex justify-center items-center flex-col">
        <img className="p-3" src={logo} alt="KwickStack logo" />
        <hr className="w-[90%] border-black border-1" />
      </div>

      {/** Admin Panel Including Navbar */}
      <div className="p-10 flex flex-col lg:flex-row justify-start items-start gap-5">
        <Navbar setSelectedSection={setSelectedSection} />
         <div className="flex flex-col w-full gap-5">
          <h1 className="font-semibold text-2xl">Dashboard</h1>

          {/* Section Content */}
          <div className="relative flex justify-end items-end">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600"
            >
              + Admin
            </button>

            <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-black hover:text-gray-900"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>

          {/* Modal Title */}
          <h2 className="text-lg font-semibold text-center">Add Admin Details</h2>

          {/* Input Fields */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full p-2 border rounded-lg mb-3"
            />
            <input
              type="email"
              placeholder="Enter Email_id"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4 text-center">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
              Add
            </button>
          </div>
        </div>
      </Dialog> 
          </div>

          {/* Conditionally Render Sections */}
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
