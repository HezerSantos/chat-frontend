import { useEffect, useState } from 'react'
import FriendElement from './FriendElement'
import axios from 'axios'
import api from '../../../config'
import { AiOutlineLoading } from 'react-icons/ai'

const MyFriends = ({ myFriends, myFriendsLoading }) => {
  return (
    <>
      {!myFriendsLoading ? (
        <section className="my__friends">
          <h1>My Friends</h1>
          {myFriends.map((friend) => {
            return (
              <FriendElement
                key={friend.friendId}
                userId={friend.friendId}
                username={friend.friend.username}
                profilePicture={friend.friend.profilePicture}
              />
            )
          })}
        </section>
      ) : (
        <section className="loading__screen grid__loading">
          <AiOutlineLoading className="loading" />
        </section>
      )}
    </>
  )
}

export default MyFriends
