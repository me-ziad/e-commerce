import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import React, { lazy } from "react";
import Layout from "./components/Layout/Layout";
const Home = lazy(() => import("./components/Home/Home"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const Category = lazy(() => import("./components/Categories/Category"));
const Brands = lazy(() => import("./components/Brands/Brands"));
const Product = lazy(() => import("./components/Products/Product"));
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider from "./components/CartContext/CartContext";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./redux/store";
const PayCash = lazy(() => import("./components/PayCash/PayCash"));
const PayVisa = lazy(() => import("./components/PayVisa/PayVisa"));
const AllOrders = lazy(() => import("./components/AllOrders/AllOrders"));
const PaySuccess = lazy(() => import("./components/PaySuccsess/PaySuccess"));
const ForgetPassword = lazy(() =>
  import("./components/ForgetPassword/ForgetPassword")
);
import SendCode from "./components/SendCode/SendCode";
import NewPass from "./components/NewPass/NewPass";
const CategoryDetails = lazy(() =>
  import("./components/CategoryDetails/CategoryDetails")
);
import WhishListContextProvider from "./WhishListContext/WhishListContext";
import { Offline } from "react-detect-offline";
import { HelmetProvider } from "react-helmet-async";
const WhishList = lazy(() => import("./components/WhishList/WhishList"));

function App() {
  let query = new QueryClient();
  const routers = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "whishList",
          element: (
            <ProtectedRoute>
              <WhishList />
            </ProtectedRoute>
          ),
        },
        {
          path: "category",
          element: (
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          ),
        },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        {
          path: "productDetils/:id/:category",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "CategoryDetails/:id",
          element: (
            <ProtectedRoute>
              <CategoryDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "payCash",
          element: (
            <ProtectedRoute>
              {" "}
              <PayCash />
            </ProtectedRoute>
          ),
        },
        {
          path: "payVisa",
          element: (
            <ProtectedRoute>
              {" "}
              <PayVisa />
            </ProtectedRoute>
          ),
        },
        {
          path: "PaySuccess",
          element: (
            <ProtectedRoute>
              <PaySuccess />
            </ProtectedRoute>
          ),
        },
        { path: "codePass", element: <SendCode /> },
        { path: "allorders", element: <AllOrders /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "rePass", element: <NewPass /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
                 <HelmetProvider>
      <Provider store={store}>
        <QueryClientProvider client={query}>
          <UserContextProvider>
            <WhishListContextProvider>
              <CartContextProvider>
                  
                <RouterProvider router={routers} />
                <Toaster position="top-right" reverseOrder={false} />
                <Offline>
                  <div className=" z-50  py-2 px-4 fixed right-0 bottom-0 ">
                    <div
                      className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-900  dark:text-blue-400 dark:blue-red-800"
                      role="alert"
                    >
                      <i className="fa-solid fa-circle-exclamation me-2"></i>
                      <span className="sr-only">Info</span>
                      <div>
                        <span className="font-medium me-1">Your Offline ?</span>
                        Please Check your Enternet
                      </div>
                    </div>
                  </div>
                </Offline>
              </CartContextProvider>
            </WhishListContextProvider>
          </UserContextProvider>
        </QueryClientProvider>
      </Provider>
                      </HelmetProvider>
    </>
  );
}

export default App;
