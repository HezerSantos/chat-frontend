import defaultProfile from '../../assets/images/defaultProfile.webp'
const SearchElement = () => {
    return(
        <>
            <div className="search__element">
                <img src={defaultProfile} alt="" />
                <p>@myusername</p>
                <button>Add +</button>
            </div>
        </>
    )
}

export default SearchElement