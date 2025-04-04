import { useRef } from 'react'
import '../assets/styles/Dashboard.css'
import DashboardNav from '../components/dashboard/DashboardNav'
const Dashboard = () => {
    const dashboardMain = useRef(null)
    return(
        <>
            <main className='dashboard__main' ref={dashboardMain}>
                <DashboardNav dashboardMain={dashboardMain}/>
            </main>
        </>
    )
}

export default Dashboard