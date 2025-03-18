import React, { useContext } from 'react'
import { CartContext } from '../CartContext/CartContext'
import {NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Loader from '../Loader/Loader'

export default function Cart() {

  let {cart,clearCart,deleteCart,updateCart} = useContext(CartContext)


  return<>
  <h1 className='text-gray-500 dark:text-gray-400 text-xl lg:text-xl px-10 font-semibold mb-4'>MyCart:</h1>
        {cart? <>
        
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700   dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
              Product
              </th>
              <th scope="col" className="px-6  py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
                </th>
              <th scope="col" className="px-6 py-3">
              Action
              </th>
              </tr>
          </thead>
          <tbody>
             <Helmet>
                            <title>Cart</title>
                            <link rel="canonical" href="http://mysite.com/example" />
                        </Helmet>
        
      {cart.data?.products.map((item, indix)=><tr key={indix} className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600 border-b dark:text-gray-400 border-gray-200 hover:bg-gray-50 ">
      
      
      
              <td className="p-1">
                <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
              </td>
              <td className="px-6 py-1 font-semibold text-gray-900  dark:text-gray-400">
                {item.product.category.name} <span className=' text-yellow-400 ms-3' >{item.product.ratingsAverage}<i className="fa-solid fa-star ms-1 text-yellow-400"></i></span>
                        </td>
              <td className="px-6 py-1">
                <div className="flex items-center">
                  <button onClick={()=> item.count<1 ? deleteCart(item.product.id): updateCart(item.product.id, item.count-1)}  className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white  dark:bg-gray-900 border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200  dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">werrr
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>
                  <div>
                    <input type="number" id="first_product" className="bg-gray-50 dark:bg-gray-900 disabled: w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={item.count} required />
                  </div>
                  <button onClick={()=>updateCart(item.product.id, item.count+1)}  className="inline-flex  dark:bg-gray-900 items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200   dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-1 font-semibold ">
            {item.price * item.count}
              </td>
              <td className="px-6 py-1">
                <button onClick={()=>deleteCart(item.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline"><i className="fa-solid me-2 fa-trash"></i>Remove</button>
              </td>
            </tr>
        )}
     
          </tbody>
        </table>
            <div className=" w-full ps-10 lg:ps-0 py-6 lg:flex-row flex justify-center lg:justify-around flex-col">
      
            <div className=" mt-4">
            <h1  className=' uppercase  font-bold text-xl ps-2 lg:text-2xl text-cyan-800'>total price <span className='ms-4 text-[#FF9119]'>{cart.data?.totalCartPrice} EGY</span ></h1>
            </div>
            <div className=" mt-5 ps-10 lg:ps-0">
      
         <NavLink to={'/payVisa'}>
            <button type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2 lg:px-5 lg:py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 me-2 mb-2">
      <svg aria-hidden="true" className="w-10 h-3 me-2 -ms-1" viewBox="0 0 660 203" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M233.003 199.762L266.362 4.002H319.72L286.336 199.762H233.003V199.762ZM479.113 8.222C468.544 4.256 451.978 0 431.292 0C378.566 0 341.429 26.551 341.111 64.604C340.814 92.733 367.626 108.426 387.865 117.789C408.636 127.387 415.617 133.505 415.517 142.072C415.384 155.195 398.931 161.187 383.593 161.187C362.238 161.187 350.892 158.22 333.368 150.914L326.49 147.803L319.003 191.625C331.466 197.092 354.511 201.824 378.441 202.07C434.531 202.07 470.943 175.822 471.357 135.185C471.556 112.915 457.341 95.97 426.556 81.997C407.906 72.941 396.484 66.898 396.605 57.728C396.605 49.591 406.273 40.89 427.165 40.89C444.611 40.619 457.253 44.424 467.101 48.39L471.882 50.649L479.113 8.222V8.222ZM616.423 3.99899H575.193C562.421 3.99899 552.861 7.485 547.253 20.233L468.008 199.633H524.039C524.039 199.633 533.198 175.512 535.27 170.215C541.393 170.215 595.825 170.299 603.606 170.299C605.202 177.153 610.098 199.633 610.098 199.633H659.61L616.423 3.993V3.99899ZM551.006 130.409C555.42 119.13 572.266 75.685 572.266 75.685C571.952 76.206 576.647 64.351 579.34 57.001L582.946 73.879C582.946 73.879 593.163 120.608 595.299 130.406H551.006V130.409V130.409ZM187.706 3.99899L135.467 137.499L129.902 110.37C120.176 79.096 89.8774 45.213 56.0044 28.25L103.771 199.45L160.226 199.387L244.23 3.99699L187.706 3.996" fill="#0E4595"/><path d="M86.723 3.99219H0.682003L0 8.06519C66.939 24.2692 111.23 63.4282 129.62 110.485L110.911 20.5252C107.682 8.12918 98.314 4.42918 86.725 3.99718" fill="#F2AE14"/></svg>
      Pay with Visa
      </button>
      </NavLink>
      <NavLink to={'/payCash'}>
         <button type="button" className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2">
      <svg className="w-4 h-4 me-2 -ms-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="bitcoin" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.1-111 248-248 248S8 392.1 8 256 119 8 256 8s248 111 248 248zm-141.7-35.33c4.937-32.1-20.19-50.74-54.55-62.57l11.15-44.7-27.21-6.781-10.85 43.52c-7.154-1.783-14.5-3.464-21.8-5.13l10.93-43.81-27.2-6.781-11.15 44.69c-5.922-1.349-11.73-2.682-17.38-4.084l.031-.14-37.53-9.37-7.239 29.06s20.19 4.627 19.76 4.913c11.02 2.751 13.01 10.04 12.68 15.82l-12.7 50.92c.76 .194 1.744 .473 2.829 .907-.907-.225-1.876-.473-2.876-.713l-17.8 71.34c-1.349 3.348-4.767 8.37-12.47 6.464 .271 .395-19.78-4.937-19.78-4.937l-13.51 31.15 35.41 8.827c6.588 1.651 13.05 3.379 19.4 5.006l-11.26 45.21 27.18 6.781 11.15-44.73a1038 1038 0 0 0 21.69 5.627l-11.11 44.52 27.21 6.781 11.26-45.13c46.4 8.781 81.3 5.239 95.99-36.73 11.84-33.79-.589-53.28-25-65.99 17.78-4.098 31.17-15.79 34.75-39.95zm-62.18 87.18c-8.41 33.79-65.31 15.52-83.75 10.94l14.94-59.9c18.45 4.603 77.6 13.72 68.81 48.96zm8.417-87.67c-7.673 30.74-55.03 15.12-70.39 11.29l13.55-54.33c15.36 3.828 64.84 10.97 56.85 43.03z"></path></svg>
      Pay with Cash
      </button>
         </NavLink>
         </div>
      
            </div>  
            <div className=" w-full flex justify-center mt-5">
      
            <button onClick={()=>clearCart()} className=' text-center hover:bg-red-600  pt-2 pb-2 ps-4 pe-4 bg-red-500 mb-4 text-white mt-6 rounded'>Remover Cart</button> 
            </div>
      </div>
        
      </>:
      <div className="container mt-40 h-3/4 flex justify-center items-center">
        <Loader></Loader>
            </div>
          } 
    
  

</>

}
