import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../../assets/freshcart-logo-Ctk0WIKS.svg";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../CartContext/CartContext";
import { WhisListContext } from "../../WhishListContext/WhishListContext";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  let ref = useRef();
  let navigate = useNavigate();
  let { UserToken, setUserToken } = useContext(UserContext);
  let { showWhishList } = useContext(WhisListContext);
  let { cart } = useContext(CartContext);
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.dir = lng === "ar" ? "rtl" : "ltr"; // دعم الاتجاه
  };
  useEffect(() => {
    if (localStorage.getItem("darkMood") && ref.current) {
      document.body.classList.add("dark");
      document.body.style.backgroundColor = "#030712";
      ref.current.checked = true;
    }
  }, []);

  function toggleMe() {
    let body = document.body;
    if (ref.current?.checked) {
      body.classList.add("dark");
      body.style.backgroundColor = "#030712";
      localStorage.setItem("darkMood", "dark");
    } else {
      body.classList.remove("dark");
      body.style.backgroundColor = "#eeee";
      localStorage.removeItem("darkMood");
    }
  }

  function deleteToken() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }

  useEffect(() => {
    function handleScroll() {
      setIsScrolling(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        type: "spring",
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
            isScrolling ? "py-3" : "py-3.5"
          } flex items-center transition-[padding] duration-500 px-6 dark:bg-gray-900 lg:px-8`}
        >
          <div className="flex items-center">
            <Link to={""}>
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
              <NavLink
                to="/"
                className="rtl:text-lg font-semibold text-gray-500 dark:text-gray-400"
              >
                {t("home")}
              </NavLink>
              <NavLink
                to={"category"}
                className="rtl:text-lg font-semibold text-gray-500 dark:text-gray-400"
              >
                {t("category")}
              </NavLink>
              <NavLink
                to={"brands"}
                className="rtl:text-lg font-semibold text-gray-500 dark:text-gray-400"
              >
                {t("brands")}
              </NavLink>
              <NavLink
                to={"products"}
                className="rtl:text-lg font-semibold text-gray-500 dark:text-gray-400"
              >
                {t("products")}
              </NavLink>
            </div>
          )}

          {/* Right Side */}
          <div className="hidden lg:flex lg:flex-1 lg:gap-x-3 lg:justify-end items-center">
            {UserToken ? (
              <>
         
                {/* Whishlist */}
                <NavLink
                  to={"whishList"}
                  className="relative rtl:-translate-x-5 ltr:translate-x-5"
                >
                  <div className="absolute w-5 h-5 text-xs font-bold text-white bg-main border-2 border-white rounded-full -top-1 left-3 flex items-center justify-center z-50">
                    {showWhishList.count}
                  </div>
                  <i className="fa-regular fa-heart text-2xl text-main"></i>
                </NavLink>

                {/* Cart */}
                <NavLink to={"cart"} className="relative ms-4">
                  <div className="absolute w-5 h-5 text-xs font-bold text-white bg-main border-2 border-white rounded-full -top-1 -end-2 flex items-center justify-center">
                    {cart?.numOfCartItems}
                  </div>
                  <i className="fa-solid fa-cart-shopping text-2xl text-main"></i>
                </NavLink>

                {/* Social Icons */}
                <div className="flex gap-3 mx-1">
                  <a
                    href="https://www.facebook.com/share/1BzvN2c3rE/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-facebook text-gray-600 dark:text-gray-400 hover:text-blue-600 text-xl"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ziad-mostafa-859256291?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-linkedin text-gray-600 dark:text-gray-400 hover:text-blue-600 text-xl"></i>
                  </a>
                  <a
                    href="https://github.com/11ziad"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-github text-gray-600 dark:text-gray-400 hover:text-gray-800 text-xl"></i>
                  </a>
                  <a
                    href="https://wa.me/201280226462"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-whatsapp text-gray-600 dark:text-gray-400 hover:text-gray-800 text-xl"></i>
                  </a>
                </div>

                {/* Toggle */}
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    ref={ref}
                    onChange={toggleMe}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-400 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>

                {/* Logout */}
                <span
                  onClick={deleteToken}
                  className="text-md font-semibold cursor-pointer hover:text-main text-gray-500 dark:text-gray-400 "
                >
                  {t("logout")}
                  <i className="fa-solid fa-arrow-right-from-bracket text-main ms-1"></i>
                </span>
                       <div className="flex gap-3 items-center">
                  {/* زر اللغة العربية */}
                  <button
                    onClick={() => changeLanguage("ar")}
                    title="العربية"
                    className="w-8 h-6"
                  >
                    <img
                      src="https://flagcdn.com/w40/eg.png"
                      alt="Arabic"
                      className="rounded-md w-full h-full object-cover"
                    />
                  </button>

                  {/* زر اللغة الإنجليزية */}
                  <button
                    onClick={() => changeLanguage("en")}
                    title="English"
                    className="w-8 h-6"
                  >
                    <img
                      src="https://flagcdn.com/w40/us.png"
                      alt="English"
                      className="rounded-md w-full h-full object-cover"
                    />
                  </button>
                </div>

              </>
            ) : (
              <>
                <div className="flex gap-3 items-center">
                  {/* زر اللغة العربية */}
                  <button
                    onClick={() => changeLanguage("ar")}
                    title="العربية"
                    className="w-8 h-8"
                  >
                    <img
                      src="https://flagcdn.com/w40/eg.png"
                      alt="Arabic"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </button>

                  {/* زر اللغة الإنجليزية */}
                  <button
                    onClick={() => changeLanguage("en")}
                    title="English"
                    className="w-8 h-8"
                  >
                    <img
                      src="https://flagcdn.com/w40/us.png"
                      alt="English"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </button>
                </div>
                <NavLink
                  to={"register"}
                  className="text-sm font-semibold text-gray-500 dark:text-gray-400"
                >
                  {t("register")}
                </NavLink>
                <NavLink
                  to={"login"}
                  className="text-sm font-semibold text-gray-500 dark:text-gray-400 ms-3"
                >
                  {t("login")}
                </NavLink>
              </>
            )}
            
          </div>
        {isOpen && (
  <motion.nav
    initial={{ x: 300 }}
    animate={{ x: 0 }}
    exit={{ x: 300 }}
    className="fixed lg:hidden right-0 top-0 z-50 h-screen w-1/2 bg-slate-200 dark:bg-gray-900 shadow-md p-6"
  >
    {/* زر الإغلاق ثابت في الأعلى */}
    <button
      onClick={() => setOpen(false)}
      className="absolute top-4 end-4 text-gray-600 dark:text-gray-300 text-2xl z-50"
    >
      <i className="fa-solid fa-xmark"></i>
    </button>

    {/* باقي عناصر المينيو */}
    <div className="flex flex-col mt-12 gap-y-4">
      {UserToken ? (
        <>
          <NavLink to="/" onClick={() => setOpen(false)} className="text-gray-700 dark:text-gray-300 text-base">
            {t("home")}
          </NavLink>
          <NavLink to="/category" onClick={() => setOpen(false)} className="text-gray-700 dark:text-gray-300 text-base">
            {t("category")}
          </NavLink>
          <NavLink to="/brands" onClick={() => setOpen(false)} className="text-gray-700 dark:text-gray-300 text-base">
            {t("brands")}
          </NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)} className="text-gray-700 dark:text-gray-300 text-base">
            {t("products")}
          </NavLink>
          <NavLink to="/cart" onClick={() => setOpen(false)} className="text-gray-700 dark:text-gray-300 text-base">
            {t("cart")}
          </NavLink>
          <NavLink to="/whishList" onClick={() => setOpen(false)} className="text-gray-700 dark:text-gray-300 text-base">
            {t("wishlist")}
          </NavLink>
          <span
            onClick={() => {
              deleteToken();
              setOpen(false);
            }}
            className="cursor-pointer text-gray-700 dark:text-gray-300 text-base"
          >
            {t("logout")}
          </span>
        </>
      ) : (
        <>
          <NavLink to="/register" onClick={() => setOpen(false)} className="text-gray-700 dark:text-gray-300 text-base">
            {t("register")}
          </NavLink>
          <NavLink to="/login" onClick={() => setOpen(false)} className="text-gray-700 dark:text-gray-300 text-base">
            {t("login")}
          </NavLink>
        </>
      )}

      {/* زرار تغيير اللغة في الموبايل */}
      <div className="flex gap-2 mt-4">
        <button onClick={() => changeLanguage("ar")} title="العربية" className="w-8 h-6">
          <img src="https://flagcdn.com/w40/eg.png" alt="Arabic" className="rounded-md w-full h-full object-cover" />
        </button>
        <button onClick={() => changeLanguage("en")} title="English" className="w-8 h-6">
          <img src="https://flagcdn.com/w40/us.png" alt="English" className="rounded-md w-full h-full object-cover" />
        </button>
      </div>
    </div>
  </motion.nav>
)}

        </nav>
        
      </motion.header>
    </>
  );
}
