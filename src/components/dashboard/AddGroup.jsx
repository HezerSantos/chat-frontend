import '../../assets/styles/AddGroup.css'
import api from '../../../config'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { AiOutlineLoading } from "react-icons/ai";

const handleSubmit = async(e, setGroupName, setIsLoading, setErrors) => {
    e.preventDefault()
    try{
        setIsLoading(true)
        const res = await axios.post(`${api}/api/groups`, {
            groupName: e.target.groupName.value
        })

        setGroupName("")
        console.log(res)
        setIsLoading(false)
        setErrors(null)
    } catch(e){
        setIsLoading(false)
        const errors = e.response.data.errors.map(error => error.msg)
        setErrors(errors)
    }
}

const handleInput = (e, setInput) => {
    setInput(e.target.value)
}
const AddGroup = () => {
    const [ groupName, setGroupName ] = useState("")
    const [isLoading, setIsLoading ] = useState(false)
    const [ errors, setErrors ] = useState(null)

    useEffect(() => {
        console.log(errors)
    }, [errors])
    return(
        <>
            {!isLoading? (
                        <form className='add__group' onSubmit={(e) => handleSubmit(e, setGroupName, setIsLoading, setErrors)}>
                        <div>
                            <label htmlFor="group__name">Create Group</label>
                            <div>
                                <input
                                    type="text" 
                                    id='group__name' 
                                    name='groupName'
                                    value={groupName}
                                    onChange={(e) => handleInput(e, setGroupName)}
                                    className={errors? 'error__border' : ''}
                                />                                    
                                <button type='submit'>
                                    Create
                                </button>
                            </div>
                            {errors && (
                                errors.map((error, index) => {
                                    return(
                                        <p key={index} className='error'>{error}*</p>
                                    )
                                })
                            )}
                        </div>
                    </form>
            ) : (
                <section className='loading__screen grid__loading'>
                    <AiOutlineLoading className='loading'/>
                </section>
            )}
        </>
    )
}

export default AddGroup