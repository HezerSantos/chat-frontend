import '../../assets/styles/AddGroup.css'
import api from '../../../config'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { AuthContext } from '../../context/AuthContext'
const handleSubmit = async (e, setGroupName, setIsLoading, setErrors, _sadwv) => {
  e.preventDefault()
  try {
    setIsLoading(true)
    const payload = _sadwv()
    const res = await axios.post(`${api}/api/groups`, {
      groupName: e.target.groupName.value,
    }, {
      headers: {
        _sadwv: payload,
      }
    })

    setGroupName('')
    setIsLoading(false)
    setErrors(null)
  } catch (e) {
    setIsLoading(false)
    const errors = e.response.data.errors.map((error) => error.msg)
    setErrors(errors)
  }
}

const handleInput = (e, setInput) => {
  setInput(e.target.value)
}
const AddGroup = () => {
  const { _sadwv } = useContext(AuthContext)
  const [groupName, setGroupName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState(null)

  return (
    <>
      {!isLoading ? (
        <form
          className="add__group"
          onSubmit={(e) =>
            handleSubmit(e, setGroupName, setIsLoading, setErrors, _sadwv)
          }
        >
          <div>
            <label htmlFor="group__name">Create Group</label>
            <div>
              <input
                type="text"
                id="group__name"
                name="groupName"
                value={groupName}
                onChange={(e) => handleInput(e, setGroupName)}
                className={errors ? 'error__border' : ''}
              />
              <button type="submit">Create</button>
            </div>
            {errors &&
              errors.map((error, index) => {
                return (
                  <p key={index} className="error">
                    {error}*
                  </p>
                )
              })}
          </div>
        </form>
      ) : (
        <section className="loading__screen grid__loading">
          <AiOutlineLoading className="loading" />
        </section>
      )}
    </>
  )
}

export default AddGroup
