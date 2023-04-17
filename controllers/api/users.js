const jwt = require('jsonwebtoken')
const User = require("../../models/user");
const bcrypt = require('bcrypt');

module.exports = {
    create,
    login,
    checkToken,

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