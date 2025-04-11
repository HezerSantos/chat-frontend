import { useContext, useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import MessageBlock from './/MessageBlock';
import axios from "axios";
import api from '../../../config'
import { AuthContext } from "../../context/AuthContext";
import DOMPurify from 'dompurify';
const handleInput = (e, setInput) => {
    setInput(e.target.value)
}

const handleSubmit = async(e, groupId, message) => {
    e.preventDefault()
    try{
        const sanitizedMessage = DOMPurify.sanitize(message)
        const res = await axios.post(`${api}/api/groups/${groupId}/messages`, {
            message: sanitizedMessage
        })
    } catch(e){
        console.error(e)
    }
}

const getGroupMessages = async(groupId, setGroupMessages, userId) => {
    try{
        const res = await axios.get(`${api}/api/groups/${groupId}/messages`)

        const messages = res.data.messages.reverse()
        setGroupMessages(messages.map(message => (
            <MessageBlock 
                key={message.id} 
                message={message.message} 
                className={userId === message.userId? "dashboard__user__message" : ""}
                username={message.user.username}
            />
        )));

    }catch(e){
        console.error(e)
    }
}

const sendMessage = async(e, ws, userId, message, setMessage, username, groupId) => {
    e.preventDefault()
    if(ws){

        // const { id } = await handleSubmit(e, groupId, message)
        ws.send(JSON.stringify({
            type: "Message",
            id: userId,
            message: message,
            username: username,
            groupId: groupId,
            messageId: crypto.randomUUID()
        }))

        handleSubmit(e, groupId, message)

    }

    setMessage("")
}

const MessageGroup = ({groupId}) => {
    const { userId, username, ws, setWs, getRefresh } = useContext(AuthContext)
    const [ message, setMessage ] = useState("")
    const [ groupMessages, setGroupMessages ] = useState([])

    useEffect(() => {
        let socket;
        if(ws){
            ws.close()
        }
        socket = new WebSocket('ws://localhost:8080')

        socket.onopen = () => {
            console.log("Connected to Websocket")
            socket.send(JSON.stringify({
                type: "Connect",
                id: userId,
                username: username,
                groupId: groupId
            }))
        }

        socket.onmessage = (e) => { 
            const res = JSON.parse(e.data)
            const resUserId = res.userId
            const username = res.username
            const resMessage = res.message
            const resGroupId = res.groupId
            const resMessageId = res.messageId
            
            if(groupId === resGroupId){
                const sanitizedMessage = DOMPurify.sanitize(resMessage)
                setGroupMessages(prev => {
                    const newGroupMessages = [<MessageBlock 
                        key={resMessageId} 
                        message={sanitizedMessage} 
                        className={userId === resUserId? "dashboard__user__message" : ""}
                        username={username}
                    />, ...prev]
    
                    return newGroupMessages
                })
            }
        
        }

        socket.onclose = () => {
            console.log('Socket Closed')
        }

        setWs(socket)
        
        return () => {
            if(ws){
                socket.close()
            }
        }
    }, [])

    useEffect(() => {
        getGroupMessages(groupId, setGroupMessages, userId)
    }, [groupId])

    return(
        <section className='dashboard__messages'>
            <form>
                <textarea 
                    name="message" 
                    id=""
                    onChange={(e) => handleInput(e, setMessage)}
                    value={message}  
                    className='dashboard__input'
                ></textarea>
                <button onClick={(e) => sendMessage(e, ws, userId, message, setMessage, username, groupId, handleSubmit)}><IoMdSend /></button>
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