import { useRef, useState, useContext, useEffect } from 'react'
import '../../assets/styles/Dashboard.css'
import DashboardNav from '../../components/dashboard/DashboardNav'
import Notifications from '../../components/dashboard/Notifications'
import { AuthContext } from '../../context/AuthContext'
import { AiOutlineLoading } from 'react-icons/ai'
import LoginError from '../../errors/loginError'
import axios from 'axios'
import api from '../../../config'
import ErrorMessage from '../../errors/ErrorMessage'
const getRequests = async (setRequest, setPending, setIsLoading, _sadwv, setLimitError) => {
  try {
    setLimitError(false)
    const payload = await _sadwv()
    const res = await axios.get(`${api}/api/users/friends/request`, {
      headers: {
        _sadwv: payload,
      },
    })
    const request = res.data.requests.receivedRequests
    const pending = res.data.requests.sentRequests
    // console.log(res)
    setRequest(request)
    setPending(pending)
    setIsLoading(false)
  } catch (e) {
    if(e.status === 429){
      setLimitError(true)
    }
    console.error(e)
  }
}

const DashboardNotifications = () => {
  const { isAuthenticated, getRefresh, isAuthLoading, _sadwv } =
    useContext(AuthContext)
  const dashboardMain = useRef(null)
  const [notificationPageFlag, setNotificationPageFlag] = useState(true)

  const [request, setRequest] = useState([])
  const [pending, setPending] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [ limitError, setLimitError ] = useState(false)
  
  useEffect(() => {
    const delay = async () => {
      await getRefresh()
      getRequests(setRequest, setPending, setIsLoading, _sadwv, setLimitError)
    }
    delay()
  }, [])

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
            notifications={true}
            notificationPageFlag={notificationPageFlag}
            setNotificationPageFlag={setNotificationPageFlag}
          />
          <Notifications
            notificationPageFlag={notificationPageFlag}
            request={request}
            pending={pending}
            isLoading={isLoading}
            setLimitError={setLimitError}
          />
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

export default DashboardNotifications
