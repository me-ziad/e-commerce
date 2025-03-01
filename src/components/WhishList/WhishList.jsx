import React, { useContext } from 'react'
import { WhisListContext } from '../../WhishListContext/WhishListContext'
import { CartContext } from '../CartContext/CartContext'
import { Helmet } from 'react-helmet'
import Loader from '../Loader/Loader'

export default function WhishList() {

    let {showWhishList,deleteWhishList} = useContext(WhisListContext)
    let {addCart} = useContext(CartContext)

  return <>

      {showWhishList ? <> 

        <Helmet>
                <title>Whishlist</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      
        
                   <div className="container">
                       <h1 className="text-gray-500 dark:text-gray-400 text-xl lg:text-xl px-10 font-semibold mb-4 "> My Whish List</h1>
                       <div className="flex justify-center m-auto lg:justify-start gap-y-6 flex-wrap">        
                           {showWhishList.data?.map((product,index)=> <>
                           
       <div key={index} className=" px-3 w-full md:w-1/2 lg:w-1/3">
       <div className=" bg-gray-100 hover:shadow-main dark:bg-gray-800 dark:text-white hover:border-main border border-gray-100 rounded-lg  transition-all duration-500 shadow-sm dark:border-gray-700">
       
           <img className="p-8 rounded-t-lg" src={product.imageCover} alt="product image" />
       
       <div className="px-5">
       
           <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.title.split(' ',5).join(' ')}</h5>
       
         <div className="flex items-center mt-2.5 mb-1">
           <div className="flex items-center space-x-1 rtl:space-x-reverse">
             <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
               <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
             </svg>
             <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
               <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
             </svg>
             <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
               <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
             </svg>
             <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
               <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
             </svg>
             <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
               <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
             </svg>
           </div>
           <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">{product.ratingsAverage}</span>
           <button onClick={()=>deleteWhishList(product.id)} className="font-medium ms-auto lg:me-8 text-red-600 dark:text-red-500 hover:underline"><i className="fa-solid me-2 fa-trash"></i>Remove</button>
         </div>
         <div className="flex items-center justify-between">
           <div className=" flex">
       
           {product.priceAfterDiscount ?<>
           <span className="text-1xl me-3 dark:text-white  text-gray-900 font-thin  "> <del>{product.price}EGP</del></span>
           <span className="text-1xl text-gray-900 dark:text-white font-medium ">{product.priceAfterDiscount} EGP</span>
          </>  :     <span className="text-1xl dark:text-white text-gray-900 font-medium">{product.price}  EGP</span>}
           </div>
           <div className=" flex flex-col mb-2  ">
           <button onClick={()=>addCart(product.id)} className="text-white mt-3 bg-main mb-2 hover:bg-green-400 focus:bg-green-400 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-main dark:hover:bg-green-500">+ Add to cart</button>
       
           </div>   
         </div>
       </div>
       
       </div>
       </div>
       
                           </>)}          
       
                       </div>
                   </div>
      </>  :<>
      <div className="container h-4/5 flex justify-center items-center">
            <Loader></Loader>
          </div>

      </>
      }
  </>
}
