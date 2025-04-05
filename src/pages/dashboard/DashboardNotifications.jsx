import { useRef, useState } from 'react'
import '../../assets/styles/Dashboard.css'
import DashboardNav from '../../components/dashboard/DashboardNav'
import Notifications from '../../components/dashboard/Notifications'


const DashboardNotifications = () => {
    const dashboardMain = useRef(null)

    return(
        <>
            <main className='dashboard__main' ref={dashboardMain}>
                <DashboardNav dashboardMain={dashboardMain} notifications={true}/>
                <Notifications />
            </main>
        </>
    )
}

export default DashboardNotifications