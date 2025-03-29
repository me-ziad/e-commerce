import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { CartContext } from '../CartContext/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function PayCash() {


  const [loading, setLoading] = useState(false)



  let navigate = useNavigate() 
   let {cart,displayCart} = useContext(CartContext)


  async function PayCashCat(shippingAddress){ 

    try{
    setLoading(true)         
      let {data} =await  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,{
        shippingAddress,
    },{
      headers:{
        token: localStorage.getItem('userToken')
      }
    })
    // console.log(data);  
      toast.success(data.status)
    navigate('/paySuccess')
    displayCart()



    }catch(error){
      // console.log(error); 
      setLoading(false)
      
    }
  }


const formik = useFormik({
  initialValues :{
    details : '', 
    phone : '',
    city : '',
   
  }
  ,onSubmit : PayCashCat
})


  return <>

  <form onSubmit={formik.handleSubmit} className=" md:w-4/6 mx-auto mb-40 mt-24">
    <h2 className=' font-medium text-2xl mb-8 text-main uppercase'>PayCash</h2>
  
  
      
    <div className="relative z-0 w-full mb-8 group">
      <input type="text" name="details" id="details" value={formik.values.details} onChange={formik.handleChange}   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-400 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" "  />
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your details</label>
  
    </div>
  
    <div className="relative z-0 w-full mb-8 group">
      <input type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange}   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-400 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" "  />
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your phone</label>
  
    </div>
  
    <div className="relative z-0 w-full mb-8 group">
      <input type="text" name="city" id="city" value={formik.values.city} onChange={formik.handleChange}   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-400 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" "  />
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your city</label>
  
    </div>
    
  
    {!loading ?  <button type="submit" className="text-white bg-main hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-green-600 dark:focus:main">Submit</button>
:   <button type="button" className="text-white bg-main hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-green-600 dark:focus:main"><i className="fa-solid fa-spinner fa-spin"></i></button>
}
  
  </form>
  
</>
}
