import { useRef, useState, useContext, useEffect } from 'react'
import '../../assets/styles/Dashboard.css'
import DashboardNav from '../../components/dashboard/DashboardNav'
import Logout from '../../components/settings/Logout'
import ChangeCredentials from '../../components/settings/ChangeCredentials'
import { AuthContext } from '../../context/AuthContext'
import { AiOutlineLoading } from 'react-icons/ai'
import LoginError from '../../errors/loginError'
import ErrorMessage from '../../errors/ErrorMessage'
const DashboardSettings = () => {
  const { isAuthenticated, getRefresh, isAuthLoading } = useContext(AuthContext)
  const [subSettingsFlag, setSubSettingsFlag] = useState(false)
  const dashboardMain = useRef(null)
  const [ limitError, setLimitError ] = useState(false)
  useEffect(() => {
    getRefresh()
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
            settings={true}
            subSettingsFlag={subSettingsFlag}
            setSubSettingsFlag={setSubSettingsFlag}
          />
          {!subSettingsFlag && <ChangeCredentials setLimitError={setLimitError}/>}
          {subSettingsFlag && <Logout />}
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

export default DashboardSettings
