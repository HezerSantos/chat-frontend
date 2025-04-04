import { CgProfile } from "react-icons/cg";
import { IoMdAddCircle } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useRef } from "react";
import React from "react";

const toggleNavBar = (e, toggleButton, dashboardMain, dashboardNav) => {
    toggleButton.current.classList.toggle('dashboard__button__toggle')
    dashboardMain.current.classList.toggle('dashboard__main__toggle')
    dashboardNav.current.classList.toggle('toggle__dashboard')
}


const DashboardNav = ({dashboardMain}) => {
    const toggleButton = useRef(null)
    const dashboardNav = useRef(null)
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
                        <CgProfile className="dashboard__nav__icons"/>
                    </li>
                    <li>
                        <IoMdAddCircle className="dashboard__nav__icons"/>
                    </li>
                    <li>
                        <FaUserFriends className="dashboard__nav__icons" />
                    </li>
                    <li>
                        <IoIosNotifications className="dashboard__nav__icons"/>
                    </li>
                    <li>
                        <IoMdSettings className="dashboard__nav__icons"/>
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