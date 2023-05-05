import { useState, useEffect } from 'react';
import './MessengerPage.css'

export default function MessengerPage({user}) {
    const [conversations, setConversations] = useState([])
    const [messages, setMessages] = useState([])
    const [chat, setChat] = useState(null)

    useEffect(() => {
        getFriendships().then(res => {
            setConversations(res)
        })
    }, [messages[messages.length-1]?.body])

    useEffect(() => {
        getFriendships().then(res => {
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
                    <Chatbox messages={messages} setMessages={setMessages} chat={chat} user={user} conversations={conversations} setConversations={setConversations} />
                </>
                
                }
            </div>
        </div>
    </section>
  )
}
  