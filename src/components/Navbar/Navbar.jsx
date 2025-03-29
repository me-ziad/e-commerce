import React, { useContext, useEffect, useRef, useState } from 'react'
import logo from '../../assets/freshcart-logo-Ctk0WIKS.svg'
import { NavLink, useNavigate,Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../CartContext/CartContext'
import { WhisListContext } from '../../WhishListContext/WhishListContext'
import {motion} from 'framer-motion' 

export default function Navbar() {

  const [isOpen, setOpen] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)

  let ref = useRef() 
  let navigate = useNavigate()
  let {UserToken,setUserToken} =useContext(UserContext)
  let {showWhishList}= useContext(WhisListContext)
  let {cart} = useContext(CartContext)

    useEffect(() => {
      ref.current?.checked === true;
      if (localStorage.getItem('darkMood')) {
        document.body.classList.add('dark');
        document.body.style.backgroundColor = '#030712';
        ref.current?.checked === true;
      }
    }, []);
  
    function toggleMe() {
      let body = document.body;
      if (ref.current.checked === true) {
        body.classList.add('dark');
        body.style.backgroundColor = '#030712';
        localStorage.setItem('darkMood', 'dark');
      } else {
        body.classList.remove('dark');
        body.style.backgroundColor = '#eeee';
        localStorage.removeItem('darkMood');
      }
    }

  function deleteToken(){
    // console.log('deleteToken');
    localStorage.removeItem('userToken');
    // window.location.reload();
    navigate('/login');
    setUserToken(null);
   
  }

  function handelScroll() {
    if(window.scrollY > 20){
      setIsScrolling(true)
    }else{
      setIsScrolling(false);
    }
  }

  window.addEventListener('scroll', handelScroll);
  
  const divValidation = {
      hidden : {
        y :-100,
        opacity : 0,
      },
      visible :{
        y : 0,
        opacity : 1,
        transition :{
          duration : .4,
          delay : .2,  
        type : "spring",
        stiffness : 60,
        }
      }
  }
  
  return <>

<motion.header 
  variants={divValidation}
  initial = "hidden"
  animate = "visible"
className="fixed text-center border-gray-400 dark:border-gray-700  border-solid border-b   inset-x-0 top-0 z-40  bg-slate-200">
    <nav className= {`${ isScrolling === true ? 'py-3': 'py-3.5'} flex items-center transition-[padding] duration-500  px-6  dark:bg-gray-900 lg:px-8" aria-label="Global` } >
      <div className=" flex items-center">
        <Link to={''} className="">
          <img className=" w-[150px]" src={logo} alt='' />
        </Link>
      </div>
      <div className=" ms-auto lg:hidden">
        <button onClick={()=>{setOpen(true)}} type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 dark:text-gray-400 text-gray-700">
          <span className="sr-only">Open main menu</span>
          <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      {UserToken &&
      <div className="hidden lg:flex lg:gap-x-4 ms-7">
        <NavLink to={''} className="text-sm/6 font-semibold  text-gray-500 rounded-md dark:text-gray-400">Home</NavLink>
        <NavLink to={'category'} className="text-sm/6 font-semibold  text-gray-500 rounded-md dark:text-gray-400">Category</NavLink>
        <NavLink to={'brands'} className="text-sm/6 font-semibold  text-gray-500 rounded-md dark:text-gray-400">Brands</NavLink>
        <NavLink to={'products'} className="text-sm/6 font-semibold  text-gray-500 rounded-md dark:text-gray-400">Products</NavLink>
      </div>
      }
                    {UserToken ?
                  <div className="hidden lg:flex lg:flex-1 lg:gap-x-3 lg:justify-end">
                    <NavLink to={'whishList'} className="text-sm/6 font-semibold   text-gray-500">
            <button type="button" className="relative inline-flex items-center me-1 ps-1  text-sm font-medium text-center text-white rounded-lg hover:scale-110 transition-all  focus:outline-none ">
            <span className="sr-only">Notifications</span>
            <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-main border-2 border-white rounded-full z-50 -top-2 left-5 ">{showWhishList.count }</div>
                    <i className=" fa-regular text-2xl fa-heart text-main lg:translate-x-0 "></i>
            </button>
                      </NavLink>
                    <NavLink to={'cart'} className="text-sm/6 me-4 font-semibold  text-gray-500">
                    
            <button type="button" className="relative inline-flex items-center  text-sm font-medium text-center text-white  rounded-lg hover:scale-110 transition-all  focus:outline-none ">
            <span className="sr-only">Notifications</span>
            <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-main border-2 border-white rounded-full -top-2 -end-2 ">{cart?.numOfCartItems}</div>
                    <i className=" fa-solid text-2xl fa-cart-shopping text-main "> </i>        
            </button>

                      </NavLink>
                  <div className=' flex justify-center'>
            <a href="https://www.facebook.com/share/1BJvTnY5Wq/">
              <i className="fa-brands text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-700 hover:cursor-pointer fa-facebook me-3 text-xl" />
              </a>
              <i className="fa-brands text-gray-600 hover:text-blue-600 dark:hover:text-blue-600 dark:text-gray-400 hover:cursor-pointer fa-linkedin me-3 text-xl" />
              <a href="https://github.com/11ziad">

              <i className="fa-brands text-gray-600 hover:text-gray-600 dark:hover:text-gray-600 hover:cursor-pointer dark:text-gray-400 fa-github me-3 text-xl" />
              </a>

              <i className="fa-solid text-gray-600 hover:text-yellow-600 dark:hover:text-yellow-600 hover:cursor-pointer fa-envelope me-3 dark:text-gray-400 text-xl"></i>
            </div>
            
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultValue ref={ref} onChange={toggleMe} className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600" />
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
            </label>
                  <span onClick={()=>{deleteToken()}} className="text-sm/6 font-semibold hover:cursor-pointer hover:text-main lg:translate-y-1 dark:text-gray-400 text-gray-500">Log_Out_<i className="fa-solid fa-arrow-right-from-bracket text-main"></i></span>  
                        </div>  :<>
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:gap-x-3 lg:justify-end">
                <NavLink to={'register'} className="text-sm/6 font-semibold rounded-md py-1 dark:text-gray-400 ">Register </NavLink>
                <NavLink to={'login'} className="text-sm/6 font-semibold rounded-md py-1 px-3  dark:text-gray-400 text-black">Login <span aria-hidden="true">→</span></NavLink>
                </div>
                  </>
              
                  }
    </nav>
    <div className={isOpen ? ' lg:hidden' : ' hidden'} role="dialog" aria-modal="true">
      {/* Background backdrop, show/hide based on slide-over state. */}
      <div className="fixed inset-0 z-50" />
      <div  className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto  dark:bg-gray-900 bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          
            <div className=" flex justify-between w-full items-center mt-3">
            <Link to={''} className="-m-1.5 p-1.5">
                        <img className=" w-[150px]" src={logo} alt='' />
                    </Link>                  
            </div>
                <button onClick={()=>{setOpen(false)}} type="button" className="-m-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-400 rounded-md p-2.5 dark:text-gray-500 text-gray-700">
                  <span className="sr-only">Close menu</span>

                  <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
        </div>

                    <div className="mt-6 flow-root">
                      <div className="-my-6 divide-y divide-gray-500/10">
                      {UserToken &&
                      
                        <div className="space-y-2 flex-col flex py-6">
                          <NavLink onClick={()=>{setOpen(false)}}  to={''} className="-mx-3 block rounded-lg  py-3 text-base/7  font-semibold text-gray-600 dark:hover:bg-gray-800 dark:text-gray-400 hover:bg-gray-50">Home</NavLink>
                          <NavLink onClick={()=>{setOpen(false)}}  to={'whishList'} className="text-sm/6 font-semibold  text-gray-500">
                    
            <button type="button" className="relative inline-flex items-center  text-sm font-medium text-center text-white rounded-lg hover:scale-110 transition-all  focus:outline-none ">
            <span className="sr-only">Notifications</span>
              <div className="absolute inline-flex items-center justify-center w-5 h-5  text-xs font-bold text-white bg-main border-2 border-white rounded-full z-50 -top-2 -end-3 ">{showWhishList.count}</div>
                    <i className=" fa-regular text-2xl fa-heart text-main mb-2 lg:translate-x-3 "></i>
            </button>
                      </NavLink>
                    <NavLink onClick={()=>{setOpen(false)}}  to={'cart'} className="text-sm/6  py-3 font-semibold  text-gray-500">
                    
            <button onClick={()=>{setOpen(false)}}  type="button" className="relative inline-flex items-center  text-sm font-medium text-center text-white  rounded-lg hover:scale-110 transition-all  focus:outline-none ">
            <span className="sr-only">Notifications</span>
              <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-main border-2 border-white rounded-full -top-2 -end-2 ">{cart?.numOfCartItems}</div>
                    <i className=" fa-solid text-2xl fa-cart-shopping text-main "></i>        
            </button>
                      </NavLink>

                          <NavLink onClick={()=>{setOpen(false)}}  to={'category'} className="-mx-3 block rounded-lg px-3 py-3 text-base/7 font-semibold text-gray-600 dark:hover:bg-gray-800 dark:text-gray-400 hover:bg-gray-50">Category</NavLink>
                          <NavLink onClick={()=>{setOpen(false)}}  to={'brands'} className="-mx-3 block rounded-lg px-3 py-3 text-base/7 font-semibold text-gray-600 dark:hover:bg-gray-800 dark:text-gray-400 hover:bg-gray-50">Brands</NavLink>
                          <NavLink onClick={()=>{setOpen(false)}}  to={'products'} className="-mx-3 block rounded-lg px-3 py-3 text-base/7 font-semibold text-gray-600 dark:hover:bg-gray-800 dark:text-gray-400 hover:bg-gray-50">Products</NavLink>

                          <div onClick={()=>{setOpen(false)}}  className=' flex justify-between w-2/5 m-auto '>
                            <i className="fa-brands dark:text-gray-400  hover:text-blue-700 hover:cursor-pointer fa-facebook  text-xl" />
                            <i className="fa-brands dark:text-gray-400 hover:text-blue-600 hover:cursor-pointer fa-linkedin text-xl" />
                              <i className="fa-brands dark:text-gray-400 hover:text-gray-600 hover:cursor-pointer fa-github text-xl" />
                              <i className="fa-solid hover:text-yellow-600 dark:text-gray-400 hover:cursor-pointer fa-envelope text-xl"></i>
                              </div>
                          </div>
                      }
                        {UserToken ?<>
                        <div className="py-6">
                          <span onClick={()=>{deleteToken()}} className="-mx-3 cursor-pointer block rounded-lg px-3 py-2.5 text-base/7 font-semibold  dark:text-gray-400  text-gray-900 dark:hover:bg-gray-800 hover:bg-gray-50">Log out_<i className="fa-solid ms-2 fa-arrow-right-from-bracket text-main"></i></span></div>
                        </>:
                          <>
                          <div className="py-6">
                          <NavLink onClick={()=>{setOpen(false)}}  to={'register'} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold  dark:text-gray-400 text-gray-900 hover:bg-gray-50">Register</NavLink>
                          <NavLink onClick={()=>{setOpen(false)}}  to={'login'} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold  dark:text-gray-400  text-black hover:bg-gray-50">Login</NavLink>
                          <div className=" flex items-center gap-x-4 mt-4 lg:me-3 lg:mt-1">
                          </div>
                        </div>
            </>
                        }
                      </div>
                    </div>
      </div>
    </div>

    {/* Mobile menu, show/hide based on menu open state. */}
  </motion.header>
 
  </>
}
