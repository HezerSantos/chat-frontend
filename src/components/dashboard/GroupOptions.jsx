import '../../assets/styles/GroupOptions.css'
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import AddMember from '../Groups/AddMember';
import RemoveMember from '../Groups/RemoveMember';
import defaultProfile from '../../assets/images/defaultProfile.webp'
import { useEffect, useState } from 'react';
const users = [
    {
        username: "Bob",
        id: 3,
        profilePicture: defaultProfile
    },
    {
        username: "Jane",
        id: 2,
        profilePicture: defaultProfile
    },
    {
        username: "Frank",
        id: 5,
        profilePicture: defaultProfile
    },
    {
        username: "Camilla",
        id: 1,
        profilePicture: defaultProfile
    },
    {
        username: "Selena",
        id: 32,
        profilePicture: defaultProfile
    },
    {
        username: "Demarcus",
        id: 33,
        profilePicture: defaultProfile
    },
    {
        username: "Lamar",
        id: 23,
        profilePicture: defaultProfile
    },
    {
        username: "Jackson",
        id: 53,
        profilePicture: defaultProfile
    },
    {
        username: "Rebecca",
        id: 31,
        profilePicture: defaultProfile
    },
    {
        username: "Clarence",
        id: 73,
        profilePicture: defaultProfile
    },
    {
        username: "Selener",
        id: 83,
        profilePicture: defaultProfile
    },
    {
        username: "Beaner",
        id: 311,
        profilePicture: defaultProfile
    },
    {
        username: "Justin",
        id: 233,
        profilePicture: defaultProfile
    }
]
function chunkArray(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }

const handleNext = (setCurrentPage, addMembers) => {
    setCurrentPage(prev => {
        prev += 1
        if(prev >= addMembers.length){
            return addMembers.length - 1
        }
        return prev
    })
}

const handlePrev = (setCurrentPage, addMembers) => {
    setCurrentPage(prev => {
        prev -= 1
        if(prev < 0){
            return 0
        }
        return prev
    })
}


// {groupId, addMembers, removemMembers, currentAddMembers}
const GroupOptions = () => {
      const [ addMembers, setAddMembers ] = useState([])
      const [ currentAddMembers, setCurrentAddMembers ] = useState([])
      const [ currentPage, setCurrentPage ] = useState(null)
      const [ removeMembers, setRemoveMembers ] = useState([])

      useEffect(() => {
        const usersSplit = chunkArray(users, 5)
        setAddMembers(usersSplit)
        setCurrentPage(0)
      }, [])

      useEffect(() => {
        if(typeof currentPage === 'number'){
            setCurrentAddMembers(addMembers[currentPage])
        }
      }, [currentPage])

    return(
        <>
            <section className="group__options">
                <div className="options__header">
                    <form>
                        <div>
                            <label htmlFor="">
                                Change Name
                            </label>
                            <div>
                                <input type="text" />
                                <button><FaArrowRight /></button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="member">
                    <h1>Add Member</h1>
                    {currentAddMembers.map(user => {
                        return(
                            <AddMember 
                                key={`Member${user.id}`}
                                userId={user.id}
                                username={user.username}
                                profilePicture={user.profilePicture}
                            />
                        )
                    })}
                    <div className='button__container'>
                        <button onClick={() => handlePrev(setCurrentPage, addMembers)}><FaArrowLeft /></button>
                        <button onClick={() => handleNext(setCurrentPage, addMembers)}><FaArrowRight /></button>
                    </div>
                </div>
                <div className="member">
                    <h1>Remove Member</h1>
                    <RemoveMember />
                    <RemoveMember />
                    <RemoveMember />
                    <RemoveMember />
                    <RemoveMember />
                </div>
                <section className='delete__section'>
                    <button className='delete__button'>Delete Group</button>
                </section>
            </section>
        </>
    )
}

export default GroupOptions