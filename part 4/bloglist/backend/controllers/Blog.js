const blogRouter = require('express').Router()
const Blog = require('../model/Blog')

// Get routes
blogRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

// Post routes
blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = blogRouter
