import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { CartContext } from '../CartContext/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export default function PayCash() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { cart, displayCart } = useContext(CartContext);
  const { t } = useTranslation();

  async function PayCashCat(shippingAddress) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,
        { shippingAddress },
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      );
      toast.success(data.status);
      navigate('/paySuccess');
      displayCart();
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong!');
    }
  }

  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.details.trim()) errors.details = 'Details are required';
      if (!values.phone.trim()) errors.phone = 'Phone is required';
      if (!values.city.trim()) errors.city = 'City is required';
      return errors;
    },
    onSubmit: (values) => {
      PayCashCat(values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="md:w-4/6 mx-auto mb-40 mt-24 p-6 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 bg-white transition-all duration-300"
    >
      <h2 className="font-semibold text-2xl mb-8 text-main uppercase text-center">
        {t('PayCash')}
      </h2>

      {/* DETAILS */}
      <div className="relative z-0 w-full mb-8 group">
        <input
          type="text"
          name="details"
          id="details"
          value={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 ${
            formik.touched.details && formik.errors.details
              ? 'border-red-500'
              : 'focus:border-main dark:focus:border-main border-gray-400'
          } peer`}
          placeholder=" "
        />
        <label
          htmlFor="details"
          className="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-main"
        >
          {t('Enteryourdetails')}
        </label>
        {formik.touched.details && formik.errors.details && (
          <p className="text-red-500 text-sm mt-2">
            {formik.errors.details}
          </p>
        )}
      </div>

      {/* PHONE */}
      <div className="relative z-0 w-full mb-8 group">
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 ${
            formik.touched.phone && formik.errors.phone
              ? 'border-red-500'
              : 'focus:border-main dark:focus:border-main border-gray-400'
          } peer`}
          placeholder=" "
        />
        <label
          htmlFor="phone"
          className="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-main"
        >
          {t('EnterYourPhone')}
        </label>
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-red-500 text-sm mt-2">
            {formik.errors.phone}
          </p>
        )}
      </div>

      {/* CITY */}
      <div className="relative z-0 w-full mb-8 group">
        <input
          type="text"
          name="city"
          id="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 ${
            formik.touched.city && formik.errors.city
              ? 'border-red-500'
              : 'focus:border-main dark:focus:border-main border-gray-400'
          } peer`}
          placeholder=" "
        />
        <label
          htmlFor="city"
          className="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-main"
        >
          {t('Enteryourcity')}
        </label>
        {formik.touched.city && formik.errors.city && (
          <p className="text-red-500 text-sm mt-2">{formik.errors.city}</p>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      {!loading ? (
        <button
          type="submit"
          className="w-full py-3 bg-main hover:bg-green-400 text-white font-medium rounded-lg shadow-md transition-all duration-300 dark:bg-main dark:hover:bg-green-600"
        >
          Submit
        </button>
      ) : (
        <button
          type="button"
          disabled
          className="w-full py-3 bg-main text-white font-medium rounded-lg shadow-md"
        >
          <i className="fa-solid fa-spinner fa-spin"></i>
        </button>
      )}
    </form>
  );
}
