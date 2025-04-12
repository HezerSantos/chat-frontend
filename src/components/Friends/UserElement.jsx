import axios from 'axios'
import defaultProfile from '../../assets/images/defaultProfile.webp'
import api from '../../../config'
import { useState } from 'react'
const handleSubmit = async(e, userId, setButtonText, setIsDisabled) => {
    e.preventDefault()
    try{
        const res = await axios.post(`${api}/api/users/${userId}/friends/request`)

        setButtonText("Sent")
        setIsDisabled(true)
    } catch(e){
        console.error(e)
        setButtonText("Add")
    }
}
const UserElement = ({username, profilePicture=null, userId}) => {
    const [ buttonText, setButtonText ] = useState("Add")
    const [isDisabled, setIsDisabled] = useState(false);
    return(
        <>
            <form className='user__element' onSubmit={(e) => handleSubmit(e, userId, setButtonText, setIsDisabled)}>
                <img src={profilePicture? profilePicture : defaultProfile} alt="" />
                <button disabled={isDisabled} >{buttonText}</button>
                <p>@{username}</p>
            </form>
        </>
    )
}

export default UserElement