import defaultProfile from '../../assets/images/defaultProfile.webp'

const UserElement = () => {
    return(
        <>
            <div className='user__element'>
                <img src={defaultProfile} alt="" />
                <button>Add</button>
                <p>@myusername</p>
            </div>
        </>
    )
}

export default UserElement