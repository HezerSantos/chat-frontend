import '../../assets/styles/Settings.css'
import axios from 'axios'
import api from '../../../config'
import { useNavigate } from 'react-router-dom'

const handleLogout = async (e, navigate) => {
  e.preventDefault()
  try {
    await axios.post(`${api}/api/auth/logout`)
    navigate('/')
  } catch (e) {
    console.error(e)
  }
}

const Logout = () => {
  const navigate = useNavigate()
  return (
    <>
      <form
        className="settings__module logout"
        onSubmit={(e) => handleLogout(e, navigate)}
      >
        <h1>Are you sure you want to logout?</h1>
        <button type="submit">Logout</button>
      </form>
    </>
  )
}

export default Logout
