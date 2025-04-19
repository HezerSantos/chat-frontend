import defaultProfile from '../../assets/images/defaultProfile.webp'
import api from '../../../config'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { useContext, useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
const handleAddMember = async(groupId, userId, _sadwv, setIsDisabled, setIsLoading, setButtonText) => {
  try{
    setIsLoading(true)
    const payload = await _sadwv()
    const res = await axios.post(`${api}/api/groups/${groupId}/users/${userId}`, {}, {
      headers: {
        _sadwv: payload,
      }
    })
    setIsDisabled(true)
    setButtonText("Added")
    setIsLoading(false)
  } catch(e){
    setIsLoading(false)
    console.error(e)
  }
}

const AddMember = ({ userId, username, profilePicture, groupId }) => {
  const { _sadwv } = useContext(AuthContext)
  const [ isDisabled, setIsDisabled ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ buttonText, setButtonText ] = useState("Add")
  return (
    <>
      <div className="user__row">
        <div>
          <img src={profilePicture ? profilePicture : defaultProfile} alt="" />
          <p>@{username}</p>
        </div>
        <button 
          disabled={isDisabled} 
          onClick={() => handleAddMember(groupId, userId, _sadwv, setIsDisabled, setIsLoading, setButtonText)}
        >
          {isLoading? (
            <AiOutlineLoading className='button__loading'/>
          ) : (
            <>
              {buttonText}
            </>
          )}
        </button>
      </div>
    </>
  )
}

export default AddMember
