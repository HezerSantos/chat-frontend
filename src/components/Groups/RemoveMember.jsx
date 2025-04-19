import defaultProfile from '../../assets/images/defaultProfile.webp'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
const RemoveMember = ({ userId, username, profilePicture, groupId }) => {
  const { _sadwv } = useContext(AuthContext)
  const [ isDisabled, setIsDisabled ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ buttonText, setButtonText ] = useState("Remove")
  return (
    <>
      <div className="user__row">
        <div>
          <img src={profilePicture ? profilePicture : defaultProfile} alt="" />
          <p>@{username}</p>
        </div>
        <button 
          disabled={isDisabled} 
          onClick={() => handleAddMember(groupId, userId, _sadwv, setIsDisabled, setIsLoading, setButtonText)}
        >
          {isLoading? (
            <AiOutlineLoading className='button__loading'/>
          ) : (
            <>
              {buttonText}
            </>
          )}
        </button>
      </div>
    </>
  )
}

export default RemoveMember
