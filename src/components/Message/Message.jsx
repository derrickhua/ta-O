import React from 'react'
import moment from 'moment'

export default function Message ({ message, user }) {
  return (
    <li className="message d-flex mb-4">
        {message.sender._id !== user._id ?         
        <img src={message.sender.pic} alt="avatar"
        className="rounded d-flex align-self-start me-3 shadow-1-strong" width="60" /> : <></>
        }
        <div className="card w-100">
          <div className="card-header d-flex justify-content-between p-3">
              <p className="fw-bold mb-0">{message.sender.name} </p>
              <p className="text-muted small mb-0"><i className="far fa-clock"></i>{moment(message.createdAt).fromNow()}</p>
          </div>
          <div className="card-body">
              <p className="mb-0">
              {message.body}
              </p>
          </div>
        </div>
        {message.sender._id === user._id ?         
        <img src={user.pic} alt="avatar"
        className="rounded d-flex align-self-start m-3 shadow-1-strong" width="60" /> : <></>
        }
    </li>
  )
}
