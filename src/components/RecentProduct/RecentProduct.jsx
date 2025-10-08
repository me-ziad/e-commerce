import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";
import { WhisListContext } from "../../WhishListContext/WhishListContext";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import Footer from "../Footr/Footer";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function RecentProduct() {
  const { addCart, cart, displayCart } = useContext(CartContext);
  const { postWhishList, showWhishList } = useContext(WhisListContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [modalImage, setModalImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getProduct = () =>
    axios.get("https://ecommerce.routemisr.com/api/v1/products");
  const { data, isLoading } = useQuery({
    queryKey: ["recentProduct"],
    queryFn: getProduct,
  });

  useEffect(() => {
    displayCart();
  }, []);

  const handleAddToCart = async (productId) => {
    const alreadyInCart = cart?.data?.products?.some(
      (item) => item.product.id === productId
    );
    if (alreadyInCart) {
      toast.error(t("This product is already in your cart."));
      return;
    }
    await addCart(productId);
    await displayCart();
  };

  const handleAddToWishlist = (productId) => {
    const alreadyInWishlist = showWhishList?.data?.some(
      (item) => item.id === productId
    );
    if (alreadyInWishlist) {
      toast.error(t("This product is already in your favourites."));
      return;
    }
    postWhishList(productId);
  };

  const isInWishlist = (productId) =>
    showWhishList?.data?.some((item) => item.id === productId);

  const isInCart = (productId) =>
    cart?.data?.products?.some((item) => item.product.id === productId);

  // Filter products by search term
  const filteredProducts = data?.data.data.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Search Input */}
      <div className="flex justify-center my-6 px-6 w-[100%]">
        <input
          type="text"
          placeholder={t("Search products...")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-3/4 lg:w-2/3 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white text-lg"
        />
      </div>

      {isLoading ? (
        <div className="flex h-4/5 justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-wrap gap-y-4 justify-center px-0">
          {filteredProducts.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 mt-20 text-center w-full">
              {t("No products found")}
            </p>
          ) : (
            filteredProducts.map((product) => {
              const isFav = isInWishlist(product.id);
              const inCart = isInCart(product.id);

              return (
                <div
                  key={product.id}
                  className="m-auto p-4 lg:p-2 w-full md:w-1/2 lg:w-1/5"
                >
                  <div className="relative bg-slate-100 dark:bg-slate-800 dark:text-gray-300 group overflow-hidden rounded-md border border-transparent hover:border-main hover:shadow-lg transition-all duration-300">
                    {/* Image with hover shadow */}
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
                      <div className="absolute inset-0 group-hover:shadow-[inset_0_0_30px_rgba(255,255,255,0.2)] transition-all"></div>
                    </div>

                    {/* Product info */}
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

                    {/* Hover icons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {/* Add to Cart */}
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className={`p-2 rounded-full shadow-md hover:scale-110 transition-transform duration-300 ${
                          inCart
                            ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-[0_0_10px_rgba(34,197,94,0.7)]"
                            : "bg-gray-200 text-gray-700 dark:bg-slate-700 hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 hover:text-white"
                        }`}
                        title={t("AddtoCart")}
                      >
                        <i className="fa-solid fa-cart-plus fa-lg"></i>
                      </button>

                      {/* Wishlist */}
                      <button
                        onClick={() => handleAddToWishlist(product.id)}
                        className={`p-2 rounded-full shadow-md hover:scale-110 transition-transform duration-300 ${
                          isFav
                            ? "bg-gradient-to-r from-red-400 to-red-600 text-white shadow-[0_0_10px_rgba(239,68,68,0.7)]"
                            : "bg-gray-200 text-gray-700 dark:bg-slate-700 hover:bg-gradient-to-r hover:from-red-400 hover:to-red-600 hover:text-white"
                        }`}
                        title={t("Wishlist")}
                      >
                        <i
                          className={`fa-heart ${
                            isFav ? "fa-solid" : "fa-regular"
                          } fa-lg`}
                        ></i>
                      </button>

                      {/* View Image */}
                      <button
                        onClick={() => setModalImage(product.imageCover)}
                        className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-2 rounded-full shadow-md hover:scale-110 transition-transform duration-300"
                        title={t("ViewImage")}
                      >
                        <i className="fa-solid fa-eye fa-lg"></i>
                      </button>
                    </div>

                    {/* View Details */}
                    <div className="px-3 mt-3 pb-3 relative overflow-hidden">
                      <button
                        onClick={() =>
                          navigate(
                            `/productDetils/${product.id}/${product.category.name}`
                          )
                        }
                        className="w-full text-center bg-green-600 text-white py-2 rounded 
                                   transform translate-y-8 opacity-0 
                                   group-hover:translate-y-0 group-hover:opacity-100 
                                   transition-all duration-300 ease-in-out"
                      >
                        {t("viewdetails")}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Modal with animation */}
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

      <Footer />
    </>
  );
}
