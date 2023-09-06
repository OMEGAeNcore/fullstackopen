const Blog = require('../model/Blog')
const initBlogs = require('./testData').blogsList


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

module.exports = {
  initBlogs,
  nonExistingId,
  blogsInDb,
}
