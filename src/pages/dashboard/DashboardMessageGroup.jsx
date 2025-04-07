import { useRef, useState, useContext, useEffect } from 'react'
import '../../assets/styles/Dashboard.css'
import DashboardNav from '../../components/dashboard/DashboardNav'
// import MessageGroup from '../../components/dashboard/MessageGroup'
import { AuthContext } from '../../context/AuthContext'
import { AiOutlineLoading } from "react-icons/ai";
import LoginError from '../../errors/loginError'
import axios from "axios"
import api from '../../../config'

const DashboardMessageGroup = () => {
    const { isAuthenticated, getRefresh, isAuthLoading } = useContext(AuthContext)
    const [ messageGroup, setMessageGroup ] = useState(null)
    const dashboardMain = useRef(null)

    useEffect(() => {
        getRefresh();  
    }, [])


    return(
        <>
            {isAuthenticated? (
                <main className='dashboard__main' ref={dashboardMain}>
                    <DashboardNav dashboardMain={dashboardMain} messageGroup={true} setMessageGroup={setMessageGroup}/>
                    {messageGroup? (
                        messageGroup
                    ) : (
                        <section className='loading__screen grid__loading'>
                            <AiOutlineLoading className='loading'/>
                        </section>
                    )}
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

export default DashboardMessageGroup