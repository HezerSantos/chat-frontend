import { useRef, useState } from 'react'
import '../../assets/styles/Settings.css'
import axios from 'axios'
import api from '../../../config'
const openModal = (e, modal) => {
    e.preventDefault()
    modal.current?.showModal()
}

const closeModal = (e, modal) => {
    e.preventDefault()
    modal.current.close()
}

const handleSubmit = async(e, newUsername, newPassword, newConfrimPassword, verify) => {
    e.preventDefault()
    try{
        const res = await axios.put(`${api}/api/users`, {
            username: newUsername,
            password: newPassword,
            confrimPassword: newConfrimPassword,
            verify: verify
        })

        console.log(res)
    } catch(e){
        console.error(e)
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
                />
            </div>
            <div>
                <label htmlFor="password">New Passowrd: </label>
                <input 
                    type="text" 
                    id='password' 
                    name='password'
                    onChange={(e => handleInput(e, setNewPassword))}
                />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm New Password: </label>
                <input 
                    type="text" 
                    id='confirmPassword' 
                    name='confirmPassword'
                    onChange={(e => handleInput(e, setNewConfirmPassword))}
                />
            </div>
            <button type='submit' onClick={(e) => openModal(e, modal)}>
                Submit
            </button>
        </section>

        <dialog
            className='credentials__modal'
            ref={modal}
        >
            <form action=""
                
            >
                <label htmlFor='confirm'>Type your password to change credentials</label>
                <input type="text" name="confirm" id="confirm" onChange={(e) => handleInput(e, setVerify)}/>
                <p className='error'>asdasd</p>
                <div>
                    <button onClick={(e) => closeModal(e, modal)}>Back</button>
                    <button onClick={(e) => handleSubmit(e, newUsername, newPassword, newConfrimPassword, verify)} >Confirm</button>
                </div>
            </form>
        </dialog>
        </>
    )
}

export default ChangeCredentials