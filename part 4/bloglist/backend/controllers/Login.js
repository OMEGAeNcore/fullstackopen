const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../model/Users')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  /**
   * process.env.SECRET :- It is a secretOrPrivateKey which is used to generate unique tokens,
   * based on username and id (as mentioned in userForToken), and uses jwt to sign the given payload into
   * JSON Web Token string payload
   *
   * Token expires in 1 hour
   */
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  })

  response.status(200).send({ token, username: user.username, name: user.name, id: user.id })
})

module.exports = loginRouter
