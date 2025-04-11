import { useEffect, useState } from "react"
import FriendElement from "./FriendElement"
import axios from "axios"
import api from '../../../config'
import { AiOutlineLoading } from "react-icons/ai"

const getFriends = async(setMyFriends, setIsLoading) => {
    try{
        const res = await axios.get(`${api}/api/users/friends`)
        const friends = res.data.friends.friendsAsUser
        setMyFriends(friends)
        setIsLoading(false)
    } catch(e){
        console.error(e)
    }
}

const MyFriends = () => {
    const [ myFriends, setMyFriends ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    useEffect(() => {
        getFriends(setMyFriends, setIsLoading)
    }, [])

    return(
        <>
            {!isLoading? (
                <section className="my__friends">
                    <h1>My Friends</h1>
                    {myFriends.map(friend => {
                        return(
                            <FriendElement 
                                key={friend.friendId}
                                userId={friend.friendId}
                                username={friend.friend.username}
                                profilePicture={friend.friend.profilePicture}
                            />
                        )
                    })}
                </section>
            ): (
                <section className="loading__screen grid__loading">
                    <AiOutlineLoading className="loading" />
                </section>
            )}
        </>
    )
}

export default MyFriends