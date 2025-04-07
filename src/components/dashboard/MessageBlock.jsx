import defaultProfile from '../../assets/images/defaultProfile.webp'

const MessageBlock = ({className, imageUrl, message, username}) => {
    return(
        <>
        <div 
            className={`dashboard__message__block ${className? className : '' }`}
        >
            <img src={imageUrl? imageUrl : defaultProfile} alt="" className="dashboard__profile__image"/>
            <p>@{username}<br/>{message}</p>
        </div>
        </>
    )
}

export default MessageBlock