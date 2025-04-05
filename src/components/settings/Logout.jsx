import '../../assets/styles/Settings.css'
const Logout = () => {
    return(
        <>
        <form className='settings__module logout'>
            <h1>Are you sure you want to logout?</h1>
            <button type='submit'>Logout</button>
        </form>
        </>
    )
}

export default Logout