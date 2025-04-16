import { useContext, useEffect, useRef, useState } from 'react'
import '../../assets/styles/Dashboard.css'
import DashboardNav from '../../components/dashboard/DashboardNav'
import AddGroup from '../../components/dashboard/AddGroup'
import { AuthContext } from '../../context/AuthContext'
import { AiOutlineLoading } from 'react-icons/ai'
import LoginError from '../../errors/loginError'

const DashboardAddGroup = () => {
  const { isAuthenticated, getRefresh, isAuthLoading } = useContext(AuthContext)
  const dashboardMain = useRef(null)

  useEffect(() => {
    getRefresh()
  }, [])

  return (
    <>
      {isAuthenticated ? (
        <main className="dashboard__main" ref={dashboardMain}>
          <DashboardNav dashboardMain={dashboardMain} addGroup={true} />
          <AddGroup />
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

export default DashboardAddGroup
