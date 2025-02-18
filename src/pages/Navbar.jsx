import React from "react";

const Navbar = ({ setSelectedSection, selectedSection }) => {
  return (
    <div className="p-6 w-[40%] bg-white rounded-lg ">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Admin Dashboard</h2>
      <div className="space-y-2">
        {["All", "Client Slot Data", "Invoice", "Blog"].map((section) => (
          <button
            key={section}
            onClick={() => setSelectedSection(section)}
            className={`w-full text-left px-4 py-3 rounded-lg shadow-md font-medium transition-colors ${
              selectedSection === section ? "bg-[#f0e9cd]" : "bg-white"
            } hover:bg-[#f0e9cd]`}
          >
            {section}            
          </button>
        ))}
      </div>
    </div>
//     <div className="p-6 w-full md:w-[40%] bg-white rounded-lg flex flex-col md:flex-row">
//   <h2 className="text-2xl font-bold text-blue-900 mb-4 md:mb-0">Admin Dashboard</h2>
//   <div className="space-y-2 md:space-y-0 md:space-x-2 flex flex-col md:flex-row w-full">
//     {["All", "Client Slot Data", "Invoice", "Blog"].map((section) => (
//       <button
//         key={section}
//         onClick={() => setSelectedSection(section)}
//         className={`w-full md:w-auto text-left px-4 py-3 rounded-lg shadow-md font-medium transition-colors ${
//           selectedSection === section ? "bg-[#f0e9cd]" : "bg-white"
//         } hover:bg-[#f0e9cd]`}
//       >
//         {section}            
//       </button>
//     ))}
//   </div>
// </div>

  );
};

export default Navbar;
