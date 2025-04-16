import { useState } from 'react'
import defaultProfile from '../../assets/images/defaultProfile.webp'
import api from '../../../config'
import axios from 'axios'
import { AiOutlineLoading } from 'react-icons/ai'

const handleDelete = async (e, senderId, setShown, setDeleteLoading) => {
  e.preventDefault()
  try {
    setDeleteLoading(true)
    const res = await axios.delete(
      `${api}/api/users/${senderId}/friends/request/received`
    )

    // console.log(res)
    setShown(false)
  } catch (e) {
    console.error(e)
    setDeleteLoading(false)
  }
}

const handleAdd = async (e, senderId, setShown, setAddLoading) => {
  e.preventDefault()
  try {
    setAddLoading(true)
    const res = await axios.post(`${api}/api/users/${senderId}/friends`)

    // console.log(res)
    setShown(false)
  } catch (e) {
    setAddLoading(false)
    console.error(e)
  }
}

const NotificationElementR = ({ userId, username, profilePicture = null }) => {
  const [shown, setShown] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [addLoading, setAddLoading] = useState(false)
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
          <div className="request__buttons">
            <button
              disabled={deleteLoading || addLoading}
              className="notification__add"
              onClick={(e) => handleAdd(e, userId, setShown, setAddLoading)}
            >
              {!addLoading ? (
                <>Add</>
              ) : (
                <AiOutlineLoading className="button__loading" />
              )}
            </button>
            <button
              disabled={deleteLoading || addLoading}
              onClick={(e) =>
                handleDelete(e, userId, setShown, setDeleteLoading)
              }
            >
              {!deleteLoading ? (
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

export default NotificationElementR
