import { useRef, useState } from 'react'
import '../assets/styles/Dashboard.css'
import DashboardNav from '../components/dashboard/DashboardNav'
import { IoMdSend } from "react-icons/io";
import MessageBlock from '../components/dashboard/MessageBlock';

const handleInput = (e, setInput) => {
    setInput(e.target.value)
}
const Dashboard = () => {
    const [ message, setMessage ] = useState("")
    const dashboardMain = useRef(null)
    return(
        <>
            <main className='dashboard__main' ref={dashboardMain}>
                <DashboardNav dashboardMain={dashboardMain}/>
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
            </main>
        </>
    )
}

export default Dashboard