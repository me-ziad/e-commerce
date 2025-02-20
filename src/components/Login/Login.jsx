import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'


export default function Login() {

const [laoding, setLoding] = useState(false)
const [errApi, setErrApi] = useState(false)
let {setUserToken} = useContext(UserContext)
  

  let validationSchema = yup.object().shape({

      email :yup.string().required('email is required').email('invalid email').min(3 ,'min 3 characters').max(60, 'max 15 characters'),
      password :yup.string().required('password is required').min(3,'min 3 characters').max(15 , 'max 15 characters').matches(/^[A-Z]\w{4,15}$/,'enter true password'),
     
    })

        let navigate = useNavigate()

  async function Login(values){
    try{
    setLoding(true)
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
    // console.log(data);
    localStorage.setItem('userToken', data.token)
    setUserToken(data.token)
    setLoding(false)
    toast.success(data.message)
    navigate('/')

  }catch(err){
      // console.log(err.response.data.message);
      setErrApi(err.response.data.message)
      
      setLoding(false)
    }finally{
      setLoding(false)
    }
  }
const formik = useFormik({
  initialValues :{
    email : '', 
    password : '',
   
  },validationSchema
  ,onSubmit : Login
})

  return <>
  

<form onSubmit={formik.handleSubmit} className=" md:w-4/6 mx-auto mb-40 mt-24">
  <h2 className=' font-medium text-2xl mb-8 text-main uppercase'>Login</h2>


    
  <div className="relative z-0 w-full mb-8 group">
    <input type="text" name="email" id="email" value={formik.values.email} onChange={formik.handleChange}   className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-non dark:border-gray-400 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" "  />
    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
  {formik.errors.email && formik.touched.email && <div>
  <div>
  <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp!</span> {formik.errors.email}</p>
</div>
</div> }
  </div>

  
 <Helmet>
                <title>Login</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>


  <div className="relative z-0 w-full mb-8 group">
    <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange}   className="block py-2.5 dark:text-gray-100 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-non dark:border-gray-400 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" "  />
    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-100 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
    {formik.errors.password && formik.touched.password && <div>
  <p className=" text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp!</span> {formik.errors.password}</p>
</div> }
  </div>
  
         {errApi &&  <div className="px-4 py-1 mb-4 text-sm text-red-900 rounded-lg bg-red-50 dark:bg-red-200 transform -translate-y-4 dark:text-red-900" role="alert">
      {errApi}
  </div>
       }
<div className=" mb-2 -translate-y-3 ">

        <Link to={'/forgetPassword'} className=' text-main text-sm'> forget your password ?</Link>
</div>

    {!laoding ?  <button type="submit" className="text-white bg-main hover:bg-green-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-green-600 dark:focus:main">Submit</button>
:   <button type="button" className="text-white bg-main hover:bg-green-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-green-600 dark:focus:main"><i className="fa-solid fa-spinner fa-spin"></i></button>
}

</form>





  </>
}
