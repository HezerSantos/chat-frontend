import { useState, useEffect } from 'react'
import axios from "axios"
import { Navigate, Outlet } from "react-router-dom"

function App() {
    if(import.meta.env.VITE_NODE_ENV === "production"){
        // useEffect(() => {
        //     console.log = () => {};
        //     console.warn = () => {};
        //     console.error = () => {};
        //     console.info = () => {};
        //     console.debug = () => {};
        // }, [])
    }
    axios.defaults.withCredentials = true;
    return(
        <Outlet />
    )
}

export default App
