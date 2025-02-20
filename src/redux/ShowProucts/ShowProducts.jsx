import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


let  initialState =  {isLoading:false , product :[] ,error:null}


export let getProduct = createAsyncThunk('showProduct/getProduct' , async()=>{

    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    // console.log(data);
    return data.data
    

})


     let productSlice = createSlice({

        name : 'showProduct',
        initialState,
        extraReducers : (builder)=>{
            builder.addCase(getProduct.pending,(state,action)=>{

                state.isLoading = true
            })

            builder.addCase(getProduct.fulfilled,(state,action)=>{

                state.isLoading = false
                state.product = action.payload
            })
            builder.addCase(getProduct.rejected,(state,action)=>{

                state.isLoading = false
            })


        }
})

export default productSlice.reducer
