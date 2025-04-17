import { useState, useContext } from 'react'
import defaultProfile from '../../assets/images/defaultProfile.webp'
import axios from 'axios'
import api from '../../../config'
import { AiOutlineLoading } from 'react-icons/ai'
import { AuthContext } from '../../context/AuthContext'
const deleteFriend = async (e, userId, setShown, setIsLoading, _sadwv) => {
  e.preventDefault()
  try {
    setIsLoading(true)
    const payload = await _sadwv()
    const res = await axios.delete(`${api}/api/users/${userId}/friends`, {
      headers: {
        _sadwv: payload,
      }
    })
    setShown(false)
  } catch (e) {
    setIsLoading(false)
    console.error(e)
  }
}

const FriendElement = ({ userId, username, profilePicture = null }) => {
  const  { _sadwv } = useContext(AuthContext)
  const [shown, setShown] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  return (
    <>
      {shown && (
        <form className="notification__element">
          <div className="info__container">
            <img
              src={profilePicture ? profilePicture : defaultProfile}
              alt=""
            />
            <p>@{username}</p>
          </div>
          <div>
            <button
              disabled={isLoading}
              onClick={(e) => deleteFriend(e, userId, setShown, setIsLoading, _sadwv)}
            >
              {!isLoading ? (
                <>Delete</>
              ) : (
                <AiOutlineLoading className="button__loading" />
              )}
            </button>
          </div>
        </form>
      )}
    </>
  )
}

export default FriendElement
