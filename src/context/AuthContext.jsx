import React, { createContext, useState, useContext } from 'react';
import axios from "axios"
import api from '../../config'
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [ isAuthLoading, setIsAuthLoading ] = useState(false)
    const [ userId, setUserId ] = useState(null)
    const [ username, setUsername ] = useState(null)
    const [ ws, setWs ] = useState(null)
    const userLogin = () => setIsAuthenticated(true);
    const userLogout = () => setIsAuthenticated(false);
    
    const getRefresh = async () => {
      try {
        const res = await axios.get(`${api}/api/auth/refresh`);
        // console.log(res);
        console.log("Reauth")
        setUserId(res.data.id)
        setUsername(res.data.username)
        userLogin(); 
      } catch (error) {
        userLogout(); 
        setIsAuthLoading(true)
        console.error(error);
      }
    };
    return (
      <AuthContext.Provider value={{ isAuthenticated, userLogin, userLogout, getRefresh, isAuthLoading, setIsAuthLoading, userId, username, ws, setWs }}>
        {children}
      </AuthContext.Provider>
    );
  };

export default AuthProvider