import { useRef, useState } from 'react'
import '../../assets/styles/Settings.css'
import axios from 'axios'
import api from '../../../config'
import { AiOutlineLoading } from 'react-icons/ai'

import DOMPurify from 'dompurify';
const openModal = (e, modal) => {
    e.preventDefault()
    modal.current?.showModal()
}

const closeModal = (e, modal) => {
    e.preventDefault()
    modal.current.close()
}

const handleSubmit = async(e, newUsername, newPassword, newConfrimPassword, verify, setErrors, setNewUsername, setNewPassword, setNewConfirmPassword, setVerify, modal, setIsLoading) => {
    e.preventDefault()
    try{
        setIsLoading(true)
        const username = DOMPurify.sanitize(newUsername)
        const password = DOMPurify.sanitize(newPassword)
        const confirmPassword = DOMPurify.sanitize(newConfrimPassword)
        const sVerify = DOMPurify.sanitize(verify)

        const res = await axios.put(`${api}/api/users`, {
            username: username,
            password: password,
            confirmPassword: confirmPassword,
            verify: sVerify
        })

        setNewUsername("")
        setNewPassword("")
        setNewConfirmPassword("")
        setVerify("")
        setErrors([])
        modal.current.close()
        setIsLoading(false)
    } catch(e){
        let errors = e.response.data.errors
        
        errors = errors.map(error => error.msg)
        setErrors(errors)
        console.error(e)
        setIsLoading(false)
    }
}

const handleInput = (e, setInput) => {
    setInput(e.target.value)
}

const ChangeCredentials = () => {
    const modal = useRef(null)
    const [ newUsername, setNewUsername ] = useState("")
    const [ newPassword, setNewPassword ] = useState("")
    const [ newConfrimPassword, setNewConfirmPassword ] = useState("")
    const [ verify, setVerify ] = useState("")
    const [ errors, setErrors ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)

    return(
        <>
        <section className='settings__module change__credentials'>
            <div>
                <label htmlFor="username">New Username: </label>
                <input 
                    type="text" 
                    id='username' 
                    name='username'
                    onChange={(e => handleInput(e, setNewUsername))}
                    value={newUsername}
                />
            </div>
            <div>
                <label htmlFor="password">New Passowrd: </label>
                <input 
                    type="text" 
                    id='password' 
                    name='password'
                    onChange={(e => handleInput(e, setNewPassword))}
                    value={newPassword}
                />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm New Password: </label>
                <input 
                    type="text" 
                    id='confirmPassword' 
                    name='confirmPassword'
                    onChange={(e => handleInput(e, setNewConfirmPassword))}
                    value={newConfrimPassword}
                />
            </div>
            <button type='submit' onClick={(e) => openModal(e, modal)}>
                Submit
            </button>
        </section>

        <dialog
            className={`credentials__modal`}
            ref={modal}
        >
            <form action=""
                className={`${isLoading?  'credentials__center' : ''}`}
            >
                {!isLoading? (
                    <>
                        <label htmlFor='confirm'>Type your password to change credentials</label>
                        <input value={verify} type="text" name="confirm" id="confirm" onChange={(e) => handleInput(e, setVerify)}/>
                        {errors.length > 0 && (
                            errors.map((error, index) => {
                                return <p key={index} className='error'>{error}</p>
                            })
                        )}
                        <div>
                            <button onClick={(e) => closeModal(e, modal)}>Back</button>
                            <button disabled={verify? false: true} onClick={(e) => handleSubmit(e, newUsername, newPassword, newConfrimPassword, verify, setErrors, setNewUsername, setNewPassword, setNewConfirmPassword, setVerify, modal, setIsLoading)} >Confirm</button>
                        </div>
                    </>
                ) : (
                    <AiOutlineLoading className='loading'/>
                )}
            </form>
        </dialog>
        </>
    )
}

export default ChangeCredentials