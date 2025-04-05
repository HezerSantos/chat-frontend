import { useRef, useState } from 'react'
import '../../assets/styles/Dashboard.css'
import DashboardNav from '../../components/dashboard/DashboardNav'
import Friends from '../../components/dashboard/Friends'

const DashboardFriends = () => {
    const dashboardMain = useRef(null)

    return(
        <>
            <main className='dashboard__main' ref={dashboardMain}>
                <DashboardNav dashboardMain={dashboardMain} friends={true}/>
                <Friends />
            </main>
        </>
    )
}

export default DashboardFriends