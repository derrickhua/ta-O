import React from 'react'
import Conversation from '../Convo/Convo'

export default function ConvoContainer({ conversations, chat, setChat, user }) {
  return (
    <div>
        <h5>Member</h5>
        <div>
            <div>
                <ul>
                    {conversations.map((conversation, idx) => {
                        return <Conversation key={idx} user={user} conversation={conversation} chat={chat} setChat={setChat}/>
                    })}
                </ul>
            </div>
        </div>
    </div>
  )
}

