import { useContext, useEffect, useRef, useState } from 'react'
import '../../assets/styles/Dashboard.css'
import DashboardNav from '../../components/dashboard/DashboardNav'
import FindFriends from '../../components/dashboard/FindFriends'
import { AuthContext } from '../../context/AuthContext'
import { AiOutlineLoading } from "react-icons/ai";
import LoginError from '../../errors/loginError'
import MyFriends from '../../components/Friends/MyFriends'
import _ from 'lodash'
import axios from 'axios'
import api from '../../../config'
const getUsers = async(setUsers, setFindLoading) => {
    try{
        const res = await axios.get(`${api}/api/users`)
        setUsers(res.data.users)
        setFindLoading(false)
    } catch(e){
        console.error(e)
    }
}

const getFriends = async(setMyFriends, setMyFriendsLoading) => {
    try{
        const res = await axios.get(`${api}/api/users/friends`)
        const friends = res.data.friends.friendsAsUser
        setMyFriends(friends)
        setMyFriendsLoading(false)
    } catch(e){
        console.error(e)
    }
}



const DashboardFriends = () => {
    const { isAuthenticated, getRefresh, isAuthLoading} = useContext(AuthContext)
    const [ friendPageFlag, setFriendPageFlag ] = useState(true)
    const [ users, setUsers ] = useState([])
    const [findLoading, setFindLoading ] = useState(true)
    const [ suggestedUsers, setSuggestedUsers ] = useState([])
    const [ maxUsers, setMaxUsers ] = useState(1)
    const dashboardMain = useRef(null)
    const [ myFriends, setMyFriends ] = useState([])
    const [ myFriendsLoading, setMyFriendsLoading ] = useState(true)


    useEffect(() => {
        const delay = async() => {
            await getRefresh();
            getUsers(setUsers, setFindLoading)
            getFriends(setMyFriends, setMyFriendsLoading)
        }

        const initiateMaxUsers = async() => {
            const windowSize = window.innerWidth
            let maxUsers = Math.floor((windowSize - 320) / 192)
            if (!maxUsers || maxUsers < 1){
                maxUsers = 1
            }
            setMaxUsers(maxUsers) 
        }

        initiateMaxUsers()
        delay()
    }, [])

    useEffect(() => {
        const randomSuggested = _.sampleSize(users, 10)
        setSuggestedUsers(randomSuggested.slice(0, maxUsers).map(user => user))
    }, [users])



    useEffect(() => {
        const randomSuggested = _.sampleSize(users, 10)
        setSuggestedUsers(randomSuggested.slice(0, maxUsers).map(user => user))
    }, [maxUsers])

    return(
        <>
            {isAuthenticated? (
                <main className='dashboard__main' ref={dashboardMain}>
                    <DashboardNav dashboardMain={dashboardMain} friends={true} setFriendPageFlag={setFriendPageFlag} friendPageFlag={friendPageFlag}/>
                    {friendPageFlag? (
                        <FindFriends users={users} setUsers={setUsers} findLoading={findLoading} suggestedUsers={suggestedUsers} setMaxUsers={setMaxUsers}/>
                    ) : (
                        <MyFriends myFriends={myFriends} myFriendsLoading={myFriendsLoading}/>
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