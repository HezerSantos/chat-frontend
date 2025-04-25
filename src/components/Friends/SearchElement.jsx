import defaultProfile from '../../assets/images/defaultProfile.webp'
import axios from 'axios'
import api from '../../../config'
import { AuthContext } from '../../context/AuthContext'
import { useContext, useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
const handleSubmit = async(userId, _sadwv, setIsLoading, setIsDisabled, setButtonText) => {
  try{  
    setIsLoading(true)
    const payload = await _sadwv()
    const res = await axios.post(`${api}/api/users/${userId}/friends/request`, {}, {
      headers: {
        _sadwv: payload,
      }
    })
    setIsDisabled(true)
    setButtonText("Sent")
    setIsLoading(false)
  } catch(e){
    setIsLoading(false)
    console.error(e)
  }
}


const SearchElement = ({ username, userId, profilePicture = null }) => {
    const { _sadwv } = useContext(AuthContext)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isDisabled, setIsDisabled ] = useState(false)
    const [ buttonText, setButtonText] = useState("Add +")
  return (
    <>
      <div className="search__element">
        <img src={profilePicture ? profilePicture : defaultProfile} alt="" />
        <p>@{username}</p>
        <button 
          onClick={() => handleSubmit(userId, _sadwv, setIsLoading, setIsDisabled, setButtonText)}
          disabled={isDisabled}
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

export default SearchElement
