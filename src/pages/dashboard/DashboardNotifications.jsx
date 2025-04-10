import { useRef, useState, useContext, useEffect } from 'react'
import '../../assets/styles/Dashboard.css'
import DashboardNav from '../../components/dashboard/DashboardNav'
import Notifications from '../../components/dashboard/Notifications'
import { AuthContext } from '../../context/AuthContext'
import { AiOutlineLoading } from "react-icons/ai";
import LoginError from '../../errors/loginError'
const DashboardNotifications = () => {
    const { isAuthenticated, getRefresh, isAuthLoading } = useContext(AuthContext)
    const dashboardMain = useRef(null)
    const [ notificationPageFlag, setNotificationPageFlag ] = useState(true)
    useEffect(() => {
        getRefresh();
    }, [])
    return(
        <>
            {isAuthenticated? (
                    <main className='dashboard__main' ref={dashboardMain}>
                    <DashboardNav 
                        dashboardMain={dashboardMain}
                        notifications={true} 
                        notificationPageFlag={notificationPageFlag}
                        setNotificationPageFlag={setNotificationPageFlag}
                    />
                    <Notifications notificationPageFlag={notificationPageFlag}/>
                </main>
            ) : (
                <>
                    {!isAuthLoading? (
                        <main className='loading__screen'>
                            <AiOutlineLoading className='loading'/>
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