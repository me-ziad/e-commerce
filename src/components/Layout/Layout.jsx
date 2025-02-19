import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footr/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return <>
    <Navbar></Navbar>


    <div className="container mt-20 min-h-60">

    <Outlet/>
    </div>
    
    <Footer/>
  
    
  </>
}
