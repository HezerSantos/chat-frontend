import { useRef, useState, useContext, useEffect } from 'react'
import '../../assets/styles/Dashboard.css'
import DashboardNav from '../../components/dashboard/DashboardNav'
import Notifications from '../../components/dashboard/Notifications'
import { AuthContext } from '../../context/AuthContext'
import { AiOutlineLoading } from 'react-icons/ai'
import LoginError from '../../errors/loginError'
import axios from 'axios'
import api from '../../../config'

const getRequests = async (setRequest, setPending, setIsLoading, _sadwv) => {
  try {
    const payload = await _sadwv()
    const res = await axios.get(`${api}/api/users/friends/request`, {
      headers: {
        _sadwv: payload
      }
    })
    const request = res.data.requests.receivedRequests
    const pending = res.data.requests.sentRequests
    // console.log(res)
    setRequest(request)
    setPending(pending)
    setIsLoading(false)
  } catch (e) {
    console.error(e)
  }
}

const DashboardNotifications = () => {
  const { isAuthenticated, getRefresh, isAuthLoading, _sadwv } = useContext(AuthContext)
  const dashboardMain = useRef(null)
  const [notificationPageFlag, setNotificationPageFlag] = useState(true)

  const [request, setRequest] = useState([])
  const [pending, setPending] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const delay = async () => {
      await getRefresh()
      getRequests(setRequest, setPending, setIsLoading, _sadwv)
    }
    delay()
  }, [])
  return (
    <>
      {isAuthenticated ? (
        <main className="dashboard__main" ref={dashboardMain}>
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
