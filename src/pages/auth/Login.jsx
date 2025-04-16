import { useEffect, useRef, useState, useContext } from 'react'
import '../../assets/styles/Auth.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import api from '../../../config'
import { AiOutlineLoading } from 'react-icons/ai'
import { AuthContext } from '../../context/AuthContext'

const login = async (e, setLoginError, setIsLoading, navigate, userLogin) => {
  e.preventDefault()
  try {
    setIsLoading(true)
    const res = await axios.post(`${api}/api/auth/login`, {
      username: e.target.username.value,
      password: e.target.password.value,
    })
    // console.log(res)
    setIsLoading(false)
    userLogin()
    navigate('/dashboard/groups')
  } catch (err) {
    const errors = err.response.data.errors[0]
    setLoginError(errors)
    setIsLoading(false)
  }
}

const handleInput = (e, setInput) => {
  setInput(e.target.value)
}

const Login = () => {
  const { isAuthenticated, userLogin, userLogout } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const usernameInput = useRef(null)
  const passwordInput = useRef(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (loginError) {
      usernameInput.current.classList.add('error__border')
      passwordInput.current.classList.add('error__border')
    } else {
      usernameInput.current.classList.remove('error__border')
      passwordInput.current.classList.remove('error__border')
    }
  }, [loginError])
  return (
    <main className="index__auth">
      <section className="index__header__container">
        <div>
          <h1>LunarLink</h1>
          <p>connect beyond the stars</p>
        </div>
      </section>
      <section className="index__form__container">
        <form
          className="index__auth__form"
          onSubmit={(e) =>
            login(e, setLoginError, setIsLoading, navigate, userLogin)
          }
        >
          {!isLoading ? (
            <>
              <div>
                <label htmlFor="username">Username: </label>
                <input
                  onChange={(e) => handleInput(e, setUsername)}
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  ref={usernameInput}
                />
              </div>
              <div>
                <label htmlFor="password">Password: </label>
                <input
                  onChange={(e) => handleInput(e, setPassword)}
                  type="text"
                  id="password"
                  name="password"
                  value={password}
                  ref={passwordInput}
                />
                {loginError && <p className="error">{loginError}</p>}
              </div>
              <div>
                <button>Login</button>
                <div className="auth__links">
                  <Link to="/signup">Not a Member?</Link>
                  <Link to="/dashboard/groups">Already Logged In?</Link>
                </div>
              </div>
            </>
          ) : (
            <AiOutlineLoading className="loading" />
          )}
        </form>
      </section>
    </main>
  )
}

export default Login
