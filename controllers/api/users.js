const jwt = require('jsonwebtoken')
const User = require("../../models/user");
const Classes = require("../../models/class")
const Connection = require('../../models/connection')
const Message = require("../../models/message")
const bcrypt = require('bcrypt');

module.exports = {
    create,
    login,
    checkToken,
    update,
    deleteUser,
    newMessage,
    getConnections,
    getMessages,
    makeConnection
  };
  
  async function create(req, res) {
    try {
      const user = await User.create(req.body)
      const token = createJWT(user)
      res.json(token)
    } catch(err) {
      console.log(err)
      res.status(400).json(err)
    }
  }

function createJWT(user) {
    return jwt.sign(
      { user },
      process.env.SECRET,
      { expiresIn: '24h'}
    )
  }

  async function login(req, res) {
    try {
      const user = await User.findOne({email: req.body.email})
      if (!user) throw new Error('No user found')
      const match = await bcrypt.compare(req.body.password, user.password)
      if (!match) throw new Error('Bad Password')
      const token = createJWT(user)
      res.status(200).json(token)
    } catch(err) {
      console.log(err)
      res.status(400).json(err)
    }
  }

  function checkToken(req, res) {
    // req.user will always be there for you when a token is sent
    console.log('req.user', req.user);
    res.json(req.exp);
  }

  async function update(req, res) {
    try {
        let updatedUser = await User.findByIdAndUpdate(req.user._id,  req.body, {returnDocument:'after'})
        updatedUser.save()
        const token = createJWT(updatedUser)
        res.status(200).json(token)
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
  }

  async function deleteUser(req, res) {
    try {
      // delete all existing classes under the user
      await Classes.deleteMany({seller: req.user._id})
      // then delete user
      await User.findByIdAndDelete(req.user._id)
      console.log('user was deleted try logging in again')
      res.status(200)
    } catch(err) {
      console.log(err)
      res.status(400).json(err)
    }
  }

// Handling Messaging and Connecting with users 
// basically i will make it so that the first inquiry sent by a user to another makes this connection off rip
// in the future, ill try to make it accept or decline 
  async function makeConnection(req, res) {
    try {

        const existingConnection = await Connection.findOne({ $or: [{firstUser: req.user._id}, {secondUser: req.user._id}] })
        if (existingConnection) {
          existingConnection.confirmed = true
          existingConnection.save()
          res.status(200).json(existingConnection)
        } else {
            const connection = await Connection.create(req.body)
            console.log('new friend')
            res.status(200).json(connection)
        }
    } catch(err) {
        res.status(400).json(err)
    }
}


async function getConnections(req, res) {
    try {
        const connections = await Connection.find({ $or: [{firstUser: req.user._id}, {secondUser: req.user._id}] })
        .populate([
            'firstUser', 
            'secondUser', 
        ])
        res.status(200).json(connections)
    } catch(err) {
        res.status(400).json(err)
    }
}

async function getMessages(req, res) {
    try {
        const messages = await Message.find({ connection: req.params.conversationId })
        .populate([
            'sender',
            'receiver'
        ])
        res.status(200).json(messages)
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function newMessage(req, res) {
    try {
        const connection = await Connection.findById(req.body.connection)
        if (req.body.sender._id == connection.firstUser) {
            req.body.receiver = connection.secondUser
        } else {
            req.body.receiver = connection.firstUser
        }
        connection.lastSentMessage = req.body.body
        connection.save()
        const message = await Message.create(req.body)
        message.sender = await User.findById(message.sender)
        message.receiver = await User.findById(message.receiver)
        res.status(200).json(message) 
    } catch(err) {
        res.status(400).json(err)
    }
}