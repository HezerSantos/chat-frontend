import { useContext, useRef, useState } from 'react'
import '../../assets/styles/Dashboard.css'
import DashboardNav from '../../components/dashboard/DashboardNav'
import AddGroup from '../../components/dashboard/AddGroup'
import { AuthContext } from '../../context/AuthContext'
import { AiOutlineLoading } from "react-icons/ai";


const DashboardAddGroup = () => {
    const { isAuthenticated, userLogin, userLogout } = useContext(AuthContext)
    const dashboardMain = useRef(null)

    return(
        <>
        {isAuthenticated? (
            <main className='dashboard__main' ref={dashboardMain}>
                <DashboardNav dashboardMain={dashboardMain} addGroup={true}/>
                <AddGroup />
            </main>
        ) : (
            <main className='loading__screen'>
                <AiOutlineLoading className='loading'/>
            </main>
        )}
        </>
    )
}

export default DashboardAddGroup