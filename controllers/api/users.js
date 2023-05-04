const jwt = require('jsonwebtoken')
const User = require("../../models/user");
const Classes = require("../../models/class")
const bcrypt = require('bcrypt');

module.exports = {
    create,
    login,
    checkToken,
    update,
    deleteUser
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