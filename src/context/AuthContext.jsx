import React, { createContext, useState, useContext } from 'react'
import axios from 'axios'
import api from '../../config'
import { jwtDecode } from 'jwt-decode'
const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const [userId, setUserId] = useState(null)
  const [username, setUsername] = useState(null)
  const [ws, setWs] = useState(null)
  const userLogin = () => setIsAuthenticated(true)
  const userLogout = () => setIsAuthenticated(false)

  const decodeJWT = (token) => {
    const decoded = jwtDecode(token)
    return decoded
  }

  const _sadwv = () => {
    const cookie = document.cookie.split('=')[1]
    const payload = decodeJWT(cookie)

    const token = payload._fqekx
    console.log('OG:', token)
    const newToken =
      token.slice(0, 7) +
      'cats' +
      token.slice(7, 33) +
      'other' +
      token.slice(32, 65)
    // console.log("New:", newToken)
    return newToken
  }

  const getRefresh = async () => {
    try {
      const payload = _sadwv()
      const res = await axios.get(`${api}/api/auth/refresh`, {
        headers: {
          _sadwv: payload,
        },
      })
      // console.log(res);
      console.log('Reauth')
      setUserId(res.data.id)
      setUsername(res.data.username)
      userLogin()
      return
    } catch (error) {
      userLogout()
      setIsAuthLoading(true)
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userLogin,
        userLogout,
        getRefresh,
        isAuthLoading,
        setIsAuthLoading,
        userId,
        username,
        ws,
        setWs,
        _sadwv,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
