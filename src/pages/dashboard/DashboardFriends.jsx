import { useContext, useEffect, useRef, useState } from 'react'
import '../../assets/styles/Dashboard.css'
import DashboardNav from '../../components/dashboard/DashboardNav'
import FindFriends from '../../components/dashboard/FindFriends'
import { AuthContext } from '../../context/AuthContext'
import { AiOutlineLoading } from 'react-icons/ai'
import LoginError from '../../errors/loginError'
import MyFriends from '../../components/Friends/MyFriends'
import _ from 'lodash'
import axios from 'axios'
import api from '../../../config'
import ErrorMessage from '../../errors/ErrorMessage'
const getUsers = async (setUsers, setFindLoading, _sadwv, setLimitError) => {
  try {
    setLimitError(false)
    const payload = await _sadwv()
    const res = await axios.get(`${api}/api/users`, {
      headers: {
        _sadwv: payload,
      },
    })
    setUsers(res.data.users)
    setFindLoading(false)
  } catch (e) {
    if(e.status === 429){
      setLimitError(true)
    }
    console.error(e)
  }
}

const getFriends = async (setMyFriends, setMyFriendsLoading, _sadwv, setLimitError) => {
  try {
    setLimitError(false)
    const payload = await _sadwv()
    const res = await axios.get(`${api}/api/users/friends`, {
      headers: {
        _sadwv: payload,
      },
    })
    const friends = res.data.friends.friendsAsUser
    setMyFriends(friends)
    setMyFriendsLoading(false)
  } catch (e) {
    if(e.status === 429){
      setLimitError(true)
    }
    console.error(e)
  }
}

const DashboardFriends = () => {
  const { isAuthenticated, getRefresh, isAuthLoading, _sadwv } =
    useContext(AuthContext)
  const [friendPageFlag, setFriendPageFlag] = useState(true)
  const [users, setUsers] = useState([])
  const [findLoading, setFindLoading] = useState(true)
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const [maxUsers, setMaxUsers] = useState(1)
  const dashboardMain = useRef(null)
  const [myFriends, setMyFriends] = useState([])
  const [myFriendsLoading, setMyFriendsLoading] = useState(true)
  const [ limitError, setLimitError ] = useState(false)

  useEffect(() => {
    const delay = async () => {
      await getRefresh()
      getUsers(setUsers, setFindLoading, _sadwv, setLimitError)
      getFriends(setMyFriends, setMyFriendsLoading, _sadwv, setLimitError)
    }

    const initiateMaxUsers = async () => {
      const windowSize = window.innerWidth
      let maxUsers = Math.floor((windowSize - 320) / 192)
      if (!maxUsers || maxUsers < 1) {
        maxUsers = 1
      }
      setMaxUsers(maxUsers)
    }

    initiateMaxUsers()
    delay()
  }, [])

  useEffect(() => {
    const randomSuggested = _.sampleSize(users, 10)
    setSuggestedUsers(randomSuggested.slice(0, maxUsers).map((user) => user))
  }, [users])

  useEffect(() => {
    const randomSuggested = _.sampleSize(users, 10)
    setSuggestedUsers(randomSuggested.slice(0, maxUsers).map((user) => user))
  }, [maxUsers])

  useEffect(() => {
    let timeout
    if(limitError){
      timeout = setTimeout(() => {
        setLimitError(false)
      }, 5000)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [limitError])

  return (
    <>
      {isAuthenticated ? (
        <main className="dashboard__main" ref={dashboardMain}>
          {limitError && (
            <ErrorMessage />
          )}
          <DashboardNav
            dashboardMain={dashboardMain}
            friends={true}
            setFriendPageFlag={setFriendPageFlag}
            friendPageFlag={friendPageFlag}
          />
          {friendPageFlag ? (
            <FindFriends
              users={users}
              setUsers={setUsers}
              findLoading={findLoading}
              suggestedUsers={suggestedUsers}
              setMaxUsers={setMaxUsers}
              setLimitError={setLimitError}
            />
          ) : (
            <MyFriends
              myFriends={myFriends}
              myFriendsLoading={myFriendsLoading}
              setLimitError={setLimitError}
            />
          )}
        </main>
      ) : (
        <>
          {!isAuthLoading ? (
            <main className="loading__screen">
              <AiOutlineLoading className="loading" />
            </main>
          ) : (
            <LoginError />
          )}
        </>
      )}
    </>
  )
}

export default DashboardFriends
