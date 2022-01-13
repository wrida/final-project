import React from "react"
import {Navigate, Outlet} from "react-router-dom"
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const {isAuth} = useSelector(state=>state.users)
    
    return isAuth ? <Outlet/> : <Navigate to ='/sigin'/>
     
          
       
   
}

export default PrivateRoute
