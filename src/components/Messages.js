import { useEffect, useState, useRef } from 'react'
import { io } from "socket.io-client"

// Assets
import person from '../assets/person.svg'
import send from '../assets/send.svg'

// Socket
const socket = io('ws://localhost:3030')

const Messages = ({ account, messages, currentChannel }) => {
  const [message, setMessage] = useState("")
  const messageEndRef = useRef(null)

  const sendMessage = (e) => {
    e.preventDefault()

    if (message !== "" ){
      socket.emit('new message', {
        channel: currentChannel.id.toString(),
        account: account,
        text: message
      })
    }
    setMessage("")
  }

  const scrollHandler = () => {
    setTimeout(() => {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }, 500)
  }

  useEffect(() => {
    scrollHandler()
  }, [messages])

  return (
    <div className="text">
      <div className="messages">
        {currentChannel && messages.filter(message => message.channel === currentChannel.id.toString()).map((message, index) => (
          <div className="message" key={index}> 
            <img src={person} alt="Person" />
            <div className="message_content">
               <h3>{message.account.slice(0,6) + '...' +message.account.slice(38, 42)}</h3>
               <p>{message.text}</p>
            </div>
          </div>
        ))}

        <div ref={messageEndRef}/>

      </div>

      <form onSubmit={sendMessage}>
        {currentChannel && account ? (
          <input type="text" placeholder={`Type a message in #${currentChannel.name}...`} value={message} onChange={(e) => setMessage(e.target.value)} />
        ) : (
          <input type="text" placeholder="Connect wallet to send a message" disabled />
        )}
        <button type="submit"><img src={send} alt="Send" /></button>
      </form>
    </div>
  );
}

export default Messages;