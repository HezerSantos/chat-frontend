import { CgProfile } from "react-icons/cg";
import { IoMdAddCircle } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { BiMessageRounded } from "react-icons/bi";
import { useRef } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const toggleNavBar = (e, toggleButton, dashboardMain, dashboardNav) => {
    toggleButton.current.classList.toggle('dashboard__button__toggle')
    dashboardMain.current.classList.toggle('dashboard__main__toggle')
    dashboardNav.current.classList.toggle('toggle__dashboard')
}

const handleNavigate = (e, route, navigate) => {
    navigate(route)
}
const DashboardNav = ({dashboardMain, messageGroup = false, addGroup = false, friends = false, notifications = false, settings = false}) => {
    const toggleButton = useRef(null)
    const dashboardNav = useRef(null)
    const navigate = useNavigate()
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
                        <button onClick={(e) => handleNavigate(e, '/dashboard/message-groups', navigate)} className={`dashboard__nav__button ${messageGroup? 'dashboard__nav__button__select' : ''}`}>
                            <BiMessageRounded className="dashboard__nav__icons"/>
                        </button>
                    </li>
                    <li>
                        <button onClick={(e) => handleNavigate(e, '/dashboard/add-groups', navigate)} className={`dashboard__nav__button ${addGroup? 'dashboard__nav__button__select' : ''}`}>
                            <IoMdAddCircle className="dashboard__nav__icons"/>
                        </button>
                    </li>
                    <li>
                        <button onClick={(e) => handleNavigate(e, '/dashboard/friends', navigate)} className={`dashboard__nav__button ${friends? 'dashboard__nav__button__select' : ''}`}>
                            <FaUserFriends className="dashboard__nav__icons" />
                        </button>
                    </li>
                    <li>
                        <button onClick={(e) => handleNavigate(e, '/dashboard/notifications', navigate)} className={`dashboard__nav__button  ${notifications? 'dashboard__nav__button__select' : ''}`}>
                            <IoIosNotifications className="dashboard__nav__icons"/>
                        </button>
                    </li>
                    <li>
                        <button onClick={(e) => handleNavigate(e, '/dashboard/settings', navigate)} className={`dashboard__nav__button ${settings? 'dashboard__nav__button__select' : ''}`}>
                            <IoMdSettings className="dashboard__nav__icons"/>
                        </button>
                    </li>
                </ul>
                <div>
                    <div>

                    </div>
                    <ul>
                        <li>Group One</li>
                        <li>Group Two</li>
                        <li>Group Three</li>
                    </ul>
                    <ul className="dashboard__group__options">
                        <li>Group Options</li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default DashboardNav