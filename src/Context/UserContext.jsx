
import { createContext, useEffect, useState} from 'react'
import { useNavigate, useNavigation } from 'react-router-dom'


export let UserContext = createContext()


export default function UserContextProvider({children}){

    const [UserToken, setUserToken] = useState(null)

    useEffect(()=>{

            if(localStorage.getItem('userToken')){
               setUserToken(localStorage.getItem('userToken'))
            }
    }

,[])
  
    return <UserContext.Provider value={{UserToken,setUserToken}}>
        {children}     
    </UserContext.Provider> 
    
}