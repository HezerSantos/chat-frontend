import NotificationElementP from '../Notifications/NotificationElementP'
import { useEffect, useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
const handlePendingNext = (
  setCurrentPendingPage,
  setCurrentPending,
  totalPendingPages,
  setPendingNext,
  setPendingPrev,
  pending
) => {
  setCurrentPendingPage((prev) => {
    const newCurrentPendingPage = prev + 1
    if (newCurrentPendingPage === totalPendingPages) {
      setPendingNext(false)
    }
    if (newCurrentPendingPage > 0) {
      setPendingPrev(true)
    }
    const start = 8 * newCurrentPendingPage
    const end = 8 * (newCurrentPendingPage + 1)

    setCurrentPending(pending.slice(start, end))

    return newCurrentPendingPage
  })
}

const handlePendingPrev = (
  setCurrentPendingPage,
  setCurrentPending,
  totalPendingPages,
  setPendingNext,
  setPendingPrev,
  pending
) => {
  setCurrentPendingPage((prev) => {
    const newCurrentPendingPage = prev - 1
    if (newCurrentPendingPage === 0) {
      setPendingPrev(false)
      setPendingNext(true)
    }
    if (newCurrentPendingPage > 0) {
      setPendingNext(true)
    }
    const start = 8 * newCurrentPendingPage
    const end = 8 * (newCurrentPendingPage + 1)

    setCurrentPending(pending.slice(start, end))

    return newCurrentPendingPage
  })
}

const Pending = ({ users, isLoading }) => {
  const [totalPendingPages, setTotalPendingPages] = useState()
  const [currentPendingPage, setCurrentPendingPage] = useState(0)
  const [currentPending, setCurrentPending] = useState([])
  const [pendingNext, setPendingNext] = useState(false)
  const [pendingPrev, setPendingPrev] = useState(false)

  useEffect(() => {
    const pendingPages = Math.floor(users.length / 8)

    setTotalPendingPages(pendingPages)

    setCurrentPending(users.slice(0, 8))
  }, [users])

  useEffect(() => {
    if (totalPendingPages > 0) {
      setPendingNext(true)
    }
  }, [totalPendingPages])

  return (
    <>
      {!isLoading ? (
        <section className="notifications__page">
          <section className="pending">
            <h1>Pending Requests</h1>
            <div className="notification__container">
              {currentPending.map((user) => {
                return (
                  <NotificationElementP
                    key={user.receiverId}
                    username={user.receiver.username}
                    profilePicture={user.profilePicture}
                    userId={user.receiverId}
                  />
                )
              })}
            </div>
            <div className="notifications__buttons">
              {pendingPrev && (
                <button
                  className="prev"
                  onClick={(e) =>
                    handlePendingPrev(
                      setCurrentPendingPage,
                      setCurrentPending,
                      totalPendingPages,
                      setPendingNext,
                      setPendingPrev,
                      pending
                    )
                  }
                >
                  prev
                </button>
              )}
              {pendingNext && (
                <button
                  className="next"
                  onClick={(e) =>
                    handlePendingNext(
                      setCurrentPendingPage,
                      setCurrentPending,
                      totalPendingPages,
                      setPendingNext,
                      setPendingPrev,
                      pending
                    )
                  }
                >
                  next
                </button>
              )}
            </div>
          </section>
        </section>
      ) : (
        <section className="loading__screen grid__loading">
          <AiOutlineLoading className="loading" />
        </section>
      )}
    </>
  )
}

export default Pending
