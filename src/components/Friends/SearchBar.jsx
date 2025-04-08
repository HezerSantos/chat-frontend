import { useState } from "react"

const handleInput = (e, setInput) => {
    setInput(e.target.value)
}
const SearchBar = () => {
    const [ search, setSearch ] = useState("")
    return(
        <>
            <input 
                type="text" 
                value={search}
                onChange={(e) => handleInput(e, setSearch)}
                placeholder="Search"
            />
        </>
    )
}

export default SearchBar