import React, { useContext } from 'react'
import style from './Footer.module.css'
import { CartContext } from '../CartContext/CartContext'
import { UserContext } from '../../Context/UserContext'

export default function Footer() {

let {UserToken}= useContext(UserContext)

  return <>


  {UserToken &&
  

<footer className=' relative bottom-0 right-0 left-0'>
  
 <div className="  mt-20 dark:bg-gray-900 dark:text-gray-400  bg-gray-100 py-7 px-10">

<h1 className='text-2xl'>Get the FreshCart app</h1>
<p className='text-gray-500 pt-2 '>We Will Send You a Link, Open it On Your Phone to download the app  </p>
    
<div className=" sm:w-full mb-16 flex flex-wrap gap-y-2  gap-x-3 my-2 items-center w-full">
<input type="text" id="input" aria-label="input" className=" bg-white dark:bg-gray-500 border-gray-300 w-5/6 text-gray-900 dark:text-white text-sm rounded-lg blok  p-2.5  dark:placeholder-gray-400  focus:outline-main" placeholder='Your email address...' required   />
<button type="button" className="text-white  hover:text-white hover:bg-green-500 bg-main focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-main dark:hover:bg-green-500 dark:focus:bg-green-600">Share App Link</button>
</div>
<div className=" border-t-2 py-5 border-b-2 dark:border-gray-600 flex flex-wrap gap-y-6 justify-between items-center ">
  <div className=" flex items-center flex-wrap gap-x-4">
  <h4 className=' font-medium'>Payment Partners</h4>
  <div className="">
<div className=''>
<i className="fa-brands text-3xl  text-blue-500 fa-cc-amazon-pay me-3"></i>
<i className="fa-brands text-3xl text-orange-500 fa-cc-mastercard me-3"></i>
<i className="fa-brands text-3xl  text-blue-900 fa-cc-paypal me-3"></i>
<i className="fa-brands text-3xl  text-blue-400 fa-cc-visa me-3"></i>
</div>

  </div>
  </div>
  <div className=" flex items-center flex-wrap gap-y-4 lg:pe-10 gap-x-4">
  <h4 className=' font-medium'>Get deliveries with FreshCart</h4>
  <div className="">
<div>
<i className="fa-brands text-orange-600 text-4xl  fa-google-pay me-3"></i>
<i className="fa-brands fa-app-store text-blue-600  text-4xl  me-3"></i>
</div>

  </div>
  </div>
</div>
</div>
</footer>
  
  }
  </>
}
