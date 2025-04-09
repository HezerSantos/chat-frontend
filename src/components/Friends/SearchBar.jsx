import { useState } from "react"

const handleInput = (e, setInput) => {
    setInput(e.target.value)
}

const handleSearch = (e, setSearch, users, search, setSearchedUsers) => {
    handleInput(e, setSearch)
    const regex =  new RegExp(search, 'i')
    if(users){
        const searchedUsers = users.filter(user => regex.test(user.username))
        
        setSearchedUsers(searchedUsers)
    }
}
const SearchBar = ({users=null, setSearchedUsers, search, setSearch}) => {
    return(
        <>
            <input 
                type="text" 
                value={search}
                onChange={(e) => handleSearch(e, setSearch, users, search, setSearchedUsers)}
                placeholder="Search"
            />
        </>
    )
}

export default SearchBar