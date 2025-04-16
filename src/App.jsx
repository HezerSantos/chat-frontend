import { useState, useEffect } from 'react'
import axios from 'axios'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import api from '../config'
function App() {
  axios.defaults.withCredentials = true
  if (import.meta.env.VITE_NODE_ENV === 'dev') {
    useEffect(() => {
      // console.log = () => {};
      // console.warn = () => {};
      // console.error = () => {};
      // console.info = () => {};
      // console.debug = () => {};
    }, [])
  }
  useEffect(() => {
    const getCsrf = async () => {
      try {
        const cookie = document.cookie.split('=')[1]
        if (!cookie) {
          const res = await axios.get(`${api}/api/auth/csrf`)
          console.log(res.status)
        }
      } catch (e) {}
    }
    getCsrf()
  }, [])
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}

export default App
