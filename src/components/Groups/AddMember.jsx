import defaultProfile from '../../assets/images/defaultProfile.webp'
const AddMember = ({userId, username, profilePicture}) => {
    return(
        <>
        <div className="user__row">
            <div>
                <img src={profilePicture? profilePicture : defaultProfile} alt="" />
                <p>@{username}</p>
            </div>
            <button>Add</button>
        </div>
        </>
    )
}

export default AddMember