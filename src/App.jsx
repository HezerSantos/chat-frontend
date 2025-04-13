import { useState, useEffect } from 'react'
import axios from "axios"
import { Navigate, Outlet } from "react-router-dom"
import {AuthProvider} from './context/AuthContext';
function App() {
    if(import.meta.env.VITE_NODE_ENV === "dev"){
        useEffect(() => {
            // console.log = () => {};
            // console.warn = () => {};
            // console.error = () => {};
            // console.info = () => {};
            // console.debug = () => {};
        }, [])
    }
    axios.defaults.withCredentials = true;
    return(
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    )
}

export default App
