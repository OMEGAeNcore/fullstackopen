const blogRouter = require('express').Router()
require('express-async-errors')
const Blog = require('../model/Blog')
const User = require('../model/Users')
const mongoose = require('mongoose')

// Get routes
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  if (blogs) {
    response.json(blogs)
  } else {
    response.status(400).end()
  }
})

// Post routes
blogRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.userId)

  if (!body.title || !body.url) {
    return response
      .status(400)
      .json({ error: 'Title or Url of the data are missing.' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

// Delete route
blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: 'Id is not correct' })
  }

  const deletedBlog = await Blog.findByIdAndRemove(id)
  if (deletedBlog) {
    response.status(204).json(deletedBlog)
  } else {
    response
      .status(400)
      .json({ error: 'Data was already deleted from server.' })
  }
})

// Update route
blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: 'Id is not correct' })
  }
  if (!body.likes && !body.author) {
    return response.status(400).json({ error: 'Nothing to update!' })
  }

  const fetchExistingBlog = await Blog.findById(id)

  if (fetchExistingBlog) {
    const updatedBlog = {
      title: fetchExistingBlog.title,
      author: body.author || fetchExistingBlog.author,
      url: fetchExistingBlog.url,
      likes: body.likes,
    }

    const updateBlog = await Blog.findByIdAndUpdate(id, updatedBlog, {
      new: true,
    })

    response.status(200).json({ updatedBlog: updateBlog })
  } else {
    response.status(404).json({ error: 'No such data found.' })
  }
})

module.exports = blogRouter
