import { useRef, useState } from 'react'
import '../../assets/styles/Dashboard.css'
import DashboardNav from '../../components/dashboard/DashboardNav'
import AddGroup from '../../components/dashboard/AddGroup'

const DashboardAddGroup = () => {
    const dashboardMain = useRef(null)

    return(
        <>
            <main className='dashboard__main' ref={dashboardMain}>
                <DashboardNav dashboardMain={dashboardMain} addGroup={true}/>
                <AddGroup />
            </main>
        </>
    )
}

export default DashboardAddGroup