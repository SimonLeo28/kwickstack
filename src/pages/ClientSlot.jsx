import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";

const ClientSlot = () => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://kwikstack-admin-backend.onrender.com/slotDetails"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching slot details:", error);
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

  return (
    <div className="p-4 md:p-10 flex flex-col items-center w-full">
      <h1 className="font-semibold text-xl md:text-2xl mb-4 text-center">
        CLIENT CONSULTATION SLOTS DATA
      </h1>

      {/* Search & Dropdown */}
      <div className="flex flex-col md:flex-row items-center md:justify-end gap-4 w-full p-3 border rounded-lg bg-white shadow-sm">
        <div className="flex items-center space-x-2 flex-grow w-full md:w-auto">
          <Search className="text-orange-500" size={20} />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none w-full bg-transparent text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="outline-none bg-transparent text-gray-600 border p-2 rounded-md"
        >
         {/* <option value="">Choose an option...</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option> 
        </select> */}
      </div>

      {/* Table View */}
      <div className="w-full mt-5">
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left text-sm md:text-base">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Subject</th>
                <th className="p-3 border">Appointment Date</th>
                <th className="p-3 border">Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } text-gray-700 text-sm md:text-base`}
                >
                  <td className="p-3 border font-semibold">{item.fullName}</td>
                  <td className="p-3 border">{item.email}</td>
                  <td className="p-3 border">{item.message}</td>
                  <td className="p-3 border whitespace-pre-wrap">
                    {item.consultationDate}
                  </td>
                  <td className="p-3 border whitespace-pre-wrap">
                    {item.consultationTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card View for Small Screens */}
        <div className="md:hidden space-y-4">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <p className="font-semibold text-lg">{item.fullName}</p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {item.email}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Message:</span> {item.message}
              </p>
              <p className="text-gray-600 whitespace-pre-wrap">
                <span className="font-medium">Appointment Date:</span>{" "}
                {item.consultationDate}
              </p>
              <p className="text-gray-600 whitespace-pre-wrap">
                <span className="font-medium">Appointment Time:</span>{" "}
                {item.consultationTime}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientSlot;
