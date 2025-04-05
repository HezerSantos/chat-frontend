import { useContext, useRef, useState } from 'react'
import '../../assets/styles/Dashboard.css'
import DashboardNav from '../../components/dashboard/DashboardNav'
import Friends from '../../components/dashboard/Friends'
import { AuthContext } from '../../context/AuthContext'
import { AiOutlineLoading } from "react-icons/ai";

const DashboardFriends = () => {
    const { isAuthenticated, userLogin, userLogout } = useContext(AuthContext)
    const dashboardMain = useRef(null)

    return(
        <>
            {isAuthenticated? (
                <main className='dashboard__main' ref={dashboardMain}>
                    <DashboardNav dashboardMain={dashboardMain} friends={true}/>
                    <Friends />
                </main>
            ) : (
                <main className='loading__screen'>
                    <AiOutlineLoading className='loading'/>
                </main>
            )}
        </>
    )
}

export default DashboardFriends