import defaultProfile from '../../assets/images/defaultProfile.webp'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { AiOutlineLoading } from 'react-icons/ai'
import api from '../../../config'
import axios from 'axios'

const handleAddMember = async(groupId, userId, _sadwv, setIsDisabled, setIsLoading, setButtonText, setLimitError) => {
  try{
    setLimitError(false)
    setIsLoading(true)
    const payload = await _sadwv()
    const res = await axios.delete(`${api}/api/groups/${groupId}/users/${userId}`,{
      headers: {
        _sadwv: payload,
      }
    })
    setIsDisabled(true)
    setButtonText("Removed")
    setIsLoading(false)
  } catch(e){
    if(e.status === 429){
      setLimitError(true)
    }
    setIsLoading(false)
    console.error(e)
  }
}

const RemoveMember = ({ userId, username, profilePicture, groupId, setLimitError }) => {
  const { _sadwv } = useContext(AuthContext)
  const [ isDisabled, setIsDisabled ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ buttonText, setButtonText ] = useState("Remove")
  return (
    <>
      <div className="user__row">
        <div>
          <img src={profilePicture ? profilePicture : defaultProfile} alt="" />
          <p>@{username}</p>
        </div>
        <button 
          disabled={isDisabled} 
          onClick={() => handleAddMember(groupId, userId, _sadwv, setIsDisabled, setIsLoading, setButtonText, setLimitError)}
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

export default RemoveMember
