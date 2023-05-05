import { useState, useEffect } from 'react';
import { getConnections, getMessages } from '../../utilities/usersApi'
import ChatBox from '../../components/ChatBox/ChatBox'
import ConvoContainer from '../../components/ConvoContainer/ConvoContainer'
import './MessengerPage.css'

export default function MessengerPage({user}) {
    const [conversations, setConversations] = useState([])
    const [messages, setMessages] = useState([])
    const [chat, setChat] = useState(null)

    useEffect(() => {
        getConnections().then(res => {
            setConversations(res)
        })
    }, [messages[messages.length-1]?.body])

    useEffect(() => {
        getConnections().then(res => {
            setChat(res[0]._id)
        })
    }, [])

    useEffect(() => {
        if (chat) getMessages({ conversationId: chat }).then(res => {
            setMessages(res)
        })
    }, [chat])

  return (
    <section>
        <div>
            <div className="row">
                { chat && conversations && 
                    <>
                        <ConvoContainer user={user} chat={chat} setChat={setChat} conversations={conversations} />
                        <ChatBox messages={messages} setMessages={setMessages} chat={chat} user={user} conversations={conversations} setConversations={setConversations} />
                    </>
                }

                <p>Nothing yet</p>
            </div>
        </div>
    </section>
  )
}
  