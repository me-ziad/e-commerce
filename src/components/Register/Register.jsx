import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";
import imgs from "../../assets/OBJECTS.png";

export default function Register() {
  const [loding, setLoding] = useState(false);
  const [errApi, setErrApi] = useState(false);

  let { setUserToken } = useContext(UserContext);

  let validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("name is required")
      .min(3, "min 3 characters")
      .max(15, "max 15 characters"),
    email: yup
      .string()
      .required("email is required")
      .email("invalid email")
      .min(3, "min 3 characters")
      .max(60, "max 15 characters"),
    password: yup
      .string()
      .required("password is required")
      .min(3, "min 3 characters")
      .max(15, "max 15 characters")
      .matches(/^[A-Z]\w{4,15}$/, "enter true password like (Ziad)"),
    rePassword: yup
      .string()
      .required("rePassword is required")
      .min(3, "min 3 characters")
      .max(15, "max 15 characters")
      .oneOf([yup.ref("password")], "no match with password"),
    phone: yup
      .string()
      .required("Phone is required")
      .min(3, "min 3 characters")
      .max(614, "max 15 characters")
      .matches(/^01[0125][0-9]{8}$/, "We Need Egyptian Number"),
  });

  let navigate = useNavigate();

  async function register(values) {
    try {
      setLoding(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      // console.log(data);
      setLoding(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      toast.success(data.message);
      navigate("/");
    } catch (err) {
      // console.log(err.response.data.message);
      setErrApi(err.response.data.message);

      setLoding(false);
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

    <div className=" flex justify-between items-center lg:min-h-[600px] lg:px-36">
            <img src={imgs} alt="header" className="w-3/12 hidden lg:flex" />
      <form
        onSubmit={formik.handleSubmit}
        className=" w-full lg:w-2/6 lg:p-7 p-4 shadow-md border rounded-md"
      >
        <h2 className=" font-medium text-2xl mb-8 text-main uppercase text-center">
          Register
        </h2>

        {errApi && (
          <div
            className="px-4 py-1 mb-4 text-sm text-red-900 rounded-lg bg-red-50 dark:bg-red-200 transform -translate-y-4 dark:text-red-900"
            role="alert"
          >
            {errApi}
          </div>
        )}

        <div className="relative z-0 w-full mb-8 group">
          <input
            type="text"
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-400 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm dark:text-gray-400 text-gray-900  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Name
          </label>
          {formik.errors.name && formik.touched.name && (
            <div>
              <div>
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium"></span>{" "}
                  {formik.errors.name}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="relative z-0 w-full mb-8 group">
          <input
            type="text"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-400 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Email
          </label>

          {formik.errors.email && formik.touched.email && (
            <div>
              <div>
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium"></span>{" "}
                  {formik.errors.email}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="relative z-0 w-full mb-8 group">
          <input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-400 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Password
          </label>
          {formik.errors.password && formik.touched.password && (
            <div>
              <div>
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium"></span>{" "}
                  {formik.errors.password}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="relative z-0 w-full mb-8 group">
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-400 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your rePassword
          </label>
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div>
              <div>
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium"></span>{" "}
                  {formik.errors.rePassword}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-400 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_phone"
            className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Phone
          </label>
          {formik.errors.phone && formik.touched.phone && (
            <div>
              <div>
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium"></span>{" "}
                  {formik.errors.phone}
                </p>
              </div>
            </div>
          )}
        </div>

        {!loding ? (
          <button
            type="submit"
            className="flex justify-center items-center m-auto text-white bg-main hover:bg-green-900 focus:outline-none focus:bg-green-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-green-500 dark:focus:main"
          >
            Submit
          </button>
        ) : (
          <button
            type="button"
            className="text-white bg-main flex justify-center items-center m-auto hover:bg-green-900 focus:outline-none focus:bg-green-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-green-600 dark:focus:main"
          >
            <i className="fa-solid fa-spinner fa-spin"></i>
          </button>
        )}
      </form>
    </div>
    </>
  );
}
