import { useState, useEffect } from 'react'
import axios from 'axios'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { AiOutlineLoading } from 'react-icons/ai'
import api from '../config'
axios.defaults.withCredentials = true
function App() {
  const [isLoading, setIsLoading] = useState(false)
  if (import.meta.env.VITE_NODE_ENV === 'production') {
    useEffect(() => {
      // console.log = () => {};
      // console.warn = () => {};
      console.error = () => {};
      // console.info = () => {};
      // console.debug = () => {};
    }, [])
  }
  useEffect(() => {
    const getCsrf = async () => {
      try {
        const res = await axios.get(`${api}/api/auth/csrf`)
        setIsLoading(true)
      } catch (e) {}
    }
    getCsrf()
    const interval = setInterval(() => {
      console.log('New Csrf')
      getCsrf()
    }, 150000)

    return () => clearInterval(interval)
  }, [])

  return (
    <AuthProvider>
      {!isLoading ? (
        <main className="loading__screen">
          <AiOutlineLoading className="loading" />
        </main>
      ) : (
        <Outlet />
      )}
    </AuthProvider>
  )
}

export default App
