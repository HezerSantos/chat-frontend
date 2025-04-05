import defaultProfile from '../../assets/images/defaultProfile.webp'

const MessageBlock = ({className, imageUrl}) => {
    return(
        <>
        <div 
            className={`dashboard__message__block ${className? className : '' }`}
        >
            <img src={imageUrl? imageUrl : defaultProfile} alt="" className="dashboard__profile__image"/>
            <p>As the sun dipped below the horizon, the sky transformed into a canvas of deep blues and purples, with the first stars beginning to twinkle like tiny diamonds scattered across the night. The air was cool and crisp, carrying the faint scent of pine from the nearby forest. With each passing moment, the world seemed to slow down, as if the night itself had wrapped everything in a quiet, peaceful embrace. It was the kind of evening that invited reflection, where thoughts flowed freely and the hum of daily life seemed distant, replaced by the calming rhythm of nature.</p>
        </div>
        </>
    )
}

export default MessageBlock