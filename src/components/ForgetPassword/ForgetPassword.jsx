import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import imgs from "../../assets/OBJECTS.png";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  let validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("email is required")
      .email("invalid email")
      .min(3, "min 3 characters")
      .max(60, "max 15 characters"),
  });

  let navigate = useNavigate();

  async function forgetPassword(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      // console.log(data);
      toast.success(data.message);
      navigate("/codePass");
    } catch (err) {
      // console.log(err);
      setLoading(false);
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
    <div className="flex justify-between items-center lg:min-h-[600px] lg:px-36">
            <img src={imgs} alt="header" className="w-3/12 hidden lg:flex" />

      <form
        onSubmit={formik.handleSubmit}
        className="  w-full lg:w-2/6 lg:p-7 p-4 shadow-md border rounded-md "
      >
        <h2 className=" font-medium text-2xl mb-8 text-main text-center">
          Forget Password
        </h2>

        <div className="relative z-0 w-full mb-8 group">
          <input
            type="text"
            name="email" 
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Email
          </label>
          {formik.errors.email && formik.touched.email && (
            <div>
              <div>
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oh, snapp!</span>{" "}
                  {formik.errors.email}
                </p>
              </div>
            </div>
          )}
        </div>

        {!loading ? (
          <button
            type="submit"
            className="flex justify-center items-center m-auto text-white bg-main hover:bg-green-900 focus:ring-4 focus:outline-none focus:bg-green-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-green-600 dark:focus:main"
          >
            send
          </button>
        ) : (
          <button
            type="button"
            className="flex justify-center items-center m-auto text-white bg-main hover:bg-green-900  focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-green-900 dark:focus:main"
          >
            <i className="fa-solid fa-spinner fa-spin"></i>
          </button>
        )}
      </form>
    </div>
    </>
  );
}
