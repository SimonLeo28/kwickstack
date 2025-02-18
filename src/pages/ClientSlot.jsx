import { useState } from "react";
import { Search } from "lucide-react";

const ClientSlot = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const data = [
    {
      name: "taj shariff",
      contact: "zaveriyataj@yuvamytr.com",
      slot: "Dec 16, 2025 1:00 pm",
      project: "hello",
    },
    {
      name: "Akshata H",
      contact: "8277653593\nakshatahiremani1995@gmail.com",
      slot: "Feb 3, 2025 3:00 pm",
      project: "We are into E-com, looking for startup.",
    },
    {
      name: "taj n",
      contact: "827765354\nzaveriyataj@yuvamytr.com",
      slot: "Jan 28, 2025 3:30 pm",
      project: "hjgjgj",
    },
    {
      name: "taj zav",
      contact: "zaveriyataj@yuvamytr.com",
      slot: "Jan 24, 2025 3:00 pm",
      project: "skjhakx",
    },
    {
      name: "asd ad",
      contact: "827765354\ntajzveriya@gmail.com",
      slot: "Jan 20, 2025 3:30 pm",
      project: "sda",
    },
    {
      name: "ttttt fdfdgf",
      contact: "zaveriyataj@yuvamytr.com",
      slot: "Jan 16, 2025 2:30 pm",
      project: "skjhkds",
    },
    {
      name: "taj r",
      contact: "zaveriyataj@yuvamytr.com",
      slot: "",
      project: "jyguyufuyufuf",
    },
  ];
  return (
    <>
<<<<<<< HEAD
     <div className='flex justify-center items-center flex-col'>
          <img className='p-3' src={logo} alt='KwickStack logo' />
          <hr className='w-[90%] border-black border-1' />
        </div>

      
=======
>>>>>>> c64ea09b3618bc85638ce1626c23931b545edfbd
    <div className='p-10 flex justify-start items-start'>
      {/* <Navbar/> */}
      <div className='flex flex-col p-3 gap-5 w-full'>
        <h1 className='font-semibold text-2xl pl-20'>CLIENT  CONSULTATION SLOTS DATA</h1>
        <div className="flex justify-end items-end space-x-4 border p-2 rounded-lg w-full max-w-[720px] bg-white shadow-sm ml-20"> */}
      {/* Search Icon and Input */}
      {/* <div className="flex items-center space-x-2 flex-grow">
        <Search className="text-orange-500" size={20} />
        <input
          type="text"
          placeholder="Search"
          className="outline-none w-full bg-transparent text-gray-700 placeholder-gray-400"
        />
      </div> */}

      {/* Dropdown */}
      {/* <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        className="outline-none bg-transparent text-gray-600"
      >
        <option value="">Choose an option...</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
    </div>
    <div className="overflow-x-auto pl-20">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Contact Details</th>
            <th className="p-3 border">Slot Date & Time</th>
            <th className="p-3 border">About Project</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              } text-gray-700`}
            >
              <td className="p-3 border font-semibold">{item.name}</td>
              <td className="p-3 border whitespace-pre-line">{item.contact}</td>
              <td className="p-3 border">{item.slot}</td>
              <td className="p-3 border">{item.project}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>
      
    </div> }

    </>
  )
}


export default ClientSlot;