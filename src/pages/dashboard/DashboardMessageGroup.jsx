import { useRef, useState } from 'react'
import '../../assets/styles/Dashboard.css'
import DashboardNav from '../../components/dashboard/DashboardNav'
import MessageGroup from '../../components/dashboard/MessageGroup'

const DashboardMessageGroup = () => {
    const dashboardMain = useRef(null)

    return(
        <>
            <main className='dashboard__main' ref={dashboardMain}>
                <DashboardNav dashboardMain={dashboardMain} messageGroup={true}/>
                <MessageGroup />
            </main>
        </>
    )
}

export default DashboardMessageGroup