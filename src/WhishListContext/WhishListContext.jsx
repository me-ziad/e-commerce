import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const WhisListContext = createContext();

export default function WhishListContextProvider({ children }) {
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  const [showWhishList, setShowWhishList] = useState([]);

  async function postWhishList(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers }
      );
      toast.success(data.message || "Added to wishlist successfully");
      displayWhishList();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add to wishlist");
      // console.error("Add to wishlist error:", error);
    }
  }

  async function displayWhishList() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers }
      );
      setShowWhishList(data);
    } catch (error) {
      toast.error("Failed to fetch wishlist");
      // console.error("Fetch wishlist error:", error);
    }
  }

  async function deleteWhishList(id) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        { headers }
      );
      toast.success(data.message || "Item removed from wishlist");
      displayWhishList();
    } catch (error) {
      toast.error("Failed to delete item from wishlist");
      // console.error("Delete wishlist error:", error);
    }
  }

  useEffect(() => {
    displayWhishList();
  }, []);

  return (
    <WhisListContext.Provider
      value={{ postWhishList, showWhishList, deleteWhishList }}
    >
      {children}
    </WhisListContext.Provider>
  );
}
