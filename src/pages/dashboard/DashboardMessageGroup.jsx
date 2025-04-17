import { useRef, useState, useContext, useEffect } from 'react'
import '../../assets/styles/Dashboard.css'
import DashboardNav from '../../components/dashboard/DashboardNav'
// import MessageGroup from '../../components/dashboard/MessageGroup'
import { AuthContext } from '../../context/AuthContext'
import { AiOutlineLoading } from 'react-icons/ai'
import LoginError from '../../errors/loginError'
import axios from 'axios'
import api from '../../../config'
import MessageGroup from '../../components/dashboard/MessageGroup'

const getUserGroups = async (
  setUserGroups,
  setMessageGroup,
  setSelectedGroupId,
  setJoinedGroups,
  setIsEmpty,
  _sadwv
) => {
  try {
    const payload = await _sadwv()
    // console.log(payload)
    const res = await axios.get(`${api}/api/groups`, {
      headers: {
        _sadwv: payload,
      },
    })
    if (res.data.userGroups.length !== 0) {
      setMessageGroup(
        <MessageGroup
          key={res.data.userGroups[0].id}
          groupId={res.data.userGroups[0].id}
        />
      )
      setSelectedGroupId(res.data.userGroups[0].id)
    }
    setUserGroups(res.data.userGroups)
    setJoinedGroups(res.data.joinedGroups)
    setIsEmpty(false)
  } catch (e) {
    console.error(e)
  }
}

const DashboardMessageGroup = () => {
  const { isAuthenticated, getRefresh, isAuthLoading, _sadwv, ws, setWs } =
    useContext(AuthContext)
  const [messageGroup, setMessageGroup] = useState(null)
  const [selectedGroupId, setSelectedGroupId] = useState(null)
  const [isEmpty, setIsEmpty] = useState(true)
  const [userGroups, setUserGroups] = useState(null)
  const [joinedGroups, setJoinedGroups] = useState(null)

  const dashboardMain = useRef(null)

  useEffect(() => {
    const delay = async () => {
      await getRefresh()
      getUserGroups(
        setUserGroups,
        setMessageGroup,
        setSelectedGroupId,
        setJoinedGroups,
        setIsEmpty,
        _sadwv
      )
    }
    delay()
  }, [])

  return (
    <>
      {isAuthenticated ? (
        <main className="dashboard__main" ref={dashboardMain}>
          <DashboardNav
            dashboardMain={dashboardMain}
            messagePage={true}
            setMessageGroup={setMessageGroup}
            selectedGroupId={selectedGroupId}
            setSelectedGroupId={setSelectedGroupId}
            userGroups={userGroups} //
            joinedGroups={joinedGroups}
          />
          {messageGroup ? (
            messageGroup
          ) : (
            <section className="loading__screen grid__loading">
              <AiOutlineLoading className="loading" />
            </section>
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

export default DashboardMessageGroup
