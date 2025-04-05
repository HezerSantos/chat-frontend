import { useRef, useState, useContext, useEffect } from 'react'
import '../../assets/styles/Dashboard.css'
import DashboardNav from '../../components/dashboard/DashboardNav'
import MessageGroup from '../../components/dashboard/MessageGroup'
import { AuthContext } from '../../context/AuthContext'
import { AiOutlineLoading } from "react-icons/ai";
import axios from "axios"
import api from '../../../config'

const DashboardMessageGroup = () => {
    const { isAuthenticated, userLogin, userLogout } = useContext(AuthContext)
    const dashboardMain = useRef(null)
    
    useEffect(() => {
        const getRefresh = async() => {
            try{
                const res = await axios.get(`${api}/api/auth/refresh`)
                console.log(res)
                userLogin()
            } catch(error){
                userLogout()
                console.error(error)
            }
        }

        getRefresh()
    })


    return(
        <>
            {isAuthenticated? (
                <main className='dashboard__main' ref={dashboardMain}>
                    <DashboardNav dashboardMain={dashboardMain} messageGroup={true}/>
                    <MessageGroup />
                </main>
            ) : (
                <main className='loading__screen'>
                    <AiOutlineLoading className='loading'/>
                </main>
            )}

        </>
    )
}

export default DashboardMessageGroup