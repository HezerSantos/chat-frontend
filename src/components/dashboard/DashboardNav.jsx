import { CgProfile } from "react-icons/cg";
import { IoMdAddCircle } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { BiMessageRounded } from "react-icons/bi";
import { useContext, useEffect, useRef, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from '../../../config'
import { AiOutlineLoading } from "react-icons/ai";
import MessageGroup from "./MessageGroup";
import { AuthContext } from "../../context/AuthContext";
const toggleNavBar = (e, toggleButton, dashboardMain, dashboardNav) => {
    toggleButton.current.classList.toggle('dashboard__button__toggle')
    dashboardMain.current.classList.toggle('dashboard__main__toggle')
    dashboardNav.current.classList.toggle('toggle__dashboard')
}

const handleNavigate = (e, route, navigate, ws) => {
    if(ws){
        ws.close()
    }
    navigate(route)
}

const handleSettings = (setSubSettingsFlag) => {
    setSubSettingsFlag(prev => !prev)
}

const getUserGroups = async(setUserGroups, setMessageGroup, setSelectedGroupId, setJoinedGroups, setIsEmpty) => {
    try{
        const res = await axios.get(`${api}/api/groups`)
        if(res.data.userGroups.length !== 0){
            setMessageGroup(<MessageGroup key={res.data.userGroups[0].id} groupId={res.data.userGroups[0].id}/>)
            setSelectedGroupId(res.data.userGroups[0].id)
        }
        setUserGroups(res.data.userGroups)
        setJoinedGroups(res.data.joinedGroups)
        setIsEmpty(false)
    } catch (e){
        console.error(e)
    }
}

const getMessageGroup = async(e, groupId, setMessageGroup) => {
    try{
        setMessageGroup(<MessageGroup key={groupId} groupId={groupId}/>)
    } catch(e){
        console.error(e)
    }
}

const DashboardNav = ({
    dashboardMain, 
    messageGroup = false, 
    addGroup = false, 
    friends = false, 
    notifications = false, 
    settings = false,
    subSettingsFlag,
    setSubSettingsFlag,
    setMessageGroup = null,
}) => {
    const { ws } = useContext(AuthContext)
    const toggleButton = useRef(null)
    const dashboardNav = useRef(null)

    const selectedGroup = useRef(null)
    const [selectedGroupId, setSelectedGroupId] = useState(null);

    const [ userGroups, setUserGroups ] = useState(null)
    const [ joinedGroups, setJoinedGroups ] = useState(null)

    const [ isEmpty, setIsEmpty ] = useState(true)
    const navigate = useNavigate()

    const groupList = useRef(null)

    const handleGroupClick = (e, groupId, setMessageGroup) => {
        selectedGroup.current?.classList.remove("dashboard__sub__selected")
        setSelectedGroupId(groupId);
        getMessageGroup(e, groupId, setMessageGroup);
    };


    useEffect(() => {
        if(messageGroup){
            getUserGroups(setUserGroups, setMessageGroup, setSelectedGroupId, setJoinedGroups, setIsEmpty)
        }
    }, [])


    useEffect(() => {
        selectedGroup.current?.classList.add("dashboard__sub__selected")

    }, [selectedGroupId])



    return(
        <>
            <nav 
                className="dashboard__nav"
                ref={dashboardNav}
            >
                <ul>
                    <li>
                        <button 
                            className="dashboard__nav__toggle__button"
                            onClick={(e) => toggleNavBar(e, toggleButton, dashboardMain, dashboardNav)}
                            ref={toggleButton}
                        >
                            <FaLongArrowAltLeft className="dashboard__nav__toggle"/>
                        </button>
                    </li>
                    <li>
                        <button onClick={(e) => handleNavigate(e, '/dashboard/groups', navigate, ws)} className={`dashboard__nav__button ${messageGroup? 'dashboard__nav__button__select' : ''}`}>
                            <BiMessageRounded className="dashboard__nav__icons"/>
                        </button>
                    </li>
                    <li>
                        <button onClick={(e) => handleNavigate(e, '/dashboard/add-groups', navigate, ws)} className={`dashboard__nav__button ${addGroup? 'dashboard__nav__button__select' : ''}`}>
                            <IoMdAddCircle className="dashboard__nav__icons"/>
                        </button>
                    </li>
                    <li>
                        <button onClick={(e) => handleNavigate(e, '/dashboard/friends', navigate, ws)} className={`dashboard__nav__button ${friends? 'dashboard__nav__button__select' : ''}`}>
                            <FaUserFriends className="dashboard__nav__icons" />
                        </button>
                    </li>
                    <li>
                        <button onClick={(e) => handleNavigate(e, '/dashboard/notifications', navigate, ws)} className={`dashboard__nav__button  ${notifications? 'dashboard__nav__button__select' : ''}`}>
                            <IoIosNotifications className="dashboard__nav__icons"/>
                        </button>
                    </li>
                    <li>
                        <button onClick={(e) => handleNavigate(e, '/dashboard/settings', navigate, ws)} className={`dashboard__nav__button ${settings? 'dashboard__nav__button__select' : ''}`}>
                            <IoMdSettings className="dashboard__nav__icons"/>
                        </button>
                    </li>
                </ul>
                <div>
                    {messageGroup &&(
                        <>
                            <div>
                            </div>
                            <ul ref={groupList}>
                                {!userGroups? (
                                    <li className="loading__center"><AiOutlineLoading className="loading"/></li>
                                ) : (
                                    <>
                                        <h1>Owned Groups</h1>
                                        {userGroups.map((group, index) => {
                                            return(
                                                <li key={group.id} ref={group.id === selectedGroupId ? selectedGroup : null}>
                                                    <button onClick={(e) => handleGroupClick(e, group.id, setMessageGroup)}>{group.name}</button>
                                                </li>
                                            )
                                        })}
                                    </>
                                )}
                            </ul>
                            <div className="dashboard__joined__groups">
                                <ol>
                                    {!joinedGroups? (
                                        <></>
                                    ) : (
                                        <>
                                            <li><h1>Joined Groups</h1></li>
                                            {joinedGroups.map((group, index) => {
                                                return(
                                                    <li key={group.groupId} ref={group.groupId === selectedGroupId ? selectedGroup : null}>
                                                        <button onClick={(e) => handleGroupClick(e, group.groupId, setMessageGroup)}>{group.name}</button>
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
                    {settings && (
                        <>
                            <div>
                            </div>
                            <ul>
                                <li className={!subSettingsFlag? "dashboard__sub__selected" : ''}>
                                    <button onClick={() => handleSettings(setSubSettingsFlag)}>Change Credentials</button>
                                </li>
                                <li className={subSettingsFlag? "dashboard__sub__selected" : ''}>
                                    <button onClick={() => handleSettings(setSubSettingsFlag)}>Logout</button>
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