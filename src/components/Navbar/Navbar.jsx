import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../../assets/freshcart-logo-Ctk0WIKS.svg";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../CartContext/CartContext";
import { WhisListContext } from "../../WhishListContext/WhishListContext";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  let ref = useRef();
  let navigate = useNavigate();
  let { UserToken, setUserToken } = useContext(UserContext);
  let { showWhishList } = useContext(WhisListContext);
  let { cart } = useContext(CartContext);
  const { t, i18n } = useTranslation();

  const [openLang, setOpenLang] = useState(false);
  const [selected, setSelected] = useState("en");

  const options = [
    { value: "en", label: "🇺🇸 English" },
    { value: "ar", label: "🇪🇬 العربية" },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.dir = lng === "ar" ? "rtl" : "ltr";
  };

  const handleSelect = (lang) => {
    setSelected(lang);
    changeLanguage(lang);
    setOpenLang(false);
  };

  useEffect(() => {
    if (localStorage.getItem("darkMood")) {
      document.body.classList.add("dark");
      document.body.style.backgroundColor = "#030712";
      setDarkMode(true);
      if (ref.current) ref.current.checked = true;
    }
  }, []);

  function toggleMe() {
    const body = document.body;
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
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
    const handleScroll = () => setIsScrolling(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const divValidation = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, delay: 0.2, type: "spring", stiffness: 60 },
    },
  };

  return (
    <>
      {/* ✅ Navbar */}
      <motion.header
        variants={divValidation}
        initial="hidden"
        animate="visible"
        className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-500 lg:px-14 navFont ${
          darkMode
            ? "bg-gray-900 border-gray-700 text-white"
            : "bg-slate-100 border-gray-300 text-gray-900"
        }`}
      >
        <nav
          className={`flex items-center justify-between px-6 lg:px-8 ${
            isScrolling ? "py-3" : "py-4"
          }`}
        >
          {/* Logo */}
          <Link to="/">
            <img className="w-[150px]" src={logo} alt="logo" />
          </Link>

          {/* Burger Icon (Mobile) */}
          <button
            onClick={() => setOpen(true)}
            type="button"
            className="lg:hidden text-gray-700 dark:text-gray-300"
          >
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>

          {/* Links (Desktop) */}
          {UserToken && (
            <div className="hidden lg:flex gap-x-6 items-center">
              <NavLink to="/" className="font-semibold hover:text-main">
                {t("home")}
              </NavLink>
              <NavLink to="/category" className="font-semibold hover:text-main">
                {t("category")}
              </NavLink>
              <NavLink to="/brands" className="font-semibold hover:text-main">
                {t("brands")}
              </NavLink>
              <NavLink to="/products" className="font-semibold hover:text-main">
                {t("products")}
              </NavLink>
            </div>
          )}

          {/* Right Side (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            {UserToken ? (
              <>
                {/* Wishlist */}
                <NavLink to="whishList" className="relative">
                  <div className="absolute w-5 h-5 text-xs font-bold text-white bg-main border-2 border-white rounded-full -top-1 -right-2 flex items-center justify-center">
                    {showWhishList.count}
                  </div>
                  <i className="fa-regular fa-heart text-2xl text-main"></i>
                </NavLink>

                {/* Cart */}
                <NavLink to="cart" className="relative">
                  <div className="absolute w-5 h-5 text-xs font-bold text-white bg-main border-2 border-white rounded-full -top-1 -right-2 flex items-center justify-center">
                    {cart?.numOfCartItems}
                  </div>
                  <i className="fa-solid fa-cart-shopping text-2xl text-main"></i>
                </NavLink>

                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleMe}
                  className={`relative flex items-center w-16 h-8 rounded-full transition-all duration-500 ${
                    darkMode ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-500 flex items-center justify-center ${
                      darkMode
                        ? i18n.language === "ar"
                          ? "-translate-x-8"
                          : "translate-x-8"
                        : i18n.language === "ar"
                        ? "-translate-x-1"
                        : "translate-x-1"
                    }`}
                  >
                    {darkMode ? (
                      <MoonIcon className="w-4 h-4 text-blue-500" />
                    ) : (
                      <SunIcon className="w-4 h-4 text-yellow-400" />
                    )}
                  </span>
                </button>

                {/* Language + Logout */}
                <div className="relative">
                  <button
                    onClick={() => setOpenLang(!openLang)}
                    className={`inline-flex items-center justify-between w-36 px-4 py-2 ${
                      darkMode
                        ? "bg-gray-800 text-white"
                        : "bg-white text-black"
                    } border border-gray-300 rounded-xl shadow-sm text-sm font-semibold`}
                  >
                    {options.find((opt) => opt.value === selected)?.label}
                    <i
                      className={`fa-solid fa-chevron-down text-xs transition-transform ${
                        openLang ? "rotate-180" : ""
                      }`}
                    ></i>
                  </button>

                  {openLang && (
                    <div
                      className={`absolute right-0 mt-2 w-36 rounded-xl shadow-lg ${
                        darkMode ? "bg-gray-800 text-white" : "bg-white"
                      } ring-1 ring-black ring-opacity-5 z-50`}
                    >
                      <div className="py-1">
                        {options.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => handleSelect(opt.value)}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-100 ${
                              darkMode
                                ? "hover:text-blue-400"
                                : "hover:text-blue-600"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                        <div className="border-t my-1"></div>
                        <button
                          onClick={deleteToken}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>
                          {t("logout")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <NavLink to="register" className="font-semibold">
                  {t("register")}
                </NavLink>
                <NavLink to="login" className="font-semibold">
                  {t("login")}
                </NavLink>
                <div className="relative">
                  <button
                    onClick={() => setOpenLang(!openLang)}
                    className={`inline-flex items-center justify-between w-36 px-4 py-2 ${
                      darkMode
                        ? "bg-gray-800 text-white"
                        : "bg-white text-black"
                    } border border-gray-300 rounded-xl shadow-sm text-sm font-semibold`}
                  >
                    {options.find((opt) => opt.value === selected)?.label}
                    <i
                      className={`fa-solid fa-chevron-down text-xs transition-transform ${
                        openLang ? "rotate-180" : ""
                      }`}
                    ></i>
                  </button>

                  {openLang && (
                    <div
                      className={`absolute right-0 mt-2 w-36 rounded-xl shadow-lg ${
                        darkMode ? "bg-gray-800 text-white" : "bg-white"
                      } ring-1 ring-black ring-opacity-5 z-50`}
                    >
                      <div className="py-1">
                        {options.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => handleSelect(opt.value)}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-100 ${
                              darkMode
                                ? "hover:text-blue-400"
                                : "hover:text-blue-600"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                        <div className="border-t my-1"></div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </nav>
      </motion.header>

      {/* ✅ Mobile Menu (Drawer) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden navFont"
          onClick={() => setOpen(false)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ x: i18n.language === "ar" ? 300 : -300 }}
            animate={{ x: 0 }}
            exit={{ x: i18n.language === "ar" ? 300 : -300 }}
            transition={{ duration: 0.3, type: "spring" }}
            className={`fixed top-0 ${
              i18n.language === "ar" ? "right-0" : "left-0"
            } h-full w-3/4 sm:w-1/2 ${
              darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
            } shadow-lg p-6 flex flex-col gap-5`}
          >
            <button
              onClick={() => setOpen(false)}
              className="self-end text-3xl text-gray-500 hover:text-red-500 transition"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            {UserToken && (
              <>
                <NavLink
                  to="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 text-lg font-semibold hover:text-main"
                >
                  <i className="fa-solid fa-house"></i> {t("home")}
                </NavLink>
                <NavLink
                  to="/category"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 text-lg font-semibold hover:text-main"
                >
                  <i className="fa-solid fa-list"></i> {t("category")}
                </NavLink>
                <NavLink
                  to="/brands"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 text-lg font-semibold hover:text-main"
                >
                  <i className="fa-solid fa-tag"></i> {t("brands")}
                </NavLink>
                <NavLink
                  to="/products"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 text-lg font-semibold hover:text-main"
                >
                  <i className="fa-solid fa-box"></i> {t("products")}
                </NavLink>

                <div className="border-t my-4 border-gray-600/30"></div>

                <NavLink
                  to="cart"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 text-lg font-semibold hover:text-main"
                >
                  <i className="fa-solid fa-cart-shopping"></i> {t("cart")}
                </NavLink>
                <NavLink
                  to="whishList"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 text-lg font-semibold hover:text-main"
                >
                  <i className="fa-regular fa-heart"></i> {t("wishlist")}
                </NavLink>

                <button
                  onClick={toggleMe}
                  className="mt-3 flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition w-fit"
                >
                  {darkMode ? (
                    <>
                      <SunIcon className="w-5 h-5 text-yellow-400" />
                      {t("light mode")}
                    </>
                  ) : (
                    <>
                      <MoonIcon className="w-5 h-5 text-blue-500" />
                      {t("dark mode")}
                    </>
                  )}
                </button>

                <button
                  onClick={deleteToken}
                  className="text-red-500 font-semibold mt-4 flex items-center gap-2 text-center"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  {t("logout")}
                </button>
              </>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}
