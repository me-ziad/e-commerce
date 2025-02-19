import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'


export default function PaySuccess() {
  return (
<div>
  <h1 className="mb-4 pt-20 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-700 text-center ">Pay Cash Success</h1>
  <p className="mb-6 text-lg font-normal text-gray-500 text-center lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
  <div className=" w-full flex justify-center">
  <NavLink to={'/'} className="flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-main rounded-lg hover:bg-green-400 focus:ring-4 focus:ring-blue-300 dark:focus:bg-green-400">

    Go Home
    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
    </svg>
  </NavLink>
  </div>
</div>

  )
}
