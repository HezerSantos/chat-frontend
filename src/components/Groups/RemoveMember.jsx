import defaultProfile from '../../assets/images/defaultProfile.webp'
const RemoveMember = () => {
    return(
        <>
        <div className="user__row">
            <div>
                <img src={defaultProfile} alt="" />
                <p>@username</p>
            </div>
            <button>Remove</button>
        </div>
        </>
    )
}

export default RemoveMember