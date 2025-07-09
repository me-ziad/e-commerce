import React, { useContext, useEffect, useRef, useState } from 'react';
import logo from '../../assets/freshcart-logo-Ctk0WIKS.svg';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../CartContext/CartContext';
import { WhisListContext } from '../../WhishListContext/WhishListContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  let ref = useRef();
  let navigate = useNavigate();
  let { UserToken, setUserToken } = useContext(UserContext);
  let { showWhishList } = useContext(WhisListContext);
  let { cart } = useContext(CartContext);

  
useEffect(() => {
  if (localStorage.getItem('darkMood') && ref.current) {
    document.body.classList.add('dark');
    document.body.style.backgroundColor = '#030712';
    ref.current.checked = true;
  }
}, []);

  function toggleMe() {
    let body = document.body;
    if (ref.current?.checked) {
      body.classList.add('dark');
      body.style.backgroundColor = '#030712';
      localStorage.setItem('darkMood', 'dark');
    } else {
      body.classList.remove('dark');
      body.style.backgroundColor = '#eeee';
      localStorage.removeItem('darkMood');
    }
  }

  function deleteToken() {
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login');
  }

  useEffect(() => {
    function handleScroll() {
      setIsScrolling(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const divValidation = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.2,
        type: 'spring',
        stiffness: 60,
      },
    },
  };

  return (
    <>
      <motion.header
        variants={divValidation}
        initial="hidden"
        animate="visible"
        className="fixed text-center border-b border-gray-400 dark:border-gray-700 inset-x-0 top-0 z-40 bg-slate-200"
      >
        <nav
          className={`${
            isScrolling ? 'py-3' : 'py-3.5'
          } flex items-center transition-[padding] duration-500 px-6 dark:bg-gray-900 lg:px-8`}
        >
          <div className="flex items-center">
            <Link to={''}>
              <img className="w-[150px]" src={logo} alt="logo" />
            </Link>
          </div>

          <div className="ms-auto lg:hidden">
            <button
              onClick={() => setOpen(true)}
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 dark:text-gray-400 text-gray-700"
            >
              <i className="fa-solid fa-bars text-xl" />
            </button>
          </div>

          {UserToken && (
            <div className="hidden lg:flex lg:gap-x-4 ms-7">
              <NavLink to={''} className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Home
              </NavLink>
              <NavLink to={'category'} className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Category
              </NavLink>
              <NavLink to={'brands'} className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Brands
              </NavLink>
              <NavLink to={'products'} className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Products
              </NavLink>
            </div>
          )}

          {/* Right Side */}
          <div className="hidden lg:flex lg:flex-1 lg:gap-x-3 lg:justify-end items-center">
            {UserToken ? (
              <>
                {/* Whishlist */}
                <NavLink to={'whishList'} className="relative translate-x-3">
                  <div className="absolute w-5 h-5 text-xs font-bold text-white bg-main border-2 border-white rounded-full -top-1 left-3 flex items-center justify-center z-50">
                    {showWhishList.count}
                  </div>
                  <i className="fa-regular fa-heart text-2xl text-main"></i>
                </NavLink>

                {/* Cart */}
                <NavLink to={'cart'} className="relative ms-4">
                  <div className="absolute w-5 h-5 text-xs font-bold text-white bg-main border-2 border-white rounded-full -top-1 -end-2 flex items-center justify-center">
                    {cart?.numOfCartItems}
                  </div>
                  <i className="fa-solid fa-cart-shopping text-2xl text-main"></i>
                </NavLink>

                {/* Social Icons */}
                <div className="flex gap-3 mx-4">
                  <a href="https://www.facebook.com/share/1BzvN2c3rE/" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-facebook text-gray-600 dark:text-gray-400 hover:text-blue-600 text-xl"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/ziad-mostafa-859256291?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-linkedin text-gray-600 dark:text-gray-400 hover:text-blue-600 text-xl"></i>
                  </a>
                  <a href="https://github.com/11ziad" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-github text-gray-600 dark:text-gray-400 hover:text-gray-800 text-xl"></i>
                  </a>
                  <a href="https://wa.me/201280226462" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-whatsapp text-gray-600 dark:text-gray-400 hover:text-gray-800 text-xl"></i>
                  </a>
                </div>

                {/* Toggle */}
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" ref={ref} onChange={toggleMe} className="sr-only peer" />
                  <div className="relative w-11 h-6 bg-gray-400 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>

                {/* Logout */}
                <span
                  onClick={deleteToken}
                  className="text-sm font-semibold cursor-pointer hover:text-main text-gray-500 dark:text-gray-400 ms-3"
                >
                  Log_Out_ <i className="fa-solid fa-arrow-right-from-bracket text-main ms-1"></i>
                </span>
              </>
            ) : (
              <>
                <NavLink to={'register'} className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Register
                </NavLink>
                <NavLink to={'login'} className="text-sm font-semibold text-gray-500 dark:text-gray-400 ms-3">
                  Login <span>→</span>
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </motion.header>
    </>
  );
}
