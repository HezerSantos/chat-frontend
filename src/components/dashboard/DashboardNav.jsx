import { CgProfile } from 'react-icons/cg'
import { IoMdAddCircle } from 'react-icons/io'
import { FaUserFriends } from 'react-icons/fa'
import { IoIosNotifications } from 'react-icons/io'
import { IoMdSettings } from 'react-icons/io'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { BiMessageRounded } from 'react-icons/bi'
import { useContext, useEffect, useRef, useState } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import api from '../../../config'
import { AiOutlineLoading } from 'react-icons/ai'
import MessageGroup from './MessageGroup'
import { AuthContext } from '../../context/AuthContext'
const toggleNavBar = (e, toggleButton, dashboardMain, dashboardNav) => {
  toggleButton.current.classList.toggle('dashboard__button__toggle')
  dashboardMain.current.classList.toggle('dashboard__main__toggle')
  dashboardNav.current.classList.toggle('toggle__dashboard')
}

const handleNavigate = (e, route, navigate, ws, setWs) => {
  if (ws) {
    console.log('closing')
    ws.close()
    setWs(null)
  }
  navigate(route)
}

const handleChangeCredentials = (setSubSettingsFlag) => {
  setSubSettingsFlag(false)
}

const handleLogout = (setSubSettingsFlag) => {
  setSubSettingsFlag(true)
}

const getMessageGroup = async (e, groupId, setMessageGroup) => {
  try {
    setMessageGroup(<MessageGroup key={groupId} groupId={groupId} />)
  } catch (e) {
    console.error(e)
  }
}

const handlePending = (setNotificationPageFlag) => {
  setNotificationPageFlag(true)
}

const handleRequest = (setNotificationPageFlag) => {
  setNotificationPageFlag(false)
}

const handleFindFriends = (setFriendPageFlag) => {
  setFriendPageFlag(true)
}

const handleMyFriends = (setFriendPageFlag) => {
  setFriendPageFlag(false)
}

const DashboardNav = ({
  dashboardMain,
  messagePage = false,
  addGroup = false,
  friends = false,
  notifications = false,
  settings = false,
  subSettingsFlag,
  setSubSettingsFlag,
  setMessageGroup,
  notificationPageFlag = false,
  setNotificationPageFlag,
  setFriendPageFlag,
  friendPageFlag,
  selectedGroupId,
  setSelectedGroupId,
  userGroups,
  joinedGroups,
}) => {
  const { ws, setWs } = useContext(AuthContext)
  const toggleButton = useRef(null)
  const dashboardNav = useRef(null)

  const selectedGroup = useRef(null)
  const navigate = useNavigate()

  const groupList = useRef(null)

  const handleGroupClick = (e, groupId, setMessageGroup) => {
    selectedGroup.current?.classList.remove('dashboard__sub__selected')
    setSelectedGroupId(groupId)
    getMessageGroup(e, groupId, setMessageGroup)
  }

  useEffect(() => {
    selectedGroup.current?.classList.add('dashboard__sub__selected')
  }, [selectedGroupId])

  return (
    <>
      <nav className="dashboard__nav" ref={dashboardNav}>
        <ul>
          <li>
            <button
              className="dashboard__nav__toggle__button"
              onClick={(e) =>
                toggleNavBar(e, toggleButton, dashboardMain, dashboardNav)
              }
              ref={toggleButton}
            >
              <FaLongArrowAltLeft className="dashboard__nav__toggle" />
            </button>
          </li>
          <li>
            <button
              onClick={(e) =>
                handleNavigate(e, '/dashboard/groups', navigate, ws, setWs)
              }
              className={`dashboard__nav__button ${messagePage ? 'dashboard__nav__button__select' : ''}`}
            >
              <BiMessageRounded className="dashboard__nav__icons" />
            </button>
          </li>
          <li>
            <button
              onClick={(e) =>
                handleNavigate(e, '/dashboard/add-groups', navigate, ws, setWs)
              }
              className={`dashboard__nav__button ${addGroup ? 'dashboard__nav__button__select' : ''}`}
            >
              <IoMdAddCircle className="dashboard__nav__icons" />
            </button>
          </li>
          <li>
            <button
              onClick={(e) =>
                handleNavigate(e, '/dashboard/friends', navigate, ws, setWs)
              }
              className={`dashboard__nav__button ${friends ? 'dashboard__nav__button__select' : ''}`}
            >
              <FaUserFriends className="dashboard__nav__icons" />
            </button>
          </li>
          <li>
            <button
              onClick={(e) =>
                handleNavigate(
                  e,
                  '/dashboard/notifications',
                  navigate,
                  ws,
                  setWs
                )
              }
              className={`dashboard__nav__button  ${notifications ? 'dashboard__nav__button__select' : ''}`}
            >
              <IoIosNotifications className="dashboard__nav__icons" />
            </button>
          </li>
          <li>
            <button
              onClick={(e) =>
                handleNavigate(e, '/dashboard/settings', navigate, ws, setWs)
              }
              className={`dashboard__nav__button ${settings ? 'dashboard__nav__button__select' : ''}`}
            >
              <IoMdSettings className="dashboard__nav__icons" />
            </button>
          </li>
        </ul>
        <div>
          {messagePage && (
            <>
              <div></div>
              <ul ref={groupList}>
                {!userGroups ? (
                  <li className="loading__center">
                    <AiOutlineLoading className="loading" />
                  </li>
                ) : (
                  <>
                    <h1>Owned Groups</h1>
                    {userGroups.map((group, index) => {
                      return (
                        <li
                          key={group.id}
                          ref={
                            group.id === selectedGroupId ? selectedGroup : null
                          }
                        >
                          <button
                            onClick={(e) =>
                              handleGroupClick(e, group.id, setMessageGroup)
                            }
                          >
                            {group.name}
                          </button>
                        </li>
                      )
                    })}
                  </>
                )}
              </ul>
              <div className="dashboard__joined__groups">
                <ol>
                  {!joinedGroups ? (
                    <></>
                  ) : (
                    <>
                      <li>
                        <h1>Joined Groups</h1>
                      </li>
                      {joinedGroups.map((group, index) => {
                        return (
                          <li
                            key={group.groupId}
                            ref={
                              group.groupId === selectedGroupId
                                ? selectedGroup
                                : null
                            }
                          >
                            <button
                              onClick={(e) =>
                                handleGroupClick(
                                  e,
                                  group.groupId,
                                  setMessageGroup
                                )
                              }
                            >
                              {group.name}
                            </button>
                          </li>
                        )
                      })}
                    </>
                  )}
                </ol>
              </div>
              <ul className="dashboard__group__options">
                <li>
                  <button>Group Options</button>
                </li>
              </ul>
            </>
          )}

          {friends && (
            <>
              <div></div>
              <ul>
                <li
                  className={friendPageFlag ? 'dashboard__sub__selected' : ''}
                >
                  <button onClick={() => handleFindFriends(setFriendPageFlag)}>
                    Find Friends
                  </button>
                </li>
                <li
                  className={!friendPageFlag ? 'dashboard__sub__selected' : ''}
                >
                  <button onClick={() => handleMyFriends(setFriendPageFlag)}>
                    My Friends
                  </button>
                </li>
              </ul>
            </>
          )}

          {notifications && (
            <>
              <div></div>
              <ul>
                <li
                  className={
                    notificationPageFlag ? 'dashboard__sub__selected' : ''
                  }
                >
                  <button
                    onClick={(e) => handlePending(setNotificationPageFlag)}
                  >
                    Pending
                  </button>
                </li>
                <li
                  className={
                    !notificationPageFlag ? 'dashboard__sub__selected' : ''
                  }
                >
                  <button
                    onClick={(e) => handleRequest(setNotificationPageFlag)}
                  >
                    Received
                  </button>
                </li>
              </ul>
            </>
          )}
          {settings && (
            <>
              <div></div>
              <ul>
                <li
                  className={!subSettingsFlag ? 'dashboard__sub__selected' : ''}
                >
                  <button
                    onClick={() => handleChangeCredentials(setSubSettingsFlag)}
                  >
                    Change Credentials
                  </button>
                </li>
                <li
                  className={subSettingsFlag ? 'dashboard__sub__selected' : ''}
                >
                  <button onClick={() => handleLogout(setSubSettingsFlag)}>
                    Logout
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>
      </nav>
    </>
  )
}

export default DashboardNav
