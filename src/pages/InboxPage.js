import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectMessages } from "../store/user/selectors"
import { fetchMessages, postMessage } from "../store/user/thunks"

export const InboxPage = () => {
  const dispatch = useDispatch()
  const messages = useSelector(selectMessages)
  const [chatId, setChatId] = useState(null)
  const [message, setMessage] = useState("")
  const filteredConversation = chatId && [...messages]?.filter(c => c.id === chatId)

  useEffect(() => {
    dispatch(fetchMessages());
  }, [])

  useEffect(() => {
    const interval = setInterval(() => dispatch(fetchMessages()), 10000);
    return () => { clearInterval(interval) }
  }, [dispatch])


  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(postMessage(message, chatId, null))
    setMessage("")
  }

  //TODO create loading component for each page!
  if (!messages) {
    return (<div>Loading...</div>)
  }

  return (
    <div style={{ display: "flex", margin: "10px" }}>
      <div>
        {messages && messages?.map(c => {
          return <h4 onClick={() => setChatId(c.id)} style={{ cursor: "pointer" }}>{c.user.name + " " + c.user.lastname}</h4>
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "90vh", width: "70vw", margin: "0 2em" }}>
        {filteredConversation?.map(m => {
          return <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", height: "4vh" }}>
            <img style={{ width: "4vh" }} src={m.product.imgUrl} alt={m.product.name} />
            <p>{m.product.name}</p>
            <p>{m.product.id}</p>
          </div>
        })}
        {filteredConversation?.map(m => {
          return <>{m.messages.map(m => {
            return <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
              <h4>{m.user.name}{" "}{m.user.lastname}</h4>
              <p>{m.message}</p>
              <p>{moment(m.createdAt).format('L')}{", "}
                {moment(m.createdAt).format('LT')}
              </p>
            </div>
          })}</>
        })}

        <div style={{ display: "flex", width: "100%" }}>
          {messages?.map(m => m.text)}
          {chatId ? <form style={{ width: "100%", display: "flex", flexDirection: "row" }} onSubmit={handleSubmit}>
            <textarea style={{ width: "100%" }} type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Insert a messagge" />
            <button type="submit">Send</button>
          </form> : ""}
        </div>
      </div>
    </div>
  )
}
