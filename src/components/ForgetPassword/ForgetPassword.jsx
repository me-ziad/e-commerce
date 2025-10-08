import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import imgs from "../../assets/signup-g-Dtp6-wtD.svg";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email")
      .min(3, "Min 3 characters")
      .max(60, "Max 60 characters"),
  });

  const navigate = useNavigate();

  async function forgetPassword(values) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      toast.success(data.message);
      navigate("/codePass");
    } catch (err) {
      toast.error("Failed to send reset code");
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: forgetPassword,
  });

  return (
    <>
      <Helmet>
        <title>{t('ForgetPassword')}</title>
      </Helmet>

      <div className="min-h-screen bg-[url('/background-pattern.png')] bg-cover bg-center flex items-center justify-center px-4">
        <div className="bg-white bg-opacity-55 rounded-xl shadow-xl w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

          {/* Left Side Image */}
          <div className="hidden lg:flex items-center justify-center bg-white bg-opacity-20">
            <img src={imgs} alt="Forgot Password Illustration" className="w-3/4" />
          </div>

          {/* Right Side Form */}
          <div className="p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">{t('ForgetPassword')}</h2>
            <p className="text-gray-500 mb-6 text-center">{t('Enteryouremailandwewillsendyouaresetcode')}</p>

            <form onSubmit={formik.handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('EnterYourEmail')}</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
                  placeholder={t('EnterYourEmail')}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium transition"
              >
                {loading ? <i className="fas fa-spinner fa-spin"></i> : t("Sendcode")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
