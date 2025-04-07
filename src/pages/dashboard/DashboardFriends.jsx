import { useContext, useEffect, useRef, useState } from 'react'
import '../../assets/styles/Dashboard.css'
import DashboardNav from '../../components/dashboard/DashboardNav'
import Friends from '../../components/dashboard/Friends'
import { AuthContext } from '../../context/AuthContext'
import { AiOutlineLoading } from "react-icons/ai";
import LoginError from '../../errors/loginError'

const DashboardFriends = () => {
    const { isAuthenticated, getRefresh, isAuthLoading} = useContext(AuthContext)
    const dashboardMain = useRef(null)

    useEffect(() => {
        getRefresh();
    }, [])
    return(
        <>
            {isAuthenticated? (
                <main className='dashboard__main' ref={dashboardMain}>
                    <DashboardNav dashboardMain={dashboardMain} friends={true}/>
                    <Friends />
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

export default DashboardFriends