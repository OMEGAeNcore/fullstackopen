const Blog = require('../model/Blog')
const User = require('../model/Users')
const initBlogs = require('./testData').blogsList
const initUsers = require('./testData').usersList

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initBlogs,
  initUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
