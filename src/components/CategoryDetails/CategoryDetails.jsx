import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {NavLink, useParams } from 'react-router-dom'

import Loader from '../Loader/loader';
import { CartContext } from '../CartContext/CartContext';
import Home from '../Home/Home';
export default function PrandsDetails() {

    const [loader, setLoader] = useState(true)
    const [category, setCategory] = useState({})
  let {id} = useParams()

    async function categoryDetails(details) {
          try{
            setLoader(true)
            let data=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${details}`)
               setCategory(data.data.data)
              //  console.log(data.data.data);
               
               setLoader(false)

          }catch{
            setLoader(false)
          }
    }

        useEffect(()=>{
            categoryDetails(id)
            // relatedbrands()
         
        },[])


  return <>  



{loader ?
<div className=" flex h-screen justify-center items-center">
<Loader></Loader>
</div>: <>
 <div className="container">
                <div className= " lg:flex lg:items-center  p-5">
                            <div className="  lg:w-1/4">
                           <img className=' w-full' src={category.image} alt="" />
           
                            </div>

                            <div className=" lg:w-3/4 lg:p-5 lg:ps-20">
                            <h1 className='text-[30px]'>{category.name}</h1>
                            <p className=' text-gray-400'>{category.slug }</p>
                            <NavLink to={'/'}>

                            <button className='w-full rounded-md bg-main lg:ps-5 lg:pe-5 pt-1 mt-8 pb-1 hover:bg-green-400 text-white'>Add To Cart From Home</button>
                            </NavLink>

                  </div>

                </div>
            </div>
</>}


   
  </>
}