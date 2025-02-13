import React from 'react'

const Navbar = () => {
  return (
    <>
    <div className="p-6 w-[500px] bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Admin Dashboard</h2>
        <div className="space-y-2">
          <button className="w-full text-left px-4 py-3 hover:bg-yellow-100 bg-white rounded-lg shadow-md font-medium">All</button>
          <button className="w-full text-left px-4 py-3 hover:bg-yellow-100  bg-white rounded-lg shadow-md font-medium">Client Slot Data</button>
          <button className="w-full text-left px-4 py-3 hover:bg-yellow-100 bg-white rounded-lg shadow-md font-medium">Invoice</button>
          <button className="w-full text-left px-4 py-3 hover:bg-yellow-100 bg-white rounded-lg shadow-md font-medium">Blog</button>
        </div>
      </div>
    </>
  )
}

export default Navbar;