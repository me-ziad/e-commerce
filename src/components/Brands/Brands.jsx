import axios from "axios"
import {useState } from "react";
import { useQuery } from "@tanstack/react-query"
import {motion} from 'framer-motion'
import Loader from "../Loader/Loader";

export default function prands() {
    
  const [brandsDetails, setBrandsDetails] = useState([])
  const [showDetails, setShowDetails] = useState(false)
  const [loader, setLoader] = useState(false)

        function getprands(){
          return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
        }

    let {data,isLoading}= useQuery({
      queryKey: ['getprands'],
      queryFn : getprands
      
    })

    async function PrandsDetails(id) {
      setShowDetails(true)
          try{
            setLoader(true)
            let data=await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
               setBrandsDetails(data?.data?.data)
              //  console.log(data?.data?.data);
               
               setLoader(false)

          }catch{
            setLoader(false)
          }
    }
    const divValidation = {
      hidden : {
        y  :-300,
        opacity : 0,
      },
      visible :{
        y : 0,
        opacity : 1,
        transition :{
          duration : .5,
          delay : .5,  
  
        }
      }
  }
  

  return<>
  <h1 className=" text-gray-500 dark:text-gray-400 text-xl lg:text-xl px-10 font-semibold mb-4">All Brands</h1>

  {showDetails==true ? <>
      <div className=" fixed top-0 left-0 right-0 z-50 h-screen mx-auto w-full bg-black bg-opacity-50">
      <motion.div 
         variants={divValidation}
         initial = "hidden"
         animate = "visible"
      className=" absolute lg:left-64 lg:right-64 z-50 top-6 py-10 mx-2 lg:mx-8 md:mx-24 ms-4 rounded-xl dark:bg-gray-800 bg-white">
        <div className=" flex justify-end me-5 -translate-y-7">

      <i onClick={()=>setShowDetails(false)} className="text-2xl cursor-pointer dark:text-gray-300  text-black fa-solid fa-xmark"></i>
        </div>
        <div className=" flex justify-center py-6 px-10 items-center border-t-gray-200 dark:border-gray-700 border-t border-b  border-b-gray-200 h-full w-ful">
      <div className=" flex-col w-1/2 text-white flex ">
        <h3 className=" text-main text-3xl mb-2">{brandsDetails.name}</h3>
        <h4 className=" text-gray-600">{brandsDetails.slug}</h4>
      </div>
      <div className="w-1/2">
        <img src={brandsDetails.image} className="w-full" alt="" />
      </div>
        </div>
        <div className=" flex w-ful translate-y-3 justify-end me-4">
          <button onClick={()=>setShowDetails(false)} className=" bg-gray-500 lg:py-2 px-1 py-1  lg:px-4 rounded-md text-white"> close</button>
        </div>
      </motion.div>
      </div>
    </> : null}


{isLoading ?
<div className=" flex  mt-40 h-3/4 justify-center items-center">
<Loader></Loader>
</div>: <>
      <div className=" flex  flex-wrap lg:p-6 gap-y-4 justify-center text-center">

          {data?.data?.data.map((prand)=> <div key={prand._id} className="m-auto  dark:text-gray-200 p-7 lg:p-2 w-full md:w-1/2  lg:w-1/4">

          <div  className=" border group dark:text-gray-200  w-full dark:bg-gray-900   hover:shadow-main hover:border-[1px] overflow-hidden hover:border-main hover:shadow-sm  duration-500 transition-all rounded-sm">
            <img className="w-full  h-[200px] object-center" src={prand.image} alt="" />
            <div className=" px-3">

                <h3 className=' text-xl py-2'>{prand.name}</h3>
                <button onClick={()=>PrandsDetails(prand._id)}  className=' w-full text-center hover:bg-green-400 group-hover:translate-y-0 translate-y-full duration-500 group-hover:opacity-100 py-2 px-4 opacity-0 bg-main text-white mt-2 mb-2 rounded'> view details </button>
            </div>
           </div>
            </div>
          )}        
          </div>
</>
}
  </>
}

