import { useContext, useEffect, useRef, useState } from 'react'
import '../../assets/styles/Dashboard.css'
import DashboardNav from '../../components/dashboard/DashboardNav'
import FindFriends from '../../components/dashboard/FindFriends'
import { AuthContext } from '../../context/AuthContext'
import { AiOutlineLoading } from "react-icons/ai";
import LoginError from '../../errors/loginError'
import MyFriends from '../../components/Friends/MyFriends'

const DashboardFriends = () => {
    const { isAuthenticated, getRefresh, isAuthLoading} = useContext(AuthContext)

    const [ friendPageFlag, setFriendPageFlag ] = useState(true)
    const dashboardMain = useRef(null)

    useEffect(() => {
        getRefresh();
    }, [])
    return(
        <>
            {isAuthenticated? (
                <main className='dashboard__main' ref={dashboardMain}>
                    <DashboardNav dashboardMain={dashboardMain} friends={true} setFriendPageFlag={setFriendPageFlag} friendPageFlag={friendPageFlag}/>
                    {friendPageFlag? (
                        <FindFriends />
                    ) : (
                        <MyFriends />
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

export default DashboardFriends