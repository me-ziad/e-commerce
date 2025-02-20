import React, { useContext, useEffect } from 'react'
import style from './Products.module.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../redux/ShowProucts/ShowProducts'
import { CartContext } from '../CartContext/CartContext';

export default function Product() {
      
  let {addCart}= useContext(CartContext)
    let {product,isLoading} = useSelector((store)=> store.productReducer)
        let dispatch =useDispatch()
    useEffect(()=>{
        dispatch( getProduct())
   
    },[])
return<>


<h1 className= {`${style.styleHeader} text-main text-3xl px-10 font-semibold mb-4`}>All Products</h1>

{isLoading ?
<div className=" flex h-screen justify-center items-center">
<i className="text-6xl text-main fa-solid fa-spinner fa-spin-pulse"></i>

</div>: <>

      <div className=" flex  flex-wrap gap-y-4 justify-center">
        
          {product.map((product)=> <div key={product.id} className="m-auto  p-2 sm:w-full md:w-1/2  lg:w-1/5">
          
          <div className=" shadow-md group overflow-hidden group dark:bg-slate-800 dark:text-gray-400  w-full p-3 hover:border-main hover:border-[1px] hover:shadow-lg transition-all hover:border-solid rounded-sm">
<Link to={`/productDetils/${product.id}/${product.category.name}`}>
            <img className="w-full  h-[300px] object-cover" src={product.imageCover} alt="" />
                <h3 className=' text-main'>{product.category.name}</h3>
                <h3 className=' text-xl'>{product.title.split(' ',2).join(' ')}</h3>
           
            <div className=" flex justify-between items-center mt-4">
                <span>{product.price}EGP</span>
                <span className=' text-yellow-400'>{product.ratingsAverage}<i className="fa-solid fa-star ms-2"></i></span>
            </div>
    </Link>
            <button onClick={()=>{addCart(product.id)}} className='w-full text-center hover:bg-green-400 group-hover:translate-y-0 translate-y-full duration-500 group-hover:opacity-100 pt-2 pb-2 ps-4 pe-4 opacity-0 bg-main text-white mt-6 rounded'>Add Cart</button>
           </div>
            
      
            </div>
                        
          )}        
          </div>
        
  
</>
}</>
}

