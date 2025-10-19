import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Loader from "../Loader/Loader";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export default function Category() {
  const [loader, setLoader] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const { t } = useTranslation();

  const divValidation = {
    hidden: { y: -300, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.2, delay: 0.0 },
    },
  };

  function getCategory() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery({
    queryKey: ["getCategory"],
    queryFn: getCategory,
  });

  async function PrandsDetails(id) {
    setShowDetails(true);
    try {
      setLoader(true);
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}`
      );
      setCategoryDetails(res?.data?.data);
      setLoader(false);
    } catch {
      setLoader(false);
    }
  }

  return (
    <>
         <Helmet>
        <title>{t("AllCategory")}</title>
        <link rel="canonical" href="http://mysite.com/cart" />
      </Helmet>
      <h1 className="text-gray-600 dark:text-gray-300 text-2xl font-semibold mb-6 px-10 tracking-wide">
        {t("AllCategory")}
      </h1>

      {/* ====== Modal Details ====== */}
      {showDetails && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start pt-10 overflow-auto">
          <motion.div
            variants={divValidation}
            initial="hidden"
            animate="visible"
            className="relative w-[90%] md:w-[70%] lg:w-[50%] bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="flex justify-end p-3">
              <i
                onClick={() => setShowDetails(false)}
                className="fa-solid fa-xmark text-2xl cursor-pointer text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors"
              ></i>
            </div>

            {loader ? (
              <div className="flex justify-center py-20">
                <Loader />
              </div>
            ) : (
              <div className="px-8 pb-8 flex flex-col md:flex-row items-center gap-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-main text-2xl font-semibold mb-2">
                    {categoryDetails.name}
                  </h3>
                  <h4 className="text-gray-600 dark:text-gray-400 text-sm">
                    {categoryDetails.slug}
                  </h4>
                </div>
                <div className="flex-1 flex justify-center">
                  <img
                    src={categoryDetails.image}
                    className="w-3/4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                    alt={categoryDetails.name}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end px-6 pb-6">
              <button
                onClick={() => setShowDetails(false)}
                className="bg-main hover:bg-green-500 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                {t("close")}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ====== Categories List ====== */}
      {isLoading ? (
        <div className="flex mt-40 h-3/4 justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 p-4">
          {data?.data?.data.map((cat) => (
            <motion.div
              key={cat._id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%] cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg overflow-hidden border border-transparent hover:border-main transition-all"
              onClick={() => PrandsDetails(cat._id)}
            >
              <img
                className="w-full h-[230px] object-cover rounded-t-lg"
                src={cat.image}
                alt={cat.name}
              />
              <div className="p-4 text-center">
                <h3 className="text-xl text-main font-semibold mb-3">
                  {cat.name}
                </h3>
                <button
                  onClick={() => PrandsDetails(cat._id)}
                  className="w-full py-2 bg-main text-white rounded-md opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-green-500"
                >
                  {t("viewdetails")}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
