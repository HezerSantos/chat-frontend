import defaultProfile from '../../assets/images/defaultProfile.webp'
const NotificationElementP = ({userId, username, profilePicture = null}) => {
    return(
        <>
            <div className="notification__element">
                <div className='info__container'>
                    <img src={profilePicture? profilePicture : defaultProfile} alt="" />
                    <p>@{username}</p>
                </div>
                <div>
                    <button>Delete</button>
                </div>
            </div>
        </>
    )
}

export default NotificationElementP