import React, { useContext, useState } from "react";
import { WhisListContext } from "../../WhishListContext/WhishListContext";
import { CartContext } from "../CartContext/CartContext";
import { Helmet } from "react-helmet";
import Loader from "../Loader/Loader";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function WhishList() {
  const { showWhishList, deleteWhishList } = useContext(WhisListContext);
  const { addCart } = useContext(CartContext);
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      {showWhishList ? (
        <>
          <Helmet>
            <title>Wishlist</title>
          </Helmet>

          <div className="container px-4 py-6">
            <h1 className="text-gray-800 dark:text-gray-200 text-2xl font-semibold mb-6">
              {t("MyWhishList")}
            </h1>

            {showWhishList.data?.length === 0 ? (
              <div className="h-[60vh] flex flex-col justify-center items-center w-full text-center">
                <i className="fa-solid fa-heart text-main text-[80px] mb-4 animate-pulse"></i>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {t("Your wishlist is empty")}
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {showWhishList.data?.map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative group overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-lg hover:shadow-main/50 transition-all duration-500"
                  >
                    {/* Product Image with Hover Effect */}
                    <div
                      className="relative cursor-pointer overflow-hidden"
                      onClick={() => setSelectedImage(product.imageCover)}
                    >
                      <img
                        className="w-full h-56 object-cover rounded-t-2xl transform group-hover:scale-105 transition-transform duration-500"
                        src={product.imageCover}
                        alt={product.title}
                      />
                      {/* Overlay Shadow on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Delete Icon - More Visible */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteWhishList(product.id);
                        }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-red-600/80 text-white shadow-lg hover:bg-red-700 hover:scale-110 transition-transform duration-300 z-10"
                        title={t("Remove")}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="p-5">
                      <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 truncate">
                        {product.title.split(" ", 5).join(" ")}
                      </h5>

                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2.5 py-0.5 rounded-full font-semibold">
                          ★ {product.ratingsAverage}
                        </span>

                        <div className="text-gray-700 dark:text-gray-300">
                          {product.priceAfterDiscount ? (
                            <>
                              <del className="mr-2 opacity-70">
                                {product.price} {t("EGY")}
                              </del>
                              <span className="font-semibold text-main">
                                {product.priceAfterDiscount} {t("EGY")}
                              </span>
                            </>
                          ) : (
                            <span className="font-semibold text-main">
                              {product.price} {t("EGY")}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addCart(product.id)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-main hover:from-main hover:to-green-500 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <ShoppingCartIcon className="w-5 h-5" />
                        {t("AddtoCart")}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Modal for Image Preview */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 120 }}
                  className="relative"
                >
                  <img
                    src={selectedImage}
                    alt="Product"
                    className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
                  />
                  <button
                    className="absolute top-3 right-3 bg-white/80 text-gray-800 dark:bg-gray-800 dark:text-white rounded-full p-2 hover:bg-red-600 hover:text-white shadow-lg transition-all duration-300"
                    onClick={() => setSelectedImage(null)}
                    title="Close"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className="container h-4/5 flex justify-center items-center">
          <Loader />
        </div>
      )}
    </>
  );
}
