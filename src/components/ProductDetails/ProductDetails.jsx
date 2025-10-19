import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../CartContext/CartContext";
import { WhisListContext } from "../../WhishListContext/WhishListContext";
import { Helmet } from "react-helmet-async";
import Loader from "../Loader/Loader";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetails() {
  const { postWhishList, deleteWhishList, showWhishList } =
    useContext(WhisListContext);
  const { addCart } = useContext(CartContext);
  const [loader, setLoader] = useState(true);
  const [products, setProducts] = useState(true);
  const [relatedProductCategory, setRelatedProductCategory] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const { t } = useTranslation();
  const { id, category } = useParams();

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const isInWishlist = (productId) =>
    showWhishList?.data?.some((item) => item.id === productId);

  const handleWishlistToggle = async (productId) => {
    if (isInWishlist(productId)) {
      await deleteWhishList(productId);
     } else {
      await postWhishList(productId);
     }
  };

  async function productDetails(details) {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${details}`
      );
      setProducts(data.data);
      setLoader(false);
    } catch {
      setLoader(false);
    }
  }

  async function relatedProducts() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      const related = data.data.filter(
        (product) => product.category.name === category
      );
      setRelatedProductCategory(related);
      setLoader(false);
    } catch {
      setLoader(false);
    }
  }

  useEffect(() => {
    productDetails(id);
    relatedProducts();
  }, [id]);

  return (
    <>
      {loader ? (
        <div className="flex h-3/4 justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="container">
            <div className="lg:flex rounded-lg shadow-xl   lg:items-center dark:text-gray-300 p-5 bg-slate-100 dark:bg-slate-800 bg-opacity-60 dark:bg-opacity-100">
              <div className="lg:w-1/4">
                <Slider {...settings}>
                  {products.images.map((image, index) => (
                    <img key={index} className="w-full" src={image} alt="" />
                  ))}
                </Slider>
              </div>

              <Helmet>
                <meta charSet="utf-8" />
                <title>{products.title}</title>
              </Helmet>

              <div className="lg:w-3/4 lg:p-5 lg:ps-20">
                <h1 className="lg:text-[30px] text-[20px] mt-6 lg:mt-0">
                  {products.title}
                </h1>
                <p className="text-gray-400">{products.description}</p>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex flex-col">
                    <span>
                      <span className="text-lg text-black dark:text-gray-300 me-1">
                        {products.price}
                      </span>
                      {t("EGY")}
                    </span>

                    <div className="flex items-center">
                      {Array.from({
                        length: Math.round(products.ratingsAverage),
                      }).map((_, index) => (
                        <svg
                          key={index}
                          className="w-4 h-4 text-yellow-300"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      <span className="text-yellow-400 ms-3 text-lg">
                        {products.ratingsAverage}
                      </span>
                    </div>
                  </div>

                  <i
                    onClick={() => handleWishlistToggle(products.id)}
                    className={`cursor-pointer text-2xl me-5 mt-3 ms-auto fa-heart transition-all duration-300 ${
                      isInWishlist(products.id)
                        ? "fa-solid text-red-500 scale-110"
                        : "fa-regular text-gray-500 hover:text-red-500"
                    }`}
                  ></i>
                </div>

                <button
                  onClick={() => addCart(products.id)}
                  className="w-full rounded-md bg-main pt-1 mt-8 pb-1 hover:bg-green-400 text-white"
                >
                  {t("AddtoCart")}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {!loader && (
        <>
          <h1 className="mt-20 text-xl mb-5 ps-4 text-gray-500 dark:text-gray-400">
            {t("RelatedProduct")}
          </h1>
          <div className="flex flex-wrap gap-y-4 justify-center px-3">
            {relatedProductCategory.map((product) => {
              const isFav = isInWishlist(product.id);

              return (
                <div
                  key={product.id}
                  className="m-auto p-4 lg:p-2 w-full md:w-1/2 lg:w-1/5"
                >
                  <div className="relative bg-white dark:bg-slate-800 dark:text-gray-300 group overflow-hidden rounded-md border border-transparent hover:border-main hover:shadow-lg transition-all duration-300">
                    <div
                      onClick={() => setModalImage(product.imageCover)}
                      className="cursor-pointer relative w-full h-[300px] overflow-hidden rounded-t-md"
                    >
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex justify-center items-center cursor-pointer transition-opacity"
                        onClick={() => setModalImage(product.imageCover)}
                      >
                        <span className="text-white text-lg font-semibold flex items-center gap-2">
                          <i className="fa-solid fa-eye"></i> {t("ViewImage")}
                        </span>
                      </div>
                    </div>

                    <div className="px-3">
                      <h3 className="text-main mt-3">
                        {product.category.name}
                      </h3>
                      <h3 className="text-xl">
                        {product.title.split(" ", 2).join(" ")}
                      </h3>
                      <div className="flex justify-between items-center mt-4">
                        <span>
                          {product.price} {t("EGY")}
                        </span>
                        <span className="text-yellow-400 flex items-center">
                          {Array.from({
                            length: Math.round(product.ratingsAverage),
                          }).map((_, index) => (
                            <i
                              key={index}
                              className="fa-solid fa-star ms-0.5"
                            ></i>
                          ))}
                          <span className="text-gray-600 dark:text-gray-300 ms-2 text-sm">
                            {product.ratingsAverage}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => addCart(product.id)}
                        className="bg-gradient-to-r from-green-400 to-green-600 text-white p-2 rounded-full shadow-md hover:scale-110 transition-transform duration-300"
                        title={t("AddtoCart")}
                      >
                        <i className="fa-solid fa-cart-plus fa-lg"></i>
                      </button>

                      <button
                        onClick={() => handleWishlistToggle(product.id)}
                        className={`p-2 rounded-full shadow-md hover:scale-110 transition-transform duration-300 ${
                          isFav
                            ? "bg-gradient-to-r from-red-400 to-red-600 text-white shadow-[0_0_10px_rgba(239,68,68,0.7)]"
                            : "bg-gray-200 text-gray-100 dark:bg-slate-700 hover:bg-gradient-to-r hover:from-red-400 hover:to-red-600 hover:text-white"
                        }`}
                        title={t("Wishlist")}
                      >
                        <i
                          className={`fa-heart ${
                            isFav ? "fa-solid" : "fa-regular"
                          } fa-lg`}
                        ></i>
                      </button>
                    </div>

                    <div className="px-3 mt-3 pb-3 relative overflow-hidden">
                      <Link
                        to={`/productDetils/${product.id}/${product.category.name}`}
                      >
                        <button
                          className="w-full text-center bg-green-600 text-white py-2 rounded 
                                   transform translate-y-8 opacity-0 
                                   group-hover:translate-y-0 group-hover:opacity-100 
                                   transition-all duration-300 ease-in-out"
                        >
                          {t("viewdetails")}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <img
                src={modalImage}
                alt="Product"
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              />
              <button
                className="absolute top-3 right-5 w-10 h-10 flex items-center justify-center text-white bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 rounded-full hover:rotate-180 transform transition-all duration-300 hover:shadow-[0_0_15px_rgba(147,51,234,0.7)]"
                onClick={() => setModalImage(null)}
                title="Close"
              >
                <i className="fa-solid fa-xmark text-2xl"></i>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
