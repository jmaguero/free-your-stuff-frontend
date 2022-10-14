import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectMessages } from "../store/user/selectors"
import { fetchMessages } from "../store/user/thunks"

export const InboxPage = () => {
  const dispatch = useDispatch()
  const messages = useSelector(selectMessages)
  const [message, setMessage] = useState("")
  const [msgs, setMsgs] = useState([])


  useEffect(() => {
    dispatch(fetchMessages())
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setMsgs([...msgs, message])
    setMessage("")
  }

  //TODO create loading component for each page!
  if (!messages) {
    return (<div>Loading...</div>)
  }

  return (
    <div style={{ display: "flex", margin: "10px" }}>
      <div>
        <h2>Chats</h2>
        <h4>Chat</h4>
        <h4>Chat</h4>
        <h4>Chat</h4>
        <h4>Chat</h4>
        <h4>Chat</h4>
        <h4>Chat</h4>
        <h4>Chat</h4>
      </div>
      <div>
        <div style={{ height: "90%" }}>{msgs.map((m, index) => <p key={index}>{m}</p>)}</div>
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Insert a messagge" />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}