import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useTranslation } from "react-i18next";

export default function Footer() {
  let { UserToken } = useContext(UserContext);
  const { t } = useTranslation();

  return (
    <>
      {UserToken && (
        <footer className=" relative bottom-0 right-0 left-0">
          <div className="  mt-20 dark:bg-gray-900 dark:text-gray-400  bg-gray-100 py-7 px-10">
            <h1 className="text-2xl">{t('GettheFreshCarapp')}</h1>
            <p className="text-gray-500 pt-2 ">
             {t('WeWillSendYouain')}{" "}
            </p>

            <div className=" sm:w-full mb-16 flex flex-wrap gap-y-2  gap-x-3 my-2 items-center w-full">
              <input
                type="text"
                id="input"
                aria-label="input"
                className=" bg-white dark:bg-gray-500 focus:outline-none focus:border-gray-300  focus:border-2 border-gray-300 w-5/6 text-gray-900 dark:text-white text-sm rounded-lg blok  p-2.5  dark:placeholder-gray-400 "
                placeholder="Your email address..."
                required
              />
              <button
                type="button"
                className="text-white  hover:text-white hover:bg-green-500 bg-main focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-main dark:hover:bg-green-500 dark:focus:bg-green-600"
              >
                {t('ShareAppLink')}
              </button>
            </div>
            <div className=" border-t-2 py-5 border-b-2 dark:border-gray-600 flex flex-wrap gap-y-6 justify-between items-center ">
              <div className=" flex items-center flex-wrap gap-x-4">
                <h4 className=" font-medium">{t('')}</h4>
                <div className="">
                  <div className="">
                    <i className="fa-brands text-3xl  text-blue-500 fa-cc-amazon-pay me-3"></i>
                    <i className="fa-brands text-3xl text-orange-500 fa-cc-mastercard me-3"></i>
                    <i className="fa-brands text-3xl  text-blue-900 fa-cc-paypal me-3"></i>
                    <i className="fa-brands text-3xl  text-blue-400 fa-cc-visa me-3"></i>
                  </div>
                </div>
              </div>
              <div className=" flex items-center flex-wrap gap-y-4 lg:pe-10 gap-x-4">
                <h4 className=" font-medium">{t('GetdeliverieswithFreshCart')}</h4>
                <div className="">
                  <div>
                    <i className="fa-brands text-orange-600 text-4xl  fa-google-pay me-3"></i>
                    <i className="fa-brands fa-app-store text-blue-600  text-4xl  me-3"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
