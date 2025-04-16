import { useNavigate } from 'react-router-dom'
import '../index.css'

const LoginError = () => {
  const navigate = useNavigate()
  return (
    <>
      <main className="login__error">
        <div>
          <h1>Oops! Looks Like you haven't Logged In yet</h1>
          <button onClick={() => navigate('/')}>Login</button>
        </div>
      </main>
    </>
  )
}

export default LoginError
