import { useRef, useState, useContext, useEffect } from 'react'
import '../../assets/styles/Dashboard.css'
import DashboardNav from '../../components/dashboard/DashboardNav'
// import MessageGroup from '../../components/dashboard/MessageGroup'
import { AuthContext } from '../../context/AuthContext'
import { AiOutlineLoading } from 'react-icons/ai'
import LoginError from '../../errors/loginError'
import axios from 'axios'
import api from '../../../config'
import MessageGroup from '../../components/dashboard/MessageGroup'
import GroupOptions from '../../components/dashboard/GroupOptions'
const getUserGroups = async (
  setUserGroups,
  setMessageGroup,
  setSelectedGroupId,
  setJoinedGroups,
  setIsEmpty,
  _sadwv,
  setOwnedGroups
) => {
  try {
    const payload = await _sadwv()
    const res = await axios.get(`${api}/api/groups`, {
      headers: {
        _sadwv: payload,
      },
    })
    if (res.data.userGroups.length !== 0) {
      setMessageGroup(
        <MessageGroup
          key={res.data.userGroups[0].id}
          groupId={res.data.userGroups[0].id}
        />
      )
    }
    setUserGroups(res.data.userGroups)
    setOwnedGroups(res.data.userGroups.map(group => group.id))
    setJoinedGroups(res.data.joinedGroups)
    setIsEmpty(false)
    if(res.data.userGroups.length !== 0){
      return res.data.userGroups[0].id
    }
  } catch (e) {
    console.error(e)
  }
}

function chunkArray(arr, size) {
  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}


const getAddMembers = async (setCurrentPage, setAddMembers, _sadwv, ownedGroups, setMemberIds) => {
    const memberIds = new Set()
    for(let i = 0; i < ownedGroups.length; i++){
      try {
        const payload = await _sadwv()
        const res = await axios.get(`${api}/api/groups/${ownedGroups[i]}/users`, {
          headers: {
            _sadwv: payload,
          },
        })
        res.data.groupMembers.forEach(member => {
          memberIds.add(member.user.id)
        })
      } catch (e) {
        console.error(e)
      }
    }
    setMemberIds(memberIds)
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

const getFiltered = (groupId, myFriends) => {
  const groupMembers = myFriends.map(friend => friend.friend.userGroups[0]).filter(member => member && (member.groupId === groupId))
  const friendIds = new Set(groupMembers.map(member => member.userId))

  const filteredFriends = myFriends.filter(friend => !friendIds.has(friend.friendId))

  return filteredFriends
}

const DashboardMessageGroup = () => {
  const { isAuthenticated, getRefresh, isAuthLoading, _sadwv, ws, setWs } =
    useContext(AuthContext)
  const [messageGroup, setMessageGroup] = useState([])
  const [selectedGroupId, setSelectedGroupId] = useState(null)
  const [isEmpty, setIsEmpty] = useState(true)
  const [userGroups, setUserGroups] = useState(null)
  const [joinedGroups, setJoinedGroups] = useState(null)
  const [ ownedGroups, setOwnedGroups ] = useState([])
  const [addMembers, setAddMembers] = useState([])
  const [currentAddMembers, setCurrentAddMembers] = useState([])
  const [currentPage, setCurrentPage] = useState(null)
  const [removeMembers, setRemoveMembers] = useState([])
  const dashboardMain = useRef(null)

  const [ myFriends, setMyFriends ] = useState([])
  const [ groupsLoading, setGroupsLoading ] = useState(true)
  const [ memberIds, setMemberIds ] = useState(new Set())
  useEffect(() => {
    const delay = async () => {
      await getRefresh()
      await getFriends(setMyFriends, _sadwv)
      const id = await getUserGroups(
        setUserGroups,
        setMessageGroup,
        setSelectedGroupId,
        setJoinedGroups,
        setIsEmpty,
        _sadwv,
        setOwnedGroups
      )
      setGroupsLoading(false)
      if (id){
        setSelectedGroupId(id)
      }
    }
    delay()
  }, [])

  useEffect(() => {
    setCurrentAddMembers(addMembers[currentPage])
  }, [currentPage])

  useEffect(() => {
    if (ownedGroups.length > 0) {
      getAddMembers(setCurrentPage, setAddMembers, _sadwv, ownedGroups, setMemberIds)
    }
  }, [ownedGroups])

  useEffect(() => {
    const filteredFriends = getFiltered(selectedGroupId, myFriends)
    const userSplit = chunkArray(filteredFriends, 5)
    // console.log("Split", userSplit)
    setAddMembers(userSplit)
  }, [selectedGroupId])

  useEffect(() => {
    if(addMembers.length > 0){
      setCurrentPage(0)
    }
    setCurrentAddMembers(addMembers[currentPage])
  }, [addMembers])

  useEffect(() => {
    setCurrentAddMembers(addMembers[currentPage])
  }, [currentPage])

  return (
    <>
      {isAuthenticated ? (
        <main className="dashboard__main" ref={dashboardMain}>
          <DashboardNav
            dashboardMain={dashboardMain}
            messagePage={true}
            setMessageGroup={setMessageGroup}
            selectedGroupId={selectedGroupId}
            setSelectedGroupId={setSelectedGroupId}
            userGroups={userGroups}
            joinedGroups={joinedGroups}
            addMembers={addMembers}
            currentAddMembers={currentAddMembers}
            removeMembers={removeMembers}
            setCurrentAddMembers={setCurrentAddMembers}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setRemoveMembers={setRemoveMembers}
            groupsLoading={groupsLoading}
          />
          {messageGroup ? (
            groupsLoading? (
              <>
                <section className="loading__screen grid__loading">
                  <AiOutlineLoading className="loading" />
                </section>
              </>
            ) : (
              <>
                {messageGroup}
              </>
            )
          ) : (
            <section className="loading__screen grid__loading">
              <AiOutlineLoading className="loading" />
            </section>
          )}
        </main>
      ) : (
        <>
          {!isAuthLoading ? (
            <main className="loading__screen">
              <AiOutlineLoading className="loading" />
            </main>
          ) : (
            <LoginError />
          )}
        </>
      )}
    </>
  )
}

export default DashboardMessageGroup
