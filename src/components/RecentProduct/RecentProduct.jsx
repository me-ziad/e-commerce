import React, { useContext } from 'react'
import axios from "axios"
import { Link } from "react-router-dom";
import { CartContext } from '../CartContext/CartContext';
import { useQuery } from '@tanstack/react-query';
import { WhisListContext } from '../../WhishListContext/WhishListContext';
import Loader from '../Loader/Loader';
import Footer from '../Footr/Footer';

export default function RecentProduct() {
  const { addCart } = useContext(CartContext);
  const { postWhishList } = useContext(WhisListContext);

  // Fetch products from the API
  const getProduct = () => axios.get('https://ecommerce.routemisr.com/api/v1/products');

  const { data, isLoading } = useQuery({
    queryKey: ['recentProduct'],
    queryFn: getProduct,
  });

  return (
    <>
      {isLoading ? (
        <div className="flex h-4/5 justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-y-4 justify-center">
            {data?.data.data?.map((product) => (
              <div key={product.id} className="m-auto p-4 lg:p-2 w-full md:w-1/2 lg:w-1/5">
                <div className="shadow-md bg-slate-100 dark:bg-slate-800 dark:text-gray-400 group overflow-hidden w-full hover:border-main hover:border-[1px] hover:shadow-lg transition-all hover:border-solid rounded-sm">
                  <Link to={`/productDetils/${product.id}/${product.category.name}`}>
                    <img className="w-full h-[300px] object-cover" src={product.imageCover} alt={product.title} />
                    <div className="px-3">
                      <h3 className="text-main mt-3">{product.category.name}</h3>
                      <h3 className="text-xl">{product.title.split(' ', 2).join(' ')}</h3>
                      <div className="flex justify-between items-center mt-4">
                        <span>{product.price} EGP</span>
                        <span className="text-yellow-400">
                          {product.ratingsAverage}
                          <i className="fa-solid fa-star ms-2"></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="flex justify-end">
                    <i
                      onClick={() => postWhishList(product.id)}
                      className="cursor-pointer text-2xl me-5 mt-3 fa-regular fa-heart text-red-600 ms-auto"
                    ></i>
                  </div>
                  <div className="px-3">
                    <button
                      onClick={() => addCart(product.id)}
                      className="w-full mb-2 text-center hover:bg-green-400 group-hover:translate-y-0 translate-y-full duration-500 group-hover:opacity-100 pt-2 pb-2 ps-4 pe-4 opacity-0 bg-main text-white mt-6 rounded"
                    >
                      + Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
