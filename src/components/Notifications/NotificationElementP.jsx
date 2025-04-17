import defaultProfile from '../../assets/images/defaultProfile.webp'
import api from '../../../config'
import axios from 'axios'
import { AiOutlineLoading } from 'react-icons/ai'
import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
const handleDelete = async (e, receiverId, setShown, setIsLoading, _sadwv) => {
  e.preventDefault()
  try {
    setIsLoading(true)
    const payload = await _sadwv()
    const res = await axios.delete(
      `${api}/api/users/${receiverId}/friends/request/pending`,
      {
        headers: {
          _sadwv: payload,
        }
      }
    )

    setShown(false)
  } catch (e) {
    setIsLoading(false)
    console.error(e)
  }
}

const NotificationElementP = ({ userId, username, profilePicture = null }) => {
  const  { _sadwv } = useContext(AuthContext)
  const [shown, setShown] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  return (
    <>
      {shown && (
        <form
          className="notification__element"
          onSubmit={(e) => handleDelete(e, userId, setShown, setIsLoading, _sadwv)}
        >
          <div className="info__container">
            <img
              src={profilePicture ? profilePicture : defaultProfile}
              alt=""
            />
            <p>@{username}</p>
          </div>
          <div>
            <button disabled={isLoading}>
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

export default NotificationElementP
