import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {

    let navigate = useNavigate()
        if(localStorage.getItem('userToken')){
                navigate('')
            
            return children
        }else{
            return <Navigate to={'/login'}></Navigate>
        }
}
