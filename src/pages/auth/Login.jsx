import { useEffect, useRef, useState, useContext } from 'react'
import '../../assets/styles/Auth.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import api from '../../../config'
import { AiOutlineLoading } from 'react-icons/ai'
import { AuthContext } from '../../context/AuthContext'
import ErrorMessage from '../../errors/ErrorMessage'
const login = async (
  e,
  setLoginError,
  setIsLoading,
  navigate,
  userLogin,
  username,
  password,
  _sadwv,
  setLimitError
) => {
  e.preventDefault()
  try {
    setLimitError(false)
    setIsLoading(true)
    const payload = await _sadwv()
    const res = await axios.post(
      `${api}/api/auth/login`,
      {
        username: username,
        password: password,
      },
      {
        headers: {
          _sadwv: payload,
        },
      }
    )
    // console.log(res)
    setIsLoading(false)
    userLogin()
    navigate('/dashboard/groups')
  } catch (err) {
    console.error(err)
    let errors = ['Internal Server Error']
    if (err.response && err.status !== 429) {
      errors = err.response.data.errors.map(error => error.msg)
    }

    if(err.status === 429){
      setLimitError(true)
      setIsLoading(false)
      return
    }
    setLoginError(errors)
    setIsLoading(false)
  }
}

const handleInput = (e, setInput) => {
  setInput(e.target.value)
}

const Login = () => {
  const { isAuthenticated, userLogin, userLogout, _sadwv } =
    useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [ limitError, setLimitError ] = useState(false)
  const usernameInput = useRef(null)
  const passwordInput = useRef(null)

  const navigate = useNavigate()

  useEffect(() => {
    let timeout
    if(limitError){
      timeout = setTimeout(() => {
        setLimitError(false)
      }, 5000)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [limitError])
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
      {limitError && (
        <ErrorMessage />
      )}
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
            login(
              e,
              setLoginError,
              setIsLoading,
              navigate,
              userLogin,
              username,
              password,
              _sadwv,
              setLimitError
            )
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
