import '../../assets/styles/GroupOptions.css'
import { FaArrowRight } from 'react-icons/fa6'
import { FaArrowLeft } from 'react-icons/fa'
import AddMember from '../Groups/AddMember'
import RemoveMember from '../Groups/RemoveMember'
import defaultProfile from '../../assets/images/defaultProfile.webp'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import api from '../../../config'
import Loading from '../Loading'
const users = [
//   {
//     username: 'Bob',
//     id: 3,
//     profilePicture: defaultProfile,
//   },
//   {
//     username: 'Jane',
//     id: 2,
//     profilePicture: defaultProfile,
//   },
//   {
//     username: 'Frank',
//     id: 5,
//     profilePicture: defaultProfile,
//   },
//   {
//     username: 'Camilla',
//     id: 1,
//     profilePicture: defaultProfile,
//   },
//   {
//     username: 'Selena',
//     id: 32,
//     profilePicture: defaultProfile,
//   },
//   {
//     username: 'Demarcus',
//     id: 33,
//     profilePicture: defaultProfile,
//   },
//   {
//     username: 'Lamar',
//     id: 23,
//     profilePicture: defaultProfile,
//   },
//   {
//     username: 'Jackson',
//     id: 53,
//     profilePicture: defaultProfile,
//   },
//   {
//     username: 'Rebecca',
//     id: 31,
//     profilePicture: defaultProfile,
//   },
//   {
//     username: 'Clarence',
//     id: 73,
//     profilePicture: defaultProfile,
//   },
//   {
//     username: 'Selener',
//     id: 83,
//     profilePicture: defaultProfile,
//   },
//   {
//     username: 'Beaner',
//     id: 311,
//     profilePicture: defaultProfile,
//   },
//   {
//     username: 'Justin',
//     id: 233,
//     profilePicture: defaultProfile,
//   },
]
function chunkArray(arr, size) {
  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

const handleNext = (setCurrentPage, addMembers, setPrevButtonFlag, setNextButtonFlag) => {
  setCurrentPage((prev) => {
    prev += 1
    if(prev >= 1){
        setPrevButtonFlag(true)
    }
    if(prev === addMembers.length - 1){
        setNextButtonFlag(false)
    }
    if (prev >= addMembers.length) {
        return addMembers.length - 1
    }
    return prev
  })
}

const handlePrev = (setCurrentPage, addMembers, setPrevButtonFlag, setNextButtonFlag) => {
  setCurrentPage((prev) => {
    prev -= 1
    if (prev < addMembers.length){
        setNextButtonFlag(true)
    }
    if (prev === 0) {
        setPrevButtonFlag(false)
        return 0
    }
    return prev
  })
}

const getGroupMembers = async(groupId, _sadwv, setRemoveMembers) => {
  try{
    const payload = await _sadwv()
    const res = await axios.get(`${api}/api/groups/${groupId}/users`, {
      headers: {
        _sadwv: payload,
      }
    })
    setRemoveMembers(res.data.groupMembers)
    return res.data.groupMembers
  } catch(e){
    console.error(e)
  }
}

const getFriends = async(setMyFriends, _sadwv) => {
try{
  const payload = await _sadwv()
  const res = await axios.get(`${api}/api/users/friends`, {
    headers: {
      _sadwv: payload,
    }
  })
  // console.log(res)
  setMyFriends(res.data.friends.friendsAsUser)
} catch(e) {
  console.error(e)
}
}

const getFiltered = (myFriends, removeMembers) => {
  const memberIds = new Set(removeMembers.map(member => member.user.id))

  const filteredFriends = myFriends.filter(friend => !memberIds.has(friend.friendId))
  return filteredFriends
}



// 
const GroupOptions = ({groupId}) => {
  const { getRefresh, _sadwv } = useContext(AuthContext)
  const [ prevButtonFlag, setPrevButtonFlag ] = useState(false)
  const [ nextButtonFlag, setNextButtonFlag ] = useState(false)


  const [addMembers, setAddMembers] = useState([])
  const [currentAddMembers, setCurrentAddMembers] = useState([])
  const [currentPage, setCurrentPage] = useState(null)
  const [removeMembers, setRemoveMembers] = useState([])
  const [ myFriends, setMyFriends ] = useState([])

  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    if(addMembers.length > 1){
        setNextButtonFlag(true)
    }
  }, [addMembers])

  useEffect(() => {
    const delay = async() => {
      await getRefresh()
      await getGroupMembers(groupId, _sadwv, setRemoveMembers)
      await getFriends(setMyFriends, _sadwv)
    }

    delay()
  }, [])

  useEffect(() => {
    const filteredFriends = getFiltered(myFriends, removeMembers)
    const userSplit = chunkArray(filteredFriends, 5)
    setAddMembers(userSplit)
  }, [myFriends])

  useEffect(() => {
    setCurrentAddMembers(addMembers[0])
  }, [addMembers])

  useEffect(() => {
    setCurrentAddMembers(addMembers[currentPage])
  }, [currentPage])

  useEffect(() => {
    if(currentAddMembers && currentAddMembers.length > 0){
      setIsLoading(false)
    }
  }, [currentAddMembers])

  return (
    isLoading? (
      <>
        <Loading />
      </>
    ) : (
      <>
      <section className="group__options">
        <div className="options__header">
          <form>
            <div>
              <label htmlFor="">Change Name</label>
              <div>
                <input type="text" />
                <button>
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="member">
          <h1>Add Member</h1>
          <div>
            {currentAddMembers.map((user) => {
                      return (
                          <AddMember
                          key={`Member${user.friendId}`}
                          userId={user.friendId}
                          username={user.friend.username}
                          profilePicture={user.profilePicture}
                          groupId={groupId}
                          />
                      )
              })}
          </div>
          <div className="button__container">
            {prevButtonFlag && (
                <button 
                    onClick={() => handlePrev(setCurrentPage, addMembers, setPrevButtonFlag, setNextButtonFlag)}
                    className='prev'
                >
                    <FaArrowLeft />
                </button>
            )}
            {nextButtonFlag && (
                <button 
                    onClick={() => handleNext(setCurrentPage, addMembers, setPrevButtonFlag, setNextButtonFlag)}
                    className='next'
                >
                    <FaArrowRight />
                </button>
            )}
          </div>
        </div>
        <div className="member">
          <h1>Remove Member</h1>
            <div>
                {removeMembers.map(user => {
                    return(
                        <RemoveMember
                            key={`Remove${user.user.id}`}
                            userId={user.user.id}
                            username={user.user.username}
                            profilePicture={user.user.profilePicture}
                            groupId={groupId}
                        />
                    )
                })}
            </div>
        </div>
        <section className="delete__section">
          <button className="delete__button">Delete Group</button>
        </section>
      </section>
    </>
    )
  )
}

export default GroupOptions
