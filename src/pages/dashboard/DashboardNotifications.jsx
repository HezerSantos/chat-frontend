import { useRef, useState, useContext } from 'react'
import '../../assets/styles/Dashboard.css'
import DashboardNav from '../../components/dashboard/DashboardNav'
import Notifications from '../../components/dashboard/Notifications'
import { AuthContext } from '../../context/AuthContext'
import { AiOutlineLoading } from "react-icons/ai";

const DashboardNotifications = () => {
    const { isAuthenticated, userLogin, userLogout } = useContext(AuthContext)
    const dashboardMain = useRef(null)

    return(
        <>
            {isAuthenticated? (
                    <main className='dashboard__main' ref={dashboardMain}>
                    <DashboardNav dashboardMain={dashboardMain} notifications={true}/>
                    <Notifications />
                </main>
            ) : (
                <main className='loading__screen'>
                    <AiOutlineLoading className='loading'/>
                </main>
            )}

        </>
    )
}

export default DashboardNotifications