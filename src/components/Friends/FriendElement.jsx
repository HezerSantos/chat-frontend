import { useState } from 'react'
import defaultProfile from '../../assets/images/defaultProfile.webp'
import axios from 'axios'
import api from '../../../config'
import { AiOutlineLoading } from 'react-icons/ai'
const deleteFriend = async (e, userId, setShown, setIsLoading) => {
  e.preventDefault()
  try {
    setIsLoading(true)
    const res = await axios.delete(`${api}/api/users/${userId}/friends`)
    setShown(false)
  } catch (e) {
    setIsLoading(false)
    console.error(e)
  }
}

const FriendElement = ({ userId, username, profilePicture = null }) => {
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
              onClick={(e) => deleteFriend(e, userId, setShown, setIsLoading)}
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
