import React, { useEffect, useRef, useState } from 'react'
import { sendMessage, getMessages, getConnections } from '../../utilities/usersApi'
import { io } from 'socket.io-client'
import MessageContainer from '../MessageContainer/MessageContainer'

export default function Chatbox({ messages, setMessages, user, chat, conversations, setConversations }) {

  const socket = useRef()

  const [newMessage, setNewMessage] = useState({
    sender: user,
    body: ''
  })
  
  useEffect(() => {
    socket.current = io()
    socket.current.emit("send_user", user._id)
  }, [])

  useEffect(() => {
    socket.current.on("get_message", data => {
      if (chat !== data.connection) {
        getConnections().then(res => setConversations(res))
      }
      else if (chat == data.connection) getMessages({ conversationId: data.connection }).then(res => setMessages(res))
    })
  }, [chat])

  useEffect(() => {
    getMessages({ conversationId: chat }).then(res => setMessages(res))
  }, [conversations.find(conv => conv._id == chat).lastSentMessage])

  const handleChange = (evt) => {
    setNewMessage({...newMessage, body: evt.target.value})
  }

  const handleSend = (evt) => {
    evt.preventDefault()
    sendMessage({...newMessage, connection: chat}).then(res => {
      socket.current.emit("send_message", res)
      setMessages([...messages, res])
    })
    setNewMessage({...newMessage, body: '', connection: chat})
  }

  return (
    <div className="col-md-6 col-lg-7 col-xl-8">
  
        <MessageContainer messages={messages} user={user} />
     
        <form onSubmit={handleSend} >
            <div className="form-outline">
              <textarea name="body" className="form-control" id="textAreaExample2" rows="4" onChange={handleChange} value={newMessage.body} placeholder="Message"></textarea>
            </div>
            <input type="submit" className="btn btn-info btn-rounded float-end" value="Send" />
        </form>
        
    </div>
  )
}

