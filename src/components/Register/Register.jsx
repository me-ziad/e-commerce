import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";
import imgs from "../../assets/signup-g-Dtp6-wtD.svg";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export default function Register() {
  const [loding, setLoding] = useState(false);
  const [errApi, setErrApi] = useState(false);
  const { t } = useTranslation();
  const { setUserToken } = useContext(UserContext);
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required(t("nameisrequired"))
      .min(3, t("min3characters"))
      .max(15, t("max15characters")),
    email: yup
      .string()
      .required(t("emailisrequired"))
      .email(t("invalidemail"))
      .min(3, t("min3characters"))
      .max(60, t("max15characters")),
    password: yup
      .string()
      .required(t("passwordisrequired"))
      .min(3, t("min3characters"))
      .max(15, t("max15characters"))
      .matches(/^[A-Z]\w{4,15}$/, t("entertruepasswordlike")),
    rePassword: yup
      .string()
      .required(t("rePasswordisrequired"))
      .min(3, t("min3characters"))
      .max(15, t("max15characters"))
      .oneOf([yup.ref("password")], t("nomatchwithpassword")),
    phone: yup
      .string()
      .required(t("Phoneisrequired"))
      .min(3, t("min3characters"))
      .max(15, t("max15characters"))
      .matches(/^01[0125][0-9]{8}$/, t("WeNeedEgyptianNumber")),
  });

  async function register(values) {
    try {
      setLoding(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      toast.success(data.message);
      navigate("/");
    } catch (err) {
      setErrApi(err.response?.data?.message || "Registration failed");
    } finally {
      setLoding(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: register,
  });

  return (
    <>
      <Helmet>
        <title>{t("Register")}</title>
      </Helmet>

      <div className="min-h-screen bg-[url('/background-pattern.png')] bg-cover bg-center flex items-center justify-center px-4">
        <div className="bg-white bg-opacity-55 rounded-xl shadow-xl w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          {/* Left Side Image */}
          <div className="hidden lg:flex items-center justify-center bg-white bg-opacity-20">
            <img src={imgs} alt="Register Illustration" className="w-3/4" />
          </div>

          {/* Right Side Form */}
          <div className="p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
              {t("Register")}
            </h2>
            <p className="text-gray-500 mb-6 text-center">
              {t("RegisterNowAndStartShopping")}
            </p>

            {errApi && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm mb-4">
                {errApi}
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("EnterYourname")}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
                />
                {formik.errors.name && formik.touched.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("EnterYourEmail")}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("EnterYourPassword")}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              {/* RePassword */}
              <div>
                <label
                  htmlFor="rePassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("EnterYourrePassword")}
                </label>
                <input
                  type="password"
                  name="rePassword"
                  id="rePassword"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
                />
                {formik.errors.rePassword && formik.touched.rePassword && (
                  <p className="text-sm text-red-500 mt-1">
                    {formik.errors.rePassword}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("EnterYourPhone")}
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
                />
                {formik.errors.phone && formik.touched.phone && (
                  <p className="text-sm text-red-500 mt-1">
                    {formik.errors.phone}
                  </p>
                )}
              </div>
              <div className="text-center text-sm mt-4">
                <p>
                  {t("Youhaveanaccount")}{" "}
                  <Link
                    to="/login"
                    className="text-green-600 font-medium hover:underline"
                  >
                    {t("signin")}
                  </Link>
                </p>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loding}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium transition"
              >
                {loding ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  t("SignUp")
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
