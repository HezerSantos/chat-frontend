import { useRef, useState } from 'react'
import '../../assets/styles/Dashboard.css'
import DashboardNav from '../../components/dashboard/DashboardNav'
import Settings from '../../components/dashboard/Settings'

const DashboardSettings = () => {
    const dashboardMain = useRef(null)

    return(
        <>
            <main className='dashboard__main' ref={dashboardMain}>
                <DashboardNav dashboardMain={dashboardMain} settings={true}/>
                <Settings />
            </main>
        </>
    )
}

export default DashboardSettings