import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import React from 'react'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Category from './components/Categories/Category'
import Brands from './components/Brands/Brands'
import Product from './components/Products/Product'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import NotFound from './components/NotFound/NotFound'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import CartContextProvider from './components/CartContext/CartContext'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import {
QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { store } from './redux/store'
import PayCash from './components/PayCash/PayCash'
import PayVisa from './components/PayVisa/PayVisa'
import AllOrders from './components/AllOrders/AllOrders'
import PaySuccess from './components/PaySuccsess/PaySuccess'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import SendCode from './components/SendCode/SendCode'
import NewPass from './components/NewPass/NewPass'
import CategoryDetails from './components/CategoryDetails/CategoryDetails'
import WhishListContextProvider from './WhishListContext/WhishListContext'
import { Offline } from "react-detect-offline";
import WhishList from './components/WhishList/WhishList'

function App() {

  
  let query = new QueryClient()
  const routers = createBrowserRouter([{
    path :'' , element : <Layout/>, children:[
      {index  : true , element: <ProtectedRoute><Home/></ProtectedRoute>},
      {path  :'cart' , element: <ProtectedRoute><Cart/></ProtectedRoute>},
      {path  :'whishList' , element: <ProtectedRoute><WhishList/></ProtectedRoute>},
      {path  :'category' , element: <ProtectedRoute><Category/></ProtectedRoute>},
      {path  :'brands' , element:  <ProtectedRoute><Brands/></ProtectedRoute>},
      {path  :'products' , element:  <ProtectedRoute><Product/></ProtectedRoute>},
      {path  :'register' , element:  <Register/>},
      {path  :'login' , element:  <Login/>},
      {path  :'productDetils/:id/:category' , element: <ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path  :'CategoryDetails/:id' , element: <ProtectedRoute><CategoryDetails/></ProtectedRoute>},
      {path  :'payCash' , element: <ProtectedRoute> <PayCash/></ProtectedRoute>},
      {path  :'payVisa' , element: <ProtectedRoute> <PayVisa/></ProtectedRoute> },
      {path  :'PaySuccess' , element: <ProtectedRoute><PaySuccess/></ProtectedRoute>},
      {path  :'codePass' , element:  <SendCode/>},
      {path  :'allorders' , element:  <AllOrders/>},
      {path  :'forgetPassword' , element:  <ForgetPassword/>},
      {path  :'rePass' , element:  <NewPass/>},
      {path  :'*' , element:  <NotFound/>},
    ]
  }])


  return <>


      <Provider store={store}>
      

    <QueryClientProvider client={query}>
      <WhishListContextProvider>
      <CartContextProvider>
        <UserContextProvider>
        <RouterProvider router={routers}/>         
        <Toaster 
         position="top-right"
         reverseOrder={false}
         />
    <Offline><div className=" z-50  py-2 px-4 fixed right-0 bottom-0 ">
             <div className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-900  dark:text-blue-400 dark:blue-red-800" role="alert">
             <i className="fa-solid fa-circle-exclamation me-2"></i>
  <span className="sr-only">Info</span>
  <div>
    <span className="font-medium me-1">Your Offline ?</span>Please Check your Enternet
  </div>
</div></div></Offline>

        </UserContextProvider>
      </CartContextProvider>
         </WhishListContextProvider>
    </QueryClientProvider>
      </Provider>
 


    </>
  
}

export default App
