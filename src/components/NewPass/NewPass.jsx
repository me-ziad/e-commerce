import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import imgs from "../../assets/1.png";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export default function NewPass() {
  const [loading, setLoading] = useState(false);
  const [errApi, setErrApi] = useState("");
  const { setUserToken } = useContext(UserContext);
  const { t } = useTranslation();

  const navigate = useNavigate();

  // Schema
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email")
      .min(3, "Minimum 3 characters")
      .max(60, "Maximum 60 characters"),
    newPassword: yup
      .string()
      .required("New password is required")
      .min(6, "Minimum 6 characters")
      .max(20, "Maximum 20 characters")
      .matches(
        /^[A-Z]\w{4,15}$/,
        "Password must start with a capital letter and be 5–15 chars."
      ),
  });

  // Handle Submit
  async function handleSubmit(values) {
    try {
      setLoading(true);
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );

      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);

      toast.success("Password updated successfully");
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.message || "Something went wrong";
      setErrApi(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Helmet>
        <title>{t("SetNewPassword")}</title>
      </Helmet>

      <div className="min-h-screen bg-[url('/background-pattern.png')] bg-cover bg-center flex items-center justify-center px-4">
        <div className="bg-white bg-opacity-55 rounded-xl shadow-xl w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          {/* Image section */}
          <div className="hidden lg:flex items-center justify-center bg-white bg-opacity-20">
            <img
              src={imgs}
              alt="Reset Password Illustration"
              className="w-3/4"
            />
          </div>

          {/* Form section */}
          <div className="p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
              {t("SetNewPassword")}
            </h2>
            <p className="text-gray-500 mb-6 text-center">
              {t("Setyournewpasswordtoaccessyouraccount")}
            </p>

            {/* Error from API */}
            {errApi && (
              <div className="bg-red-100 text-red-700 p-2 text-sm rounded mb-4 text-center">
                {errApi}
              </div>
            )}

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
                  type="text"
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

              {/* New Password */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("NewPassword")}
                </label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  onChange={formik.handleChange}
                  value={formik.values.newPassword}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
                  placeholder={t("NewPassword")}
                />
                {formik.errors.newPassword && formik.touched.newPassword && (
                  <p className="text-sm text-red-500 mt-1">
                    {formik.errors.newPassword}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium transition"
              >
                {loading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  t("ResetPassword")
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
