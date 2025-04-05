import { useRef, useState } from 'react'
import '../../assets/styles/Settings.css'

const openModal = (e, modal) => {
    e.preventDefault()
    modal.current?.showModal()
}

const closeModal = (e, modal) => {
    e.preventDefault()
    modal.current.close()
}

const handleSubmit = (e) => {
    e.preventDefault()
}
const ChangeCredentials = () => {
    const modal = useRef(null)
    return(
        <>
        <section className='settings__module change__credentials'>
            <div>
                <label htmlFor="username">New Username: </label>
                <input type="text" id='username' name='username'/>
            </div>
            <div>
                <label htmlFor="password">New Passowrd: </label>
                <input type="text" id='password' name='password'/>
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm New Password: </label>
                <input type="text" id='confirmPassword' name='confirmPassword'/>
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
                onSubmit={(e) => handleSubmit(e)}
            >
                <label htmlFor='confirm'>Type your password to change credentials</label>
                <input type="text" name="confirm" id="confirm" />
                {/* <p className='error'>asdasd</p> */}
                <div>
                    <button onClick={(e) => closeModal(e, modal)}>Back</button>
                    <button>Confirm</button>
                </div>
            </form>
        </dialog>
        </>
    )
}

export default ChangeCredentials