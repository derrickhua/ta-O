import React from 'react'
import Conversation from '../Convo/Convo'
import './ConvoContainer.css'

export default function ConvoContainer({ conversations, chat, setChat, user }) {
  return (
    <div className='friendContainer'>
        <h5>Messages</h5>
        <div className='beWide'>
            <div className='beWide'>
                <ul className='messageList beWide'>
                    {conversations.map((conversation, idx) => {
                        return <Conversation key={idx} user={user} conversation={conversation} chat={chat} setChat={setChat}/>
                    })}
                </ul>
            </div>
        </div>
    </div>
  )
}

