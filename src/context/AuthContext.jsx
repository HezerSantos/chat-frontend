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
  const [tokens, setTokens] = useState(
    new Array(
      ['ac29e2d6d9a5c433ad412d08905d5506', 'c02517260b64e79587aae4e31a838480'],
      ['73d4278fe30a3db9259abaf65b186ff9', '925663a20a1c7b533095d6796f8d26d3'],
      ['3b02b1d817d5e3a5ef541544c4f7fd1e', '50d1bd4643105fddc47d5559f3916ac3'],
      ['ca2ce3122c6173c77f1233d69d30fc61', '51ee9a6ed9928859d940d04d9ad16c82'],
      ['7114342c262c22f78ddb63fec938ccf2', '07bfe26f0c50fb653de480e8c5dee7c1'],
      ['bb03e393d712838a50a0e91b94b87ccf', '16f72259cea78de14c279ccdd061a122'],
      ['ccf93bd7af90e6e1a3d1a14ef34f422f', '2b95147be14182973f7d8f35ac0883e7'],
      ['c96edfed4412f2b34b364934987b1f8f', 'dcf2744ef75ac8e8691700367d3d6158'],
      ['33a7bf00bd42631e02d4fd8b7db761c9', 'aa95c552c5fb748732953849e92f72ba'],
      ['a52b1f8e13dbca07ab0bc32c586407d3', '89595199ce9f74410998d0a2757f415e'],
      ['6bfa76dde89894c26b98e25ca48d0d19', '06bc51dedb936c03271ca7ee6e5d9d10'],
      ['a4924627615d7619ca8d493d9453113f', 'a8e9fdf7bf0ca8d41f446260088bb059'],
      ['f4e423634f21ae82cb8c12be523645fe', 'de4e1b52ffa548b1fe6ba5dfa3506ae5'],
      ['ca1b099902aca3d943188e07ec09c270', 'a9d5592f4dfd5a18919b6b8977c4fa6e'],
      ['c93d53be2cdb1fff3d697d067aab72b0', '297b689020e9a9067c1ea5c3ee36e993'],
      ['9fa8d2d3ad932179874fead2059487ff', '4455237c5bd6541826d6ffd4129615a0'],
      ['8ea47b6218f027a769f59c33b033f373', '7842c75e675fb7e9a53c62e85b2d3fb6'],
      ['317205234906075cc978d6ea760010b0', 'e99475feb606bb02abf1553448f53879'],
      ['32ddbae12174ab3f859d4c48dd434e89', 'c5ab27f31f7898d7f9adaa4e8d258c07'],
      ['21ac2f19f0a8a17ce3a5873b4c95b9c0', '18119ce625fbbaf6242f3b849eae02d4']
    )
  )
  const userLogin = () => setIsAuthenticated(true)
  const userLogout = () => setIsAuthenticated(false)

  const decodeJWT = (token) => {
    const decoded = jwtDecode(token)
    return decoded
  }

  const getCookie = (tokenName) => {
    let cookies = document.cookie.split(';')
    cookies = cookies.map((cookie) => cookie.trim())
    cookies = cookies.map((cookie) => cookie.split('='))
    cookies = new Map(cookies)
    return cookies.get(tokenName)
  }

  const _sadwv = async () => {
    const cookie = getCookie('_sxrfa')
    const payload = decodeJWT(cookie)
    const token = payload._fqekx
    const key = tokens[payload.oqi_wd][0]
    const value = tokens[payload.oqi_wd][1]
    const newToken =
      token.slice(0, 7) + key + token.slice(7, 33) + value + token.slice(32, 65)

    return newToken
  }

  const getRefresh = async () => {
    try {
      const cookie = getCookie('asiw_')
      const payload = decodeJWT(cookie)
      const res = await axios.get(`${api}/api/auth/refresh`, {
        headers: {
          _bsdfe: payload._wdasd,
        },
      })
      // console.log(res);
      // console.log('Reauth')
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
