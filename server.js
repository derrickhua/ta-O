const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')

require('dotenv').config();
require('./config/database');

const app = express();
app.use(cors())
const server = http.createServer(app)
const io = socketio(server)

let activeUsers = [];

const newUser = (userId, socketId) => {
  if (!activeUsers.some(user => user.userId === userId)) {
    activeUsers.push({userId: userId, socketId: socketId})
  } 
}

const delUser = (socketId) => {
  activeUsers = activeUsers.filter(user => user.socketId !== socketId)
}

const fetchUser = (userId) => {
  return activeUsers.find(user => user.userId == userId)
}

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} has connected`)
  // add current user to activeUsers array,
  socket.on("send_user", userId => {
    newUser(userId, socket.id)
    // broadcast to everything that get_users contains all the activeUsers
    io.emit("get_users", activeUsers)
  })

  socket.on("send_message", data => {
    const receiver = fetchUser(data.receiver._id);
    if (receiver) {
      io.to(receiver.socketId).emit("get_message", data)
    }
  })

  socket.on("disconnect", () => {
    delUser(socket.id)
    io.emit("get_users", activeUsers)
  })

})

app.use(logger('dev'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(require('./config/checkToken'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/classes', require('./routes/api/classes'));
app.use('/api/orders', require('./routes/api/orders'));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
  });