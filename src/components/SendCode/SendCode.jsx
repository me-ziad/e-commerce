import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import imgs from "../../assets/signup-g-Dtp6-wtD.svg";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export default function SendCode() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const navigate = useNavigate();

  async function sendCode(values) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      toast.success("Code verified successfully!");
      navigate("/rePass");
    } catch (err) {
      toast.error("Invalid code, please try again.");
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: sendCode,
  });

  return (
    <>
      <Helmet>
        <title>{t("VerifyResetCode")}</title>
      </Helmet>

      <div className="min-h-screen bg-[url('/background-pattern.png')] bg-cover bg-center flex items-center justify-center px-4">
        <div className="bg-white bg-opacity-55 rounded-xl shadow-xl w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          {/* Left Side Image */}
          <div className="hidden lg:flex items-center justify-center bg-white bg-opacity-20">
            <img src={imgs} alt="Verification Illustration" className="w-3/4" />
          </div>

          {/* Right Side Form */}
          <div className="p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
              {t("Verifycode")}
            </h2>
            <p className="text-gray-500 mb-6 text-center">
              {t("Enterthe6digitcodesenttoyouremail")}
            </p>

            <form onSubmit={formik.handleSubmit} className="space-y-5">
              {/* Reset Code */}
              <div>
                <label
                  htmlFor="resetCode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("Resetcode")}
                </label>
                <input
                  type="text"
                  name="resetCode"
                  id="resetCode"
                  onChange={formik.handleChange}
                  value={formik.values.resetCode}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
                  placeholder={t("Enterresetcode")}
                />
                {formik.errors.resetCode && formik.touched.resetCode && (
                  <p className="text-sm text-red-500 mt-1">
                    {formik.errors.resetCode}
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium transition"
              >
                {loading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  t("Verify")
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
