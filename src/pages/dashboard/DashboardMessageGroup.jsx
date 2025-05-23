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
import GroupOptions from '../../components/dashboard/GroupOptions'
import ErrorMessage from '../../errors/ErrorMessage'
const getUserGroups = async (
  setUserGroups,
  setMessageGroup,
  setSelectedGroupId,
  setJoinedGroups,
  setIsEmpty,
  _sadwv,
  setLimitError,
  setGroupsLoading
) => {
  try {
    setLimitError(false)
    const payload = await _sadwv()
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
    }
    setUserGroups(res.data.userGroups)
    setJoinedGroups(res.data.joinedGroups)
    setIsEmpty(false)
    if(res.data.userGroups.length !== 0){
      return res.data.userGroups[0].id
    }
  } catch (e) {
    if(e.status === 429){
      setLimitError(true)
      setGroupsLoading(true)
    }
    console.error(e)
  }
}









const DashboardMessageGroup = () => {
  const { isAuthenticated, getRefresh, isAuthLoading, _sadwv, ws, setWs } =
    useContext(AuthContext)
  const [messageGroup, setMessageGroup] = useState([])
  const [selectedGroupId, setSelectedGroupId] = useState(null)
  const [isEmpty, setIsEmpty] = useState(true)
  const [userGroups, setUserGroups] = useState(null)
  const [joinedGroups, setJoinedGroups] = useState(null)
  const dashboardMain = useRef(null)

  const [ groupsLoading, setGroupsLoading ] = useState(true)
  const [ limitError, setLimitError ] = useState(false)
  useEffect(() => {
    const delay = async () => {
      await getRefresh()
      const id = await getUserGroups(
        setUserGroups,
        setMessageGroup,
        setSelectedGroupId,
        setJoinedGroups,
        setIsEmpty,
        _sadwv,
        setLimitError,
        setGroupsLoading
      )
      if (id){
        setSelectedGroupId(id)
      }
      setGroupsLoading(false)
    }
    delay()
  }, [])

  useEffect(() => {
    let timeout
    if(limitError){
      timeout = setTimeout(() => {
        setLimitError(false)
        setGroupsLoading(false)
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
            messagePage={true}
            setMessageGroup={setMessageGroup}
            selectedGroupId={selectedGroupId}
            setSelectedGroupId={setSelectedGroupId}
            userGroups={userGroups}
            joinedGroups={joinedGroups}
            groupsLoading={groupsLoading}
          />
          {messageGroup ? (
            groupsLoading? (
              <>
                <section className="loading__screen grid__loading">
                  <AiOutlineLoading className="loading" />
                </section>
              </>
            ) : (
              <>
                {messageGroup}
              </>
            )
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
