import defaultProfile from '../../assets/images/defaultProfile.webp'

const MessageBlock = ({className, imageUrl, message}) => {
    return(
        <>
        <div 
            className={`dashboard__message__block ${className? className : '' }`}
        >
            <img src={imageUrl? imageUrl : defaultProfile} alt="" className="dashboard__profile__image"/>
            <p>{message}</p>
        </div>
        </>
    )
}

export default MessageBlock