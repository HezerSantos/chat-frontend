import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import MessageBlock from './/MessageBlock';

const handleInput = (e, setInput) => {
    setInput(e.target.value)
}

const MessageGroup = () => {
    const [ message, setMessage ] = useState("")
    return(
        <section className='dashboard__messages'>
            <form>
                <textarea 
                    name="" 
                    id=""
                    onChange={(e) => handleInput(e, setMessage)}
                    value={message}  
                    className='dashboard__input'
                ></textarea>
                <button><IoMdSend /></button>
            </form>
            <MessageBlock />
        </section>
    )
}

export default MessageGroup