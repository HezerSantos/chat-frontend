import { useState, useEffect } from 'react'
import axios from "axios"
import { Navigate } from "react-router-dom"
import '../src/assets/styles/App.css'

function App() {
    if(process.env.NODE_ENV === "production"){
        useEffect(() => {
            console.log = () => {};
            console.warn = () => {};
            console.error = () => {};
            console.info = () => {};
            console.debug = () => {};
        }, [])
    }
    axios.defaults.withCredentials = true;
}

export default App
