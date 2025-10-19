import React, { useContext, useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Loader from "../Loader/Loader";
import { useTranslation } from "react-i18next";

export default function Cart() {
  const { cart, clearCart, deleteCart, updateCart } = useContext(CartContext);
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <Helmet>
        <title>{t("MyCart")}</title>
        <link rel="canonical" href="http://mysite.com/cart" />
      </Helmet>

      <h1 className="text-gray-700 dark:text-gray-300 text-xl lg:text-2xl font-semibold mb-6 px-6">
        {t("MyCart")}
      </h1>

      {!cart ? (
        <div className="flex justify-center items-center mt-40">
          <Loader />
        </div>
      ) : cart.data?.products.length === 0 ? (
        <div className="text-center flex flex-col items-center text-gray-500 dark:text-gray-400 mt-40">
          <i className="fa-solid fa-cart-shopping text-main mb-3 text-[70px] lg:text-[100px]"></i>
          <h2 className="text-lg">{t("Yourcartisempty")}</h2>
        </div>
      ) : (
        <div className="relative overflow-x-auto sm:rounded-lg p-3">
          <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
            <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3 text-center w-32">
                  {t("Image")}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("Product")}
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  {t("Qty")}
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  {t("Price")}
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  {t("Action")}
                </th>
              </tr>
            </thead>

            <tbody>
              {cart.data?.products.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  {/* Product Image */}
                  <td className="px-4 py-3 text-center">
                    <div className="relative w-24 h-24 mx-auto group cursor-pointer rounded-lg overflow-hidden shadow-sm">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                      />
                      <div
                        onClick={() => setSelectedImage(item.product.imageCover)}
                        className="absolute inset-0 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 bg-black bg-opacity-30 text-white font-semibold transition-opacity cursor-pointer"
                      >
                        <i className="fa-solid fa-eye text-lg me-2"></i> {t("ViewImage")}
                      </div>
                    </div>
                  </td>

                  {/* Product Name */}
                  <td className="px-6 py-2 font-semibold text-gray-900 dark:text-gray-200">
                    {item.product.category.name}
                    <span className="text-yellow-400 ms-3 text-sm">
                      {item.product.ratingsAverage} <i className="fa-solid fa-star ms-1"></i>
                    </span>
                  </td>

                  {/* Quantity Controls */}
                  <td className="px-6 py-4 text-center align-middle">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() =>
                          item.count <= 1
                            ? deleteCart(item.product.id)
                            : updateCart(item.product.id, item.count - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 transition"
                      >
                        <i className="fa-solid fa-minus text-sm"></i>
                      </button>

                      <span className="text-lg font-semibold text-gray-800 dark:text-gray-100 w-5 text-center">
                        {item.count}
                      </span>

                      <button
                        onClick={() => updateCart(item.product.id, item.count + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 transition"
                      >
                        <i className="fa-solid fa-plus text-sm"></i>
                      </button>
                    </div>
                  </td>

                  {/* Product Price */}
                  <td className="px-6 py-2 font-semibold text-[#FF9119] text-center">
                    {item.price * item.count} {t("EGY")}
                  </td>

                  {/* Delete Product */}
                  <td className="px-6 py-2 text-center">
                    <button
                      onClick={() => deleteCart(item.product.id)}
                      className="text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-all shadow hover:shadow-md px-2 py-1 rounded-md font-semibold"
                    >
                      <i className="fa-solid fa-trash me-2"></i> {t("Remove")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Image Modal */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected Product"
                  className="max-w-[90vw] max-h-[80vh] rounded-lg shadow-2xl"
                />
                <button
                  className="absolute top-3 right-5 text-white text-2xl w-10 h-10 bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-80 hover:scale-110 transition-transform duration-300 shadow-lg"
                  onClick={() => setSelectedImage(null)}
                  title="Close"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          )}

          {/* Total Price + Payment Options */}
          <div className="flex flex-col lg:flex-row justify-between items-center mt-6 border-t pt-4 dark:border-gray-700">
            <h1 className="font-bold text-lg lg:text-xl text-gray-800 dark:text-gray-200">
              {t("totalprice")}{" "}
              <span className="text-[#FF9119]">
                {cart.data?.totalCartPrice} {t("EGY")}
              </span>
            </h1>

            <div className="flex gap-3 mt-4 lg:mt-0">
              <NavLink to="/payVisa">
                <button className="flex items-center gap-2 text-gray-800 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-4 py-2 transition dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
                  <i className="fa-brands fa-cc-visa text-blue-700 text-lg"></i>
                  {t("PaywithVisa")}
                </button>
              </NavLink>

              <NavLink to="/payCash">
                <button className="flex items-center gap-2 bg-[#FF9119] hover:bg-[#e37e13] text-white font-medium rounded-lg text-sm px-4 py-2 transition">
                  <i className="fa-solid fa-money-bill text-lg"></i>
                  {t("PaywithCash")}
                </button>
              </NavLink>
            </div>
          </div>

          {/* Clear Entire Cart */}
          <div className="flex justify-center mt-6">
            <button
              onClick={clearCart}
              className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg px-6 py-2 transition shadow hover:shadow-md"
            >
              {t("RemoveCart")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
