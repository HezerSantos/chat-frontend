import defaultProfile from '../../assets/images/defaultProfile.webp'
const NotificationElementR = ({userId, username, profilePicture = null}) => {
    return(
        <>
            <div className="notification__element">
                <div className="info__container">
                    <img src={profilePicture? profilePicture : defaultProfile} alt="" />
                    <p>@{username}</p>
                </div>
                <div className='request__buttons'>
                    <button className='notification__add'>Add</button>
                    <button>Delete</button>
                </div>
            </div>
        </>
    )
}

export default NotificationElementR