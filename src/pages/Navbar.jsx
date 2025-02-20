// import React from "react";
// //import { useState } from "react";


// const Navbar = ({ setSelectedSection, selectedSection }) => {
//   return (
//     <>
//     <div className=" p-6 w-[40vw] bg-white rounded-lg">
//       <h2 className="text-2xl font-bold text-blue-900 mb-4">Admin Dashboard</h2>
//       <div className="space-y-2 flex flex-col">
//         {["All", "Client Slot Data", "Invoice", "Blog"].map((section) => (
//           <button
//             key={section}
//             onClick={() => setSelectedSection(section)}
//             className={`w-full text-left px-4 py-3 rounded-lg shadow-md font-medium transition-colors ${
//               selectedSection === section ? "bg-[#f0e9cd]" : "bg-white"
//             } hover:bg-[#f0e9cd]`}
//           >
//             {section}            
//           </button>
//         ))}
//       </div>
//     </div>
//     </>
//   );
// };

// export default Navbar;
import React from "react";

const Navbar = ({ setSelectedSection, selectedSection }) => {
  return (
    <>
      <div className="p-6 w-full sm:w-[50vw] md:w-[50vw] bg-white rounded-lg">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center md:text-left">
          Admin Dashboard
        </h2>
        <div className="space-y-2 flex flex-col">
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
    </>
  );
};

export default Navbar;
