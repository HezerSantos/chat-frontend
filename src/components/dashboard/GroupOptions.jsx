import '../../assets/styles/GroupOptions.css'
import { FaArrowRight } from 'react-icons/fa6'
import { FaArrowLeft } from 'react-icons/fa'
import AddMember from '../Groups/AddMember'
import RemoveMember from '../Groups/RemoveMember'
import defaultProfile from '../../assets/images/defaultProfile.webp'
import { useEffect, useState, useContext, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import api from '../../../config'
import Loading from '../Loading'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLoading } from 'react-icons/ai'
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



const handleInput = (e, setInput) => {
  setInput(e.target.value)
}

const handleNameChange = async(e, newName, _sadwv, groupId, navigate) => {
  e.preventDefault()
  try{
    if(newName.trim().length === 0){
      return
    }
    const payload = await _sadwv()
    const res = await axios.put(`${api}/api/groups/${groupId}`, {
      newName: newName
    }, {
      headers: {
        _sadwv: payload,
      }
    })
    window.location.reload()
  } catch(e){
    console.error(e)
  }
}

const handleDelete = async(groupId, _sadwv, password, setButtonLoading, setErrors) => {
  try{
    setButtonLoading(true)
    if(password.length === 0){
      const error = new Error("Password is Empty");
      error.response = {
        data: {
          errors: [{ msg: "Password is Empty" }]
        }
      };
      throw error;
    }
    const payload = await _sadwv()
    const res = await axios.delete(`${api}/api/groups/${groupId}`, {
      data: {
        password: password
      },
      headers: {
        _sadwv: payload
      }
    });
    window.location.reload()
  } catch(e) {
    setErrors(e.response.data.errors.map(error => error.msg))
    setButtonLoading(false)
    console.error(e)
  }
}

const toggleModal = (modal, flag) => {
  if(flag){
    modal.current?.showModal()
  }
  if(!flag){
    modal.current?.close()
  }
}
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
  const [ newName, setNewName ] = useState("")
  const [ password, setPassword ] = useState("")

  const [ buttonLoading, setButtonLoading ] = useState(false)

  const [ errors, setErrors ] = useState(null)
  const navigate = useNavigate()
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
    if(currentAddMembers || removeMembers){
      setIsLoading(false)
    }
  }, [currentAddMembers])

  const modal = useRef(null)
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
              <label htmlFor="new__name">Change Name</label>
              <div>
                <input 
                  id='new__name'
                  type="text" 
                  onChange={(e) => handleInput(e, setNewName)}
                />
                <button onClick={(e) => handleNameChange(e, newName, _sadwv, groupId, navigate)}>
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="member">
          <h1>Add FRIENDS</h1>
          <div>
            {currentAddMembers && 
            currentAddMembers.map((user) => {
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
          <button className="delete__button" onClick={() => toggleModal(modal, true)}>Delete Group</button>
        </section>
        <dialog className='delete__modal' ref={modal}>
                <div>
                  <label id='delete__group'>Confirm Password to Delete</label>
                  <input 
                    type="text" 
                    id='delete__group' 
                    onChange={(e) => handleInput(e, setPassword)}
                    className={errors? 'error__border' : ''}
                   />
                   {errors && (
                      errors.map((error, index) => {
                        return(
                          <p key={`e${index}`} className='error'>{error}*</p>
                        )
                      })
                   )}
                </div>
                <button onClick={() => handleDelete(groupId, _sadwv, password, setButtonLoading, setErrors)}>
                  {buttonLoading? (
                    <AiOutlineLoading className='button__loading' />
                  ) : (
                    <>
                      Delete
                    </>
                  )}
                </button>
                <button onClick={() => toggleModal(modal, false)}>Close</button>
        </dialog>
      </section>
    </>
    )
  )
}

export default GroupOptions
