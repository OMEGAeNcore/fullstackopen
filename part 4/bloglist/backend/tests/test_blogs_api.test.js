const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../model/Blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = helper.initBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObject.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('4.8 blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('4.9 to verify unique identifier property', async () => {
  const blogsFromDb = await helper.blogsInDb()
  expect(blogsFromDb[0].id).toBeDefined()
  expect(blogsFromDb[0]._id).not.toBeDefined()
})

test('4.10 blog is posted to db', async () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await helper.blogsInDb()
  expect(res).toHaveLength(helper.initBlogs.length + 1)

  expect(res.map((r) => r.title)).toContain(
    'Go To Statement Considered Harmful'
  )
  expect(res.map((r) => r.author)).toContain('Edsger W. Dijkstra')
})

test('4.11 is likes property present', async () => {
  const newBlog = {
    title: 'Checking if I am Liked',
    author: 'Someone Unpredictable',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await helper.blogsInDb()
  expect(res).toHaveLength(helper.initBlogs.length + 1)
  expect(res.find((b) => b.title === 'Checking if I am Liked').likes).toEqual(0)
})

test('4.12 is title or url property missing', async () => {
  const newBlogTitle = {
    title: 'Checking if I have Title',
    author: 'Someone Unpredictable',
  }
  const newBlogUrl = {
    author: 'Someone Unpredictable',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  }

  await api.post('/api/blogs').send(newBlogTitle).expect(400)
  await api.post('/api/blogs').send(newBlogUrl).expect(400)

  const res = await helper.blogsInDb()
  expect(res).toHaveLength(helper.initBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})
