import axios from 'axios'
import defaultProfile from '../../assets/images/defaultProfile.webp'
import api from '../../../config'
import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
const handleSubmit = async (
  e,
  userId,
  setButtonText,
  setIsDisabled,
  _sadwv
) => {
  e.preventDefault()
  try {
    const payload = await _sadwv()
    const res = await axios.post(
      `${api}/api/users/${userId}/friends/request`,
      {},
      {
        headers: {
          _sadwv: payload,
        },
      }
    )

    setButtonText('Sent')
    setIsDisabled(true)
  } catch (e) {
    console.error(e)
    setButtonText('Add')
  }
}
const UserElement = ({ username, profilePicture = null, userId }) => {
  const { _sadwv } = useContext(AuthContext)
  const [buttonText, setButtonText] = useState('Add')
  const [isDisabled, setIsDisabled] = useState(false)
  return (
    <>
      <form
        className="user__element"
        onSubmit={(e) =>
          handleSubmit(e, userId, setButtonText, setIsDisabled, _sadwv)
        }
      >
        <img src={profilePicture ? profilePicture : defaultProfile} alt="" />
        <button disabled={isDisabled}>{buttonText}</button>
        <p>@{username}</p>
      </form>
    </>
  )
}

export default UserElement
