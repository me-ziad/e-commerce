import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import toast from "react-hot-toast";


export let WhisListContext = createContext()

export default function WhishListContextProvider({children}){
    
    let headers = {
        token: localStorage.getItem('userToken'),
    }
    const [showWhishList, setShowWhishList] = useState([])
    
   


    async function postWhishList(productId){
    try{
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        productId
    },{
        headers
    })
    toast.success(data.message)
    console.log(data);
    displayWhishList()
}catch(error){
    console.log(error);
}
    }


    async function displayWhishList(){

    try{
        let data = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
            headers
        })
        console.log(data.data);
        setShowWhishList(data.data)
    }catch(err){
            console.log(err);
    }
    }
    useEffect(()=>{
        displayWhishList()
    },[])


    async function deleteWhishList(id){
      try{
        let {data} =  await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` ,{
            headers
         })
         displayWhishList()
         console.log(data);
         toast.success(data.status)
         
      }catch(err){
        console.log(err);
        
      }
    }

    return <WhisListContext.Provider value={{postWhishList,showWhishList,deleteWhishList}}>

    {children} </WhisListContext.Provider>
}   
