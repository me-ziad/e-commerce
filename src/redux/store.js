import { configureStore} from '@reduxjs/toolkit'
import productReducer from './ShowProucts/ShowProducts.jsx'



export let store =  configureStore({

    reducer :{
        //wating for reducer
        productReducer,
        
    }
})