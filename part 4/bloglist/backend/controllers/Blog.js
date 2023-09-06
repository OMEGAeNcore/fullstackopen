const blogRouter = require('express').Router()
require('express-async-errors')
const Blog = require('../model/Blog')

// Get routes
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  if (blogs) {
    response.json(blogs)
  } else {
    response.status(400).end()
  }
})

// Post routes
blogRouter.post('/', async (request, response) => {
  const body = request.body
  if(!body.title || !body.url){
    return response.status(400).end()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogRouter
