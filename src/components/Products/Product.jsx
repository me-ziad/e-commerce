import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../redux/ShowProucts/ShowProducts'
import { CartContext } from '../CartContext/CartContext';
import { WhisListContext } from '../../WhishListContext/WhishListContext';
import Loader from '../Loader/Loader';
import { useTranslation } from 'react-i18next';


export default function Product() {
      const { postWhishList } = useContext(WhisListContext);
      const { t, i18n } = useTranslation();
      
  let {addCart}= useContext(CartContext)
    let {product,isLoading} = useSelector((store)=> store.productReducer)
        let dispatch =useDispatch()
    useEffect(()=>{
        dispatch( getProduct())
   
    },[])
return<>


<h1 className= " text-gray-500 dark:text-gray-400  text-xl  px-10 font-semibold mb-4">{t('AllProducts')}</h1>

            {isLoading ?
            <div className=" flex mt-40 h-3/4 justify-center items-center">
                <Loader></Loader>
                        </div>: <>
                        <div className=" flex  flex-wrap gap-y-2 justify-center">
                            {product.map((product)=> <div key={product.id} className="m-auto p-3 lg:p-2 w-full md:w-1/2  lg:w-1/5">
                            <div className=" shadow-md group overflow-hidden group dark:bg-slate-800 dark:text-gray-400  w-full p-3 hover:border-main hover:border-[1px] hover:shadow-lg transition-all hover:border-solid rounded-sm">
                    <Link to={`/productDetils/${product.id}/${product.category.name}`}>
                                <img className="w-full  h-[300px] object-cover" src={product.imageCover} alt="" />
                                    <h3 className=' text-main'>{product.category.name}</h3>
                                    <h3 className=' text-xl'>{product.title.split(' ',2).join(' ')}</h3>
                                <div className=" flex justify-between items-center mt-4">
                                    <span>{product.price} {t('EGY')}</span>
                                    <span className=' text-yellow-400'>{product.ratingsAverage}<i className="fa-solid fa-star ms-2"></i></span>
                                </div>
                        </Link>
                             <div className="flex justify-end">
                    <i
                      onClick={() => postWhishList(product.id)}
                      className="cursor-pointer text-2xl me-5 mt-3 fa-regular fa-heart text-red-600 ms-auto"
                    ></i>
                  </div>
                                <button onClick={()=>{addCart(product.id)}} className='w-full text-center hover:bg-green-400 group-hover:translate-y-0 translate-y-full duration-500 group-hover:opacity-100 pt-2 pb-2 ps-4 pe-4 opacity-0 bg-main text-white mt-6 rounded'>{t("AddtoCart")}</button>
                            </div>
                                </div>
                            )}        
                            </div>
                    </>
}
</>
}

