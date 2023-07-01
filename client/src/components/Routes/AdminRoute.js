import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";

import React from 'react'
import axios from "axios";
import Spinner from "../Spinner";

const AdminRoute = () => {
    const [ok,setOk] = useState(false);
    const [auth,setAuth] = useAuth();
    
    useEffect(()=>{
        const authCheck = async() =>{
            const res = await axios.get('/api/v1/auth/admin-auth'
            // , 
            // {
                // headers:{
                //     "Authorization": auth?.token
                // }
            // }
            )
            if(res.data.ok)
                setOk(true)
            else
                setOk(false)
        } 
        if(auth?.token)
            authCheck()
    }, [auth?.token])
  return ok ?<Outlet/>:<Spinner initialCount="5" path=""/>;
}

export default AdminRoute;