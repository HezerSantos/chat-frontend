import NotificationElementP from '../Notifications/NotificationElementP'
import { useEffect, useState } from 'react'

const handlePendingNext = (setCurrentPendingPage, setCurrentPending, totalPendingPages, setPendingNext, setPendingPrev, pending) => {
    setCurrentPendingPage(prev => {
        const newCurrentPendingPage = prev + 1
        if(newCurrentPendingPage === totalPendingPages){
            setPendingNext(false)
        }
        if(newCurrentPendingPage > 0){
            setPendingPrev(true)
        }
        const start = 8 * newCurrentPendingPage
        const end = 8 * (newCurrentPendingPage + 1)

        setCurrentPending(pending.slice(start, end))

        return newCurrentPendingPage
    })
}

const handlePendingPrev = (setCurrentPendingPage, setCurrentPending, totalPendingPages, setPendingNext, setPendingPrev, pending) => {
    setCurrentPendingPage(prev => {
        const newCurrentPendingPage = prev - 1
        if(newCurrentPendingPage === 0){
            setPendingPrev(false)
            setPendingNext(true)
        }
        if(newCurrentPendingPage > 0){
            setPendingNext(true)
        }
        const start = 8 * newCurrentPendingPage
        const end = 8 * (newCurrentPendingPage + 1)

        setCurrentPending(pending.slice(start, end))

        return newCurrentPendingPage
    })
}

const Pending = ({users}) => {
    const [ totalPendingPages, setTotalPendingPages ] = useState()
    const [ currentPendingPage, setCurrentPendingPage ] = useState(0)
    const [ currentPending, setCurrentPending ] = useState([])
    const [ pendingNext, setPendingNext ] = useState(false)
    const [ pendingPrev, setPendingPrev ] = useState(false)

    const [ pending, setPending ] = useState(users)
    
    useEffect(() => {

        const pendingPages = Math.floor(pending.length / 8)

        setTotalPendingPages(pendingPages)

        setCurrentPending(pending.slice(0, 8))
    }, [])

    useEffect(() => {
        if(totalPendingPages > 0){
            setPendingNext(true)
        }
    }, [totalPendingPages])

    return(
        <section className="notifications__page">
            <section className='pending'>
                <h1>Pending</h1>
                <div className='notification__container'>
                    {currentPending.map(user => {
                        return (
                            <NotificationElementP 
                                key={user.userId}
                                username={user.username}
                                profilePicture={user.profilePicture}
                            />
                        )
                    })}
                </div>
                <div className='notifications__buttons'>
                    {pendingPrev && (
                        <button className='prev' onClick={(e => handlePendingPrev(setCurrentPendingPage, setCurrentPending, totalPendingPages, setPendingNext, setPendingPrev, pending))}>prev</button>
                    )}
                    {pendingNext && (
                        <button className='next' onClick={(e) => handlePendingNext(setCurrentPendingPage, setCurrentPending, totalPendingPages, setPendingNext, setPendingPrev, pending)}>next</button>
                    )}
                </div>
            </section>
        </section>
    )
}

export default Pending