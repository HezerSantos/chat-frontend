import { useEffect, useRef, useState } from 'react'
import '../assets/styles/Auth.css'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import api from '../../config'
import { AiOutlineLoading } from "react-icons/ai";

const createUser = async(e, setUsernameError, setPasswordError, setIsLoading, navigate) => {
    e.preventDefault()
    try{
        setIsLoading(true)
        const res = await axios.post(`${api}/api/users`, {
            username: e.target.username.value,
            password: e.target.password.value,
            confirmPassword: e.target.confirmPassword.value
        })
        console.log(res)
        setIsLoading(false)
        navigate("/")
    } catch(e){
        const errors = e.response.data.errors
        const userNameError = errors
            .filter(error => error.path === 'username')
            .map(error => error.msg)
        const passwordError = errors
            .filter(error => error.path !== 'username')
            .map(error => error.msg)
        if(userNameError.length > 0){
            setUsernameError(userNameError)
        }
        if(passwordError.length > 0){
            setPasswordError(passwordError)
        }
        setIsLoading(false)
    }
}

const handleInput = (e, setInput) => {
    setInput(e.target.value)
}

const Signup = () => {
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ usernameError, setUsernameError ] = useState(null)
    const [ passwordError, setPasswordError ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(false)

    const usernameInput = useRef(null)
    const passwordInput = useRef(null)
    const confirmPasswordInput = useRef(null)

    const navigate = useNavigate()
    useEffect(() => {
        if (usernameError){
            if(usernameError.length > 0){
                usernameInput.current.classList.toggle("error__border")
            }else{
                usernameInput.current.classList.remove("error__border")
            }
        }
    }, [usernameError])

    useEffect(() => {
        if (passwordError){
            if(passwordError.length > 0){
                passwordInput.current.classList.toggle("error__border")
                confirmPasswordInput.current.classList.toggle("error__border")
            }else{
                passwordInput.current.classList.remove("error__border")
                confirmPasswordInput.current.classList.remove("error__border")
            }
        }
    }, [passwordError])
    return(
        <main className='index__auth'>
            <section className='index__header__container'>
                    <div>
                        <h1>LunarLink</h1>
                        <p>connect beyond the stars</p>
                    </div>
            </section>
            <section className='index__form__container'>
                    <form 
                        className='index__auth__form' 
                        onSubmit={(e) => createUser(e, setUsernameError, setPasswordError, setIsLoading, navigate)}
                    >
                    {!isLoading? (
                        <>
                            <div>
                                <label htmlFor="username">Username: </label>
                                <input 
                                    onChange={(e) => handleInput(e, setUsername)} 
                                    type="text" 
                                    id='username' 
                                    value={username}
                                    name='username'
                                    ref={usernameInput}
                                />
                                {usernameError && (
                                    usernameError.map((error, index) => {
                                        return(
                                            <p key={index} className='error'>
                                                {error}*
                                            </p>
                                        )
                                    })
                                )}
                            </div>
                            <div>
                                <label htmlFor="password">Password: </label>
                                <input 
                                    onChange={(e) => handleInput(e, setPassword)} 
                                    type="text" 
                                    id='password' 
                                    value={password}
                                    name='password'
                                    ref={passwordInput}
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Confirm Password: </label>
                                <input 
                                    onChange={(e) => handleInput(e, setConfirmPassword)}
                                    type="text" 
                                    id='confirmPassword' 
                                    value={confirmPassword}
                                    name='confirmPassword'
                                    ref={confirmPasswordInput}
                                />
                                {passwordError && (
                                    passwordError.map((error, index) => {
                                        return(
                                            <p key={index} className='error'>
                                                {error}*
                                            </p>
                                        )
                                    })
                                )}
                            </div>
                            <div>
                                <button>Signup</button>
                                <Link to="/">Already a Member?</Link>
                            </div>
                        </>
                    ) : (
                        <AiOutlineLoading className='loading'/> 
                    )}
                    </form>
            </section>
        </main>
    )
}

export default Signup