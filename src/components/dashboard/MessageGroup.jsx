import { useContext, useEffect, useState } from 'react'
import { IoMdSend } from 'react-icons/io'
import MessageBlock from './/MessageBlock'
import axios from 'axios'
import api from '../../../config'
import { AuthContext } from '../../context/AuthContext'
import DOMPurify from 'dompurify'
import Loading from '../Loading'
const handleInput = (e, setInput) => {
  setInput(e.target.value)
}

const handleSubmit = async (e, groupId, message, _sadwv, ws) => {
  e.preventDefault()
  try {
    if(ws.readyState === 1){
      const payload = await _sadwv()
      const sanitizedMessage = DOMPurify.sanitize(message)
      const res = await axios.post(
        `${api}/api/groups/${groupId}/messages`,
        {
          message: sanitizedMessage,
        },
        {
          headers: {
            _sadwv: payload,
          },
        }
      )
    }
  } catch (e) {
    console.error(e)
  }
}

const getGroupMessages = async (groupId, setGroupMessages, userId, _sadwv, setIsLoading) => {
  try {
    const payload = await _sadwv()
    const res = await axios.get(`${api}/api/groups/${groupId}/messages`, {
      headers: {
        _sadwv: payload,
      },
    })

    const messages = res.data.messages.reverse()
    setGroupMessages(
      messages.map((message) => (
        <MessageBlock
          key={message.id}
          message={message.message}
          className={
            userId === message.userId ? 'dashboard__user__message' : ''
          }
          username={message.user.username}
        />
      ))
    )
    setIsLoading(false)
  } catch (e) {
    console.error(e)
  }
}

const sendMessage = async (
  e,
  ws,
  userId,
  message,
  setMessage,
  username,
  groupId,
  _sadwv
) => {
  e.preventDefault()
  if (ws) {
    ws.send(
      JSON.stringify({
        type: 'Message',
        message: message,
        groupId: groupId,
      })
    )

    handleSubmit(e, groupId, message, _sadwv, ws)
  }

  setMessage('')
}

const MessageGroup = ({ groupId }) => {
  const { userId, username, ws, setWs, _sadwv } = useContext(AuthContext)
  const [message, setMessage] = useState('')
  const [groupMessages, setGroupMessages] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {

    const delay = async() => {
      await getGroupMessages(groupId, setGroupMessages, userId, _sadwv, setIsLoading)
      const payload = await _sadwv() //Add the csrf later
      let socket
      if (ws) {
        ws.close()
        setWs(null)
      }
      socket = new WebSocket('ws://localhost:8080')
      
      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            type: 'Connect',
            groupId: groupId,
            token: payload //csrf for later simulate headers
          })
        )
      }

      socket.onmessage = (e) => {
        const res = JSON.parse(e.data)
        const resUserId = res.userId
        const username = res.username
        const message = res.message
        const sanitizedMessage = DOMPurify.sanitize(message)
        setGroupMessages((prev) => {
          const newGroupMessages = [
            <MessageBlock
              key={crypto.randomUUID()}
              message={sanitizedMessage}
              className={userId === resUserId ? 'dashboard__user__message' : ''}
              username={username}
            />,
            ...prev,
          ]

          return newGroupMessages
        })
      }

      socket.onclose = () => {
        // console.log('Socket Closed')
      }

      setWs(socket)
  }
    delay()

    return () => {
      if (ws) {
        ws.close()
      }
    }
  }, [])

  return (
    <>
      {isLoading? (
      <>
        <Loading />
      </>
      ) : (
      <section className="dashboard__messages">
        <form>
          <textarea
            name="message"
            id=""
            onChange={(e) => handleInput(e, setMessage)}
            value={message}
            className="dashboard__input"
          ></textarea>
          <button
            onClick={(e) =>
              sendMessage(
                e,
                ws,
                userId,
                message,
                setMessage,
                username,
                groupId,
                _sadwv
              )
            }
          >
            <IoMdSend />
          </button>
        </form>
        {groupMessages.map((message) => {
          return message
        })}
      </section>
    )}
    </>
  )
}

export default MessageGroup
