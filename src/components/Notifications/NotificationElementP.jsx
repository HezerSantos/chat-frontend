import defaultProfile from '../../assets/images/defaultProfile.webp'
import api from '../../../config'
import axios from 'axios'
import { AiOutlineLoading } from 'react-icons/ai'
import { useState } from 'react'

const handleDelete = async (e, receiverId, setShown, setIsLoading) => {
  e.preventDefault()
  try {
    setIsLoading(true)
    // console.log(receiverId)
    const res = await axios.delete(
      `${api}/api/users/${receiverId}/friends/request/pending`
    )

    console.log(res)
    setShown(false)
  } catch (e) {
    setIsLoading(false)
    console.error(e)
  }
}

const NotificationElementP = ({ userId, username, profilePicture = null }) => {
  const [shown, setShown] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  return (
    <>
      {shown && (
        <form
          className="notification__element"
          onSubmit={(e) => handleDelete(e, userId, setShown, setIsLoading)}
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
