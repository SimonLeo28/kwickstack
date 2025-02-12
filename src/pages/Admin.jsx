import React from 'react'
import logo from '../../images/kwickstack-logo.svg'
import Calendar from './Calendar'
import Messages from './Messages'

const Admin = () => {
  return (
    <>
    <div className='flex justify-center items-center flex-col'>
      <img className='p-3' src={logo} alt='KwickStack logo' />
      <hr className='w-[90%] border-black border-1' />
    </div>


      {/** Admin Panel Including Navbar */}
      <div className='p-10 flex justify-start items-start'>
      <div class="p-6 w-100 bg-white rounded-lg shadow">
        <h2 class="text-2xl font-bold text-blue-900 mb-4">Admin Dashboard</h2>
        <div class="space-y-2">
          <button class="w-full text-left px-4 py-3 hover:bg-yellow-100 bg-white rounded-lg shadow-md font-medium">All</button>
          <button class="w-full text-left px-4 py-3 hover:bg-yellow-100  bg-white rounded-lg shadow-md font-medium">Client Slot Data</button>
          <button class="w-full text-left px-4 py-3 hover:bg-yellow-100 bg-white rounded-lg shadow-md font-medium">Invoice</button>
          <button class="w-full text-left px-4 py-3 hover:bg-yellow-100 bg-white rounded-lg shadow-md font-medium">Blog</button>
        </div>
      </div>

      <div className='flex flex-col p-3 gap-5 w-full'>
        <h1 className='font-semibold text-2xl'>Dashboard</h1>
        <div className='flex justify-end w-full'>
          <button className='p-3 hover:bg-orange-300 bg-orange-400 rounded-lg'>Admin</button>
        </div>
        <Calendar />
        <Messages />
      </div>
      </div>

    </>
  )
}


export default Admin;