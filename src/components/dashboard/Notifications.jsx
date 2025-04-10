import '../../assets/styles/Notifications.css'
import defaultProfile from '../../assets/images/defaultProfile.webp'
import NotificationElementP from '../Notifications/NotificationElementP'
import NotificationElementR from '../Notifications/NotificationElementR'
import { useEffect, useState } from 'react'
import Pending from '../Notifications/NotificationsPending'
import Request from '../Notifications/NotificationsRequest'
const users = [
    {
        username: "Bob",
        userId: 3,
        profilePicture: defaultProfile
    },
    {
        username: "Jane",
        userId: 2,
        profilePicture: defaultProfile
    },
    {
        username: "Frank",
        userId: 5,
        profilePicture: defaultProfile
    },
    {
        username: "Camilla",
        userId: 1,
        profilePicture: defaultProfile
    },
    {
        username: "Selena",
        userId: 32,
        profilePicture: defaultProfile
    },
    {
        username: "Demarcus",
        userId: 33,
        profilePicture: defaultProfile
    },
    {
        username: "Lamar",
        userId: 23,
        profilePicture: defaultProfile
    },
    {
        username: "Jackson",
        userId: 53,
        profilePicture: defaultProfile
    },
    {
        username: "Rebecca",
        userId: 31,
        profilePicture: defaultProfile
    },
    {
        username: "Clarence",
        userId: 73,
        profilePicture: defaultProfile
    },
    {
        username: "Selener",
        userId: 83,
        profilePicture: defaultProfile
    },
    {
        username: "Beaner",
        userId: 311,
        profilePicture: defaultProfile
    },
    {
        username: "Justin",
        userId: 233,
        profilePicture: defaultProfile
    }
]





const Notifications = ({notificationPageFlag}) => {
    return(
        <>
            {notificationPageFlag? (
                <Pending  users={users}/>
            ) : (
                <Request users={users} />
            )}
        </>
    )
}

export default Notifications