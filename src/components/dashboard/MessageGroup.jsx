import { useContext, useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import MessageBlock from './/MessageBlock';
import axios from "axios";
import api from '../../../config'
import { AuthContext } from "../../context/AuthContext";
const handleInput = (e, setInput) => {
    setInput(e.target.value)
}

const handleSubmit = async(e, groupId, setMessage) => {
    e.preventDefault()
    try{
        const res = await axios.post(`${api}/api/groups/${groupId}/messages`, {
            message: e.target.message.value
        })

        setMessage("")
    } catch(e){
        console.error(e)
    }
}

const getGroupMessages = async(groupId, setGroupMessages, userId) => {
    try{
        const res = await axios.get(`${api}/api/groups/${groupId}/messages`)

        const messages = res.data.messages

        setGroupMessages(messages.map(message => (
            <MessageBlock 
                key={message.id} 
                message={message.message} 
                className={userId === message.userId? "dashboard__user__message" : ""}
            />
        )).reverse());

    }catch(e){
        console.error(e)
    }
}

const MessageGroup = ({groupId}) => {
    const { userId } = useContext(AuthContext)
    const [ message, setMessage ] = useState("")
    const [ groupMessages, setGroupMessages ] = useState([])

    useEffect(() => {
        getGroupMessages(groupId, setGroupMessages, userId)
    }, [groupId])

    useEffect(() => {
    }, [groupMessages])
    return(
        <section className='dashboard__messages'>
            <form onSubmit={(e) => handleSubmit(e, groupId, setMessage)}>
                <textarea 
                    name="message" 
                    id=""
                    onChange={(e) => handleInput(e, setMessage)}
                    value={message}  
                    className='dashboard__input'
                ></textarea>
                <button><IoMdSend /></button>
            </form>
            {groupMessages.map(message => {
                return(
                    message
                )
            })}
        </section>
    )
}

export default MessageGroup