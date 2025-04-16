import '../../assets/styles/Friends.css'
import defaultProfile from '../../assets/images/defaultProfile.webp'
import SearchBar from '../Friends/SearchBar'
import SearchElement from '../Friends/SearchElement'
import UserElement from '../Friends/UserElement'
import { useContext, useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import api from '../../../config'
import axios from 'axios'
import { AiOutlineLoading } from 'react-icons/ai'
import { AuthContext } from '../../context/AuthContext'
// const users = [
//     {
//         username: "Bob",
//         userId: 3,
//         profilePicture: defaultProfile
//     },
//     {
//         username: "Jane",
//         userId: 2,
//         profilePicture: defaultProfile
//     },
//     {
//         username: "Frank",
//         userId: 5,
//         profilePicture: defaultProfile
//     },
//     {
//         username: "Camilla",
//         userId: 1,
//         profilePicture: defaultProfile
//     },
//     {
//         username: "Selena",
//         userId: 32,
//         profilePicture: defaultProfile
//     },
//     {
//         username: "Demarcus",
//         userId: 33,
//         profilePicture: defaultProfile
//     },
//     {
//         username: "Lamar",
//         userId: 23,
//         profilePicture: defaultProfile
//     },
//     {
//         username: "Jackson",
//         userId: 53,
//         profilePicture: defaultProfile
//     },
//     {
//         username: "Rebecca",
//         userId: 31,
//         profilePicture: defaultProfile
//     },
//     {
//         username: "Clarence",
//         userId: 73,
//         profilePicture: defaultProfile
//     },
//     {
//         username: "Selener",
//         userId: 83,
//         profilePicture: defaultProfile
//     },
//     {
//         username: "Beaner",
//         userId: 311,
//         profilePicture: defaultProfile
//     },
//     {
//         username: "Justin",
//         userId: 233,
//         profilePicture: defaultProfile
//     }
// ]

// const getUsers = async(setUsers, setIsLoading) => {
//     try{
//         const res = await axios.get(`${api}/api/users`)
//         setUsers(res.data.users)
//         setIsLoading(false)
//     } catch(e){
//         console.error(e)
//     }
// }

const FindFriends = ({
  users,
  setUsers,
  findLoading,
  suggestedUsers,
  setMaxUsers,
}) => {
  const { getRefresh } = useContext(AuthContext)
  const [searchedUsers, setSearchedUsers] = useState([])
  const [search, setSearch] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    const modifyMaxUsers = () => {
      const windowSize = ref.current?.getBoundingClientRect().width
      let maxUsers = Math.floor(windowSize / 192)

      if (maxUsers < 1) {
        maxUsers = 1
      }
      setMaxUsers(maxUsers)
    }

    window.addEventListener('resize', modifyMaxUsers)

    return () => {
      window.removeEventListener('resize', modifyMaxUsers)
    }
  }, [])

  return (
    <>
      {!findLoading ? (
        <section className="friends__page" ref={ref}>
          <section className="search__bar">
            <SearchBar
              users={users}
              setSearchedUsers={setSearchedUsers}
              search={search}
              setSearch={setSearch}
            />
          </section>
          <section className="search__suggested">
            <p>Suggested</p>
            <div>
              {suggestedUsers.map((user) => {
                return (
                  <UserElement
                    key={`s$s${user.id}`}
                    username={user.username}
                    profilePicture={user.profilePicture}
                    userId={user.id}
                  />
                )
              })}
            </div>
          </section>
          <section className="search__results">
            <h1>
              Results for {search}
              {search ? `:` : ''}{' '}
            </h1>
            <div>
              {search &&
                searchedUsers.map((user) => {
                  return (
                    <SearchElement
                      key={`s$e${user.id}`}
                      username={user.username}
                      userId={user.id}
                      profilePicture={user.profilePicture}
                    />
                  )
                })}
            </div>
          </section>
        </section>
      ) : (
        <>
          <section className="loading__screen grid__loading">
            <AiOutlineLoading className="loading" />
          </section>
        </>
      )}
    </>
  )
}

export default FindFriends
