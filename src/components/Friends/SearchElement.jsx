import defaultProfile from '../../assets/images/defaultProfile.webp'
const SearchElement = ({ username, userId, profilePicture = null }) => {
  return (
    <>
      <div className="search__element">
        <img src={profilePicture ? profilePicture : defaultProfile} alt="" />
        <p>@{username}</p>
        <button>Add +</button>
      </div>
    </>
  )
}

export default SearchElement
