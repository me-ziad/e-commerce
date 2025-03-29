
import axios from "axios"
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export const CartContext = createContext()


export default function CartContextProvider({children}){

        const headers ={
          token: localStorage.getItem('userToken') }

        const [cart, setCart] = useState(null)
        async function addCart(productId){
            // console.log(productId);
            try{
                let {data} =await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
                    productId 
                },{
                    headers
                }
            );
             displayCart()
            //    console.log(data.data);
               toast.success(data.message);
            }catch(err){
                console.log(err);
            }
        }
        async function displayCart(){
            try{
                let {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
                {
                    headers
                }
            );
               setCart(data)
            //    console.log(data);
            }catch(err){
                console.log(err);
            }
        }
            useEffect(()=>{
                displayCart()
            },[])
            async function deleteCart(id){
                try{
                    let {data} =await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                    {
                        headers
                    }
                );
                setCart(data)
                toast.success('delete product succss');
                }catch(err){
                    console.log(err);
                    toast.error('faild delete product');

                }
            }
            async function clearCart(){
                try{
                    let {data} =await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
                    {
                        headers
                    }
                );
                setCart(data)
                toast.success(data.message);
    
                }catch(err){
                    console.log(err);
                    toast.error('try another time...');

                }
            }
            async function updateCart(id,count){
                try{
                    let {data} =await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                    {
                        count
                    },{
                        headers
                    }
                );
                setCart(data)
                console.log(data );
                toast.success(data.status);
                }catch(err){
                    console.log(err);
                    toast.error('try another time...');

                }
            }
                return <CartContext.Provider value={ {cart, addCart,clearCart,deleteCart,updateCart,displayCart} }>
        {children}
    </CartContext.Provider>
}

