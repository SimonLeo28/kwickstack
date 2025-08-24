// import { useEffect, useState } from "react";
// import { Search } from "lucide-react";
// import axios from "axios";
// import { Trash2 } from "lucide-react";

// const ClientSlot = () => {
//   const [data, setData] = useState([]);
//   const [selectedOption, setSelectedOption] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "https://kwikstack-admin-backend.onrender.com/slotDetails"
//         );
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching slot details:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // 🔎 Apply search filter
//   const filteredData = data.filter(
//     (item) =>
//       item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.consultationDate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.consultationTime?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleDelete = async (id) => {
//   const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
//   if (!confirmDelete) return;

//   try {
//     // This sends a DELETE request to your backend
//     await axios.delete(`http://localhost:3000/slot/${id}`);

//     // If backend responds success, update local state
//     setData((prev) => prev.filter((item) => item._id !== id));
//   } catch (error) {
//     console.error("Error deleting slot:", error);
//   }
// };

//   return (
//     <div className="p-4 md:p-10 flex flex-col items-center w-full">
//       <h1 className="font-semibold text-xl md:text-2xl mb-4 text-center">
//         CLIENT CONSULTATION SLOTS DATA
//       </h1>

//       {/* Search & Dropdown */}
//       <div className="flex flex-col md:flex-row items-center md:justify-end gap-4 w-full p-3 border rounded-lg bg-white shadow-sm">
//         <div className="flex items-center space-x-2 flex-grow w-full md:w-auto">
//           <Search className="text-orange-500" size={20} />
//           <input
//             type="text"
//             placeholder="Search"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="outline-none w-full bg-transparent text-gray-700 placeholder-gray-400"
//           />
//         </div>

//         {/* <select
//           value={selectedOption}
//           onChange={(e) => setSelectedOption(e.target.value)}
//           className="outline-none bg-transparent text-gray-600 border p-2 rounded-md"
//         >
//          {/* <option value="">Choose an option...</option>
//           <option value="option1">Option 1</option>
//           <option value="option2">Option 2</option> 
//         </select> */}
//       </div>

//       {/* Table View */}
//       <div className="w-full mt-5">
//         <div className="hidden md:block overflow-x-auto">
//           <table className="min-w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200 text-left text-sm md:text-base">
//                 <th className="p-3 border">Name</th>
//                 <th className="p-3 border">Email</th>
//                 <th className="p-3 border">Subject</th>
//                 <th className="p-3 border">Appointment Date</th>
//                 <th className="p-3 border">Time</th>
//                 <th className="p-3 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((item, index) => (
//                 <tr
//                   key={index}
//                   className={`${
//                     index % 2 === 0 ? "bg-white" : "bg-gray-100"
//                   } text-gray-700 text-sm md:text-base`}
//                 >
//                   <td className="p-3 border font-semibold">{item.fullName}</td>
//                   <td className="p-3 border">{item.email}</td>
//                   <td className="p-3 border">{item.message}</td>
//                   <td className="p-3 border whitespace-pre-wrap">
//                     {item.consultationDate}
//                   </td>
//                   <td className="p-3 border whitespace-pre-wrap">
//                     {item.consultationTime}
//                   </td>
//                   <td className="p-3 border text-center">
//                     <button
//                       className="text-gray-600 hover:text-red-600"
//                       // onClick={() => handleDelete(item._id)}
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Card View for Small Screens */}
//         <div className="md:hidden space-y-4">
//           {filteredData.map((item, index) => (
//             <div
//               key={index}
//               className="border rounded-lg p-4 shadow-sm bg-white"
//             >
//               <p className="font-semibold text-lg">{item.fullName}</p>
//               <p className="text-gray-600">
//                 <span className="font-medium">Email:</span> {item.email}
//               </p>
//               <p className="text-gray-600">
//                 <span className="font-medium">Message:</span> {item.message}
//               </p>
//               <p className="text-gray-600 whitespace-pre-wrap">
//                 <span className="font-medium">Appointment Date:</span>{" "}
//                 {item.consultationDate}
//               </p>
//               <p className="text-gray-600 whitespace-pre-wrap">
//                 <span className="font-medium">Appointment Time:</span>{" "}
//                 {item.consultationTime}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientSlot;
import { useEffect, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import axios from "axios";

const ClientSlot = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://kwikstack-admin-backend.onrender.com/slotDetails"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching slot details:", error);
        // This "Network Error" is typically a CORS (Cross-Origin Resource Sharing) issue.
        // It means your backend server isn't configured to accept requests from the domain
        // where this React app is running.
        setError(
          "Failed to load data. This is likely a CORS issue on the backend server. Please check the server configuration."
        );

        /*
         * --- HOW TO FIX THE CORS ISSUE ON YOUR EXPRESS BACKEND ---
         *
         * 1. Install the `cors` package in your backend project:
         * npm install cors
         *
         * 2. In your server's main file (e.g., index.js or app.js), configure it like this:
         *
         * const express = require('express');
         * const cors = require('cors');
         * const app = express();
         *
         * // Replace 'https://your-frontend-url.com' with the actual URL of your deployed frontend
         * const corsOptions = {
         * origin: 'https://your-frontend-url.com',
         * credentials: true,
         * };
         *
         * // Use the cors middleware BEFORE your routes
         * app.use(cors(corsOptions));
         *
         * // ... rest of your server setup and routes
         */
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔎 Apply search filter
  const filteredData = data.filter(
    (item) =>
      item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.consultationDate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.consultationTime?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- DELETE FUNCTION ---
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this slot?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:3000/slot/${id}`
      );
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting slot:", error);
      alert("Failed to delete the slot. Please try again.");
    }
  };

  return (
    <div className="p-4 md:p-10 flex flex-col items-center w-full bg-gray-50 min-h-screen">
      <h1 className="font-semibold text-xl md:text-2xl mb-4 text-center text-gray-800">
        Client Consultation Slots
      </h1>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row items-center md:justify-end gap-4 w-full max-w-7xl p-3 border rounded-lg bg-white shadow-sm mb-6">
        <div className="flex items-center space-x-2 flex-grow w-full md:w-auto">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, email, date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none w-full bg-transparent text-gray-700 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && <p className="text-gray-500 mt-4">Loading data...</p>}
      {error && <p className="text-red-500 bg-red-100 p-4 rounded-lg mt-4 text-center">{error}</p>}

      {/* Table and Card Container */}
      {!loading && !error && (
        <div className="w-full max-w-7xl mt-5">
          {/* Table View for Medium and Larger Screens */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left text-sm text-gray-600 uppercase tracking-wider">
                  <th className="p-4 border-b">Name</th>
                  <th className="p-4 border-b">Email</th>
                  <th className="p-4 border-b">Subject</th>
                  <th className="p-4 border-b">Appointment Date</th>
                  <th className="p-4 border-b">Time</th>
                  <th className="p-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 text-gray-700 text-sm"
                    >
                      <td className="p-4 border-b font-medium">{item.fullName}</td>
                      <td className="p-4 border-b">{item.email}</td>
                      <td className="p-4 border-b">{item.message}</td>
                      <td className="p-4 border-b whitespace-nowrap">
                        {item.consultationDate}
                      </td>
                      <td className="p-4 border-b whitespace-nowrap">
                        {item.consultationTime}
                      </td>
                      <td className="p-4 border-b text-center">
                        <button
                          className="text-gray-500 hover:text-red-600 transition-colors duration-200"
                          onClick={() => handleDelete(item._id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-gray-500">
                      No data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Card View for Small Screens */}
          <div className="md:hidden space-y-4">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-lg p-4 shadow-sm bg-white relative"
                >
                  <div className="absolute top-4 right-4">
                    <button
                      className="text-gray-500 hover:text-red-600 transition-colors duration-200"
                      onClick={() => handleDelete(item._id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="font-semibold text-lg text-gray-800">{item.fullName}</p>
                  <p className="text-gray-600 mt-1">
                    <span className="font-medium">Email:</span> {item.email}
                  </p>
                  <p className="text-gray-600 mt-1">
                    <span className="font-medium">Subject:</span> {item.message}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium">Date:</span>{" "}
                    {item.consultationDate}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Time:</span>{" "}
                    {item.consultationTime}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center p-4 text-gray-500 bg-white rounded-lg shadow">
                No data found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientSlot;