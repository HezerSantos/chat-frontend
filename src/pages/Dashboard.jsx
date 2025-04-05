import { useRef, useState } from 'react'
import '../assets/styles/Dashboard.css'
import DashboardNav from '../components/dashboard/DashboardNav'
import MessageGroup from '../components/dashboard/MessageGroup'

const Dashboard = () => {
    const dashboardMain = useRef(null)
    const [ dashboardFlags, setDashboardFlags ] = useState(new Map([
        ['messageBoard', true],
        ['addGroup', false],
        ['friends', false],
        ['notifications', false],
        ['setting', false]
    ]))
    return(
        <>
            <main className='dashboard__main' ref={dashboardMain}>
                <DashboardNav dashboardMain={dashboardMain} setDashboardFlags={setDashboardFlags}/>
                <MessageGroup />
            </main>
        </>
    )
}

export default Dashboard