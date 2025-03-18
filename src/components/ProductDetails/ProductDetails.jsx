import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";
import style from './productDetails.module.css'
import { CartContext } from '../CartContext/CartContext';
import { WhisListContext } from '../../WhishListContext/WhishListContext';
import {Helmet} from "react-helmet";
import Loader from '../Loader/Loader';

export default function ProductDetails() {

    let {postWhishList} = useContext(WhisListContext)
    let {addCart} = useContext(CartContext)
    const [loader, setLoader] = useState(true)
    const [products, setProducts] = useState(true)
    const [relatedProductCategory, setRelatedProductCategory] = useState([])

    var settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows : false,


    };

  let {id,category} = useParams()

    async function productDetails(details) {
          try{
            setLoader(true)
            let {data:{data}}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${details}`)
               setProducts(data)
              //  console.log(data);
               
               setLoader(false)

          }catch{
            setLoader(false)
          }
    }



    async function relatedProducts() {
          try{
      
            let {data:{data}}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
              let relatedProduct = data
             let relatedProductt = relatedProduct.filter(product => product.category.name== category)
              // console.log(relatedProductt);
               setRelatedProductCategory(relatedProductt)
               
               setLoader(false)

          }catch{
            setLoader(false)
          }
    }



        useEffect(()=>{
            productDetails(id)
            relatedProducts()
         
        },[])
        useEffect(()=>{
          productDetails(id)
          relatedProducts()
        },[id])

  return <>  



{loader ?
<div className=" flex  h-3/4  justify-center items-center">
<Loader></Loader>

</div>: <>
 <div className="container">
                <div className= " lg:flex rounded-lg shadow-xl border lg:items-center dark:text-gray-300  p-5">
                            <div className="  lg:w-1/4">
                            <Slider {...settings}>
                          {products.images.map((image,indix)=> <img key={indix} className=' w-full' src={image} alt="" />)}
                          </Slider>
                            </div>
                            <Helmet>
                <meta charSet="utf-8" />
                <title>{products.title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
                            <div className=" lg:w-3/4 lg:p-5  lg:ps-20">
                            <h1 className='lg:text-[30px] text-[20px] mt-6 lg:mt-0'>{products.title}</h1>
                            <p className=' text-gray-400'>{products.description }</p>
                                        <div className=" flex justify-between items-center mt-4">
                                          <div className=" flex flex-col">
                                <span><span className='text-lg text-black dark:text-gray-300 me-1'>{products.price}</span>EGP</span>
                                <div className=" flex items-center">
                                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">

                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                                <span className=' text-yellow-400  ms-3 text-lg'>{products.ratingsAverage}</span>
                                </div>
                                          </div>
                                <i onClick={()=>postWhishList(products.id)} className=" cursor-pointer text-2xl  me-5 mt-3 fa-regular fa-heart text-red-600 ms-auto"></i>
                            </div>
                    <button onClick={()=>{addCart(products.id)}} className='w-full rounded-md bg-main lg:ps-5 lg:pe-5 pt-1 mt-8 pb-1 hover:bg-green-400 text-white'>+ Add Cart</button>
                          </div>
                </div>
            </div>
</>}

{loader ?
            <div className=" flex h-screen justify-center items-center">
                <Loader></Loader>
            </div>: <>
               <h1 className="mt-20 text-xl mb-5 ps-4 text-gray-500 dark:text-gray-400">Related Product:</h1>
                  <div className=" flex  flex-wrap gap-y-4 ">
                      {relatedProductCategory.map((product)=> <div key={product.id} className="m-auto w-full lg:ms-auto p-2 md:w-1/2  lg:w-1/5">
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
                <div className=" flex justify-end">
                            <i onClick={()=>postWhishList(product.id)} className=" cursor-pointer text-2xl  me-5 mt-3 fa-regular fa-heart text-red-600 ms-auto"></i>
                            </div>
                        <button onClick={()=>{addCart(product.id)}} className='w-full text-center hover:bg-green-400 group-hover:translate-y-0 translate-y-full duration-500 group-hover:opacity-100 pt-2 pb-2 ps-4 pe-4 opacity-0 bg-main text-white mt-6 rounded'>+ Add Cart</button>
                      </div>
                        </div>
                      )}        
                      </div>
                      </>
                      }
                    </>
}
