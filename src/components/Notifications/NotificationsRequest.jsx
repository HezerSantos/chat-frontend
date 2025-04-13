import NotificationElementR from '../Notifications/NotificationElementR'
import { useEffect, useState } from 'react'
import { AiOutlineLoading } from "react-icons/ai"
const handleRequestNext = (setCurrentRequestPage, setCurrentRequest, totalRequestPages, setRequestNext, setRequestPrev, request) => {
    setCurrentRequestPage(prev => {
        const newCurrentRequestPage = prev + 1
        if(newCurrentRequestPage === totalRequestPages){
            setRequestNext(false)
        }
        if(newCurrentRequestPage > 0){
            setRequestPrev(true)
        }
        const start = 8 * newCurrentRequestPage
        const end = 8 * (newCurrentRequestPage + 1)

        setCurrentRequest(request.slice(start, end))

        return newCurrentRequestPage
    })
}

const handleRequestPrev = (setCurrentRequestPage, setCurrentRequest, totalRequestPages, setRequestNext, setRequestPrev, request) => {
    setCurrentRequestPage(prev => {
        const newCurrentRequestPage = prev - 1
        if(newCurrentRequestPage === 0){
            setRequestPrev(false)
            setRequestNext(true)
        }
        if(newCurrentRequestPage > 0){
            setRequestNext(true)
        }
        const start = 8 * newCurrentRequestPage
        const end = 8 * (newCurrentRequestPage + 1)

        setCurrentRequest(request.slice(start, end))

        return newCurrentRequestPage
    })
}

const Request = ({users, isLoading}) => {
    const [ totalRequestPages, setTotalRequestPages ] = useState()
    const [ currentRequestPage, setCurrentRequestPage ] = useState(0)
    const [ currentRequest, setCurrentRequest ] = useState([])
    const [ requestNext, setRequestNext ] = useState(false)
    const [ requestPrev, setRequestPrev ] = useState(false)

    useEffect(() => {
        const requestPages = Math.floor(users.length / 8)

        setTotalRequestPages(requestPages)

        setCurrentRequest(users.slice(0, 8))
    }, [])



    useEffect(() => {
        if(totalRequestPages > 0){
            setRequestNext(true)
        }
    }, [totalRequestPages])
    return(
        <>
            {!isLoading? (
                <section className="notifications__page">
                    <section className='requests'>
                        <h1>Received Requests</h1>
                        <div className='notification__container'>
                            {currentRequest.map(user => {
                                return (
                                    <NotificationElementR 
                                        key={user.senderId}
                                        username={user.sender.username}
                                        profilePicture={user.profilePicture}
                                        userId={user.senderId}
                                    />
                                )
                            })}
                        </div>
                        <div className='notifications__buttons'>
                            {requestPrev && (
                                <button className='prev' onClick={(e => handleRequestPrev(setCurrentRequestPage, setCurrentRequest, totalRequestPages, setRequestNext, setRequestPrev, request))}>prev</button>
                            )}
                            {requestNext && (
                                <button className='next' onClick={(e) => handleRequestNext(setCurrentRequestPage, setCurrentRequest, totalRequestPages, setRequestNext, setRequestPrev, request)}>next</button>
                            )}
                        </div>
                    </section>
                </section>
            ) : (
                <section className='loading__screen grid__loading'>
                    <AiOutlineLoading className='loading' />
                </section>
            )}
        </>
    )
}

export default Request