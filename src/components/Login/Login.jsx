import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import LoginIllustration from "../../assets/1.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errApi, setErrApi] = useState("");
  const { setUserToken } = useContext(UserContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup.string().required("Password is required").min(3, "Too short"),
  });

  async function handleLogin(values) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      toast.success(data.message);
      navigate("/");
    } catch (err) {
      setErrApi(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <Helmet>
        <title>{t("logine")}</title>
      </Helmet>

      <div className="min-h-[80vh] bg-cover bg-center flex items-center justify-center px-4">
        <div className="bg-white bg-opacity-55 rounded-xl shadow-xl w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          {/* Left Side Image */}
          <div className="hidden lg:flex items-center justify-center bg-white bg-opacity-20">
            <img
              src={LoginIllustration}
              alt="Login Illustration"
              className="w-3/4"
            />
          </div>

          {/* Right Side Form */}
          <div className="p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {t("SignintoFreshCart")}
            </h2>
            <p className="text-gray-500 mb-6">
              {t("WelcomebacktoFreshCartEnteryouremailtogetstarted")}
            </p>

            <form onSubmit={formik.handleSubmit} className="space-y-5">
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
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
                  placeholder={t("EnterYourEmail")}
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
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className="w-full border border-gray-300 px-4 py-2 pr-10 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
                    placeholder={t("EnterYourPassword")}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                  >
                    <i
                      className={`fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </span>
                </div>
                {formik.errors.password && formik.touched.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              {/* API Error */}
              {errApi && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm">
                  {errApi}
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium transition"
              >
                {loading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  t("signin")
                )}
              </button>

              {/* Links */}
              <div className="text-center text-sm mt-4">
                <p>
                  {t("Youdonthaveaaccount")}{" "}
                  <Link
                    to="/register"
                    className="text-green-600 font-medium hover:underline"
                  >
                    {t("SignUp")}
                  </Link>
                </p>
                <Link
                  to="/forgetPassword"
                  className="text-green-600 font-medium hover:underline mt-2 inline-block"
                >
                  {t("ForgetYourPassword")}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
