const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../model/Users')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    likes: 1,
  })
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const users = await User.findById(id).populate('blogs', {
    title: 1,
    author: 1,
    likes: 1,
  })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (password && password.length < 3) {
    return response
      .status(400)
      .json({ error: 'Password should be atleast 3 characters long.' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
