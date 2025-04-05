import { useRef, useState } from 'react'
import '../../assets/styles/Dashboard.css'
import DashboardNav from '../../components/dashboard/DashboardNav'
import Logout from '../../components/settings/Logout'
import ChangeCredentials from '../../components/settings/ChangeCredentials'
const DashboardSettings = () => {
    const dashboardMain = useRef(null)
    const [subSettingsFlag, setSubSettingsFlag ] = useState(false)
    return(
        <>
            <main className='dashboard__main' ref={dashboardMain}>
                <DashboardNav 
                    dashboardMain={dashboardMain} 
                    settings={true}
                    subSettingsFlag={subSettingsFlag}
                    setSubSettingsFlag={setSubSettingsFlag}
                />
                {!subSettingsFlag && (
                    <ChangeCredentials />
                )}
                {subSettingsFlag && (
                    <Logout />
                )}
            </main>
        </>
    )
}

export default DashboardSettings