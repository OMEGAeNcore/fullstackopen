const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../model/Blog')
const helper = require('./test_helper')
const User = require('../model/Users')

let userIdForTests
let token

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initBlogs)

  await User.deleteMany({})
  await User.insertMany(helper.initUsers)

  userIdForTests = helper.initUsers[0]._id

  const userLogin = await supertest(app).post('/api/login').send({
    username: 'sample',
    password: 'sekret',
  })
  token = userLogin.body.token
})

describe('1. GET test suite', () => {
  test('4.8 blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('verify number of blogs', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body).toHaveLength(helper.initBlogs.length)
  })

  test('specific data is present or not', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body.map((b) => b.title)).toContain('First class tests')
  })
})

describe('2. POST test suite', () => {
  test('4.10 blog is posted to db', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      userId: userIdForTests,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .auth(token, { type: 'bearer' })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await helper.blogsInDb()
    expect(res).toHaveLength(helper.initBlogs.length + 1)

    expect(res.map((r) => r.title)).toContain(
      'Go To Statement Considered Harmful'
    )
    expect(res.map((r) => r.author)).toContain('Edsger W. Dijkstra')
  })

  test('4.23 blog is posted without any token', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      userId: userIdForTests,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
      .then((response) => {
        expect(response.body.error).toContain('jwt must be provided')
      })

    const res = await helper.blogsInDb()
    expect(res).toHaveLength(helper.initBlogs.length)
  })

  test('4.23 blog is posted with unauthorized userId', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      userId: '64fd816055353acf45cd5263',
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .auth(token, { type: 'bearer' })
      .expect(401)
      .expect('Content-Type', /application\/json/)
      .then((response) => {
        expect(response.body.error).toContain(
          'User not unauthorized to make the post.'
        )
      })

    const res = await helper.blogsInDb()
    expect(res).toHaveLength(helper.initBlogs.length)
  })

  test('4.23 blog is posted with malformatted userId', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      userId: '123',
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .auth(token, { type: 'bearer' })
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .then((response) => {
        expect(response.body.error).toContain('malformatted id')
      })

    const res = await helper.blogsInDb()
    expect(res).toHaveLength(helper.initBlogs.length)
  })
})

describe('3. Test if Identifiers are present in added data', () => {
  test('4.9 to verify unique identifier property', async () => {
    const blogsFromDb = await helper.blogsInDb()
    expect(blogsFromDb[0].id).toBeDefined()
    expect(blogsFromDb[0]._id).not.toBeDefined()
  })
  test('4.11 is likes property present', async () => {
    const newBlog = {
      title: 'Checking if I am Liked',
      author: 'Someone Unpredictable',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      userId: userIdForTests,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .auth(token, { type: 'bearer' })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await helper.blogsInDb()
    expect(res).toHaveLength(helper.initBlogs.length + 1)
    expect(res.find((b) => b.title === 'Checking if I am Liked').likes).toEqual(
      0
    )
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

    await api
      .post('/api/blogs')
      .send(newBlogTitle)
      .auth(token, { type: 'bearer' })
      .expect(400)
      .then((response) => {
        expect(response.body.error).toContain(
          'Title or Url of the data are missing.'
        )
      })
    await api
      .post('/api/blogs')
      .send(newBlogUrl)
      .auth(token, { type: 'bearer' })
      .expect(400)
      .then((response) => {
        expect(response.body.error).toContain(
          'Title or Url of the data are missing.'
        )
      })

    const res = await helper.blogsInDb()
    expect(res).toHaveLength(helper.initBlogs.length)
  })
})

describe('4. UPDATE test suite', () => {
  test('check if likes are updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const initialLikes = blogToUpdate.likes
    blogToUpdate.likes = initialLikes + 1
    const blogAdded = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initBlogs.length)

    expect(blogAdded.body.updatedBlog.likes).toEqual(initialLikes + 1)
  })

  test('when no data is provided for update', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    await api.put(`/api/blogs/${blogToUpdate.id}`).send({}).expect(400)
  })

  test('when bad/wrong id provided for update', async () => {
    await api.put('/api/blogs/123').send({ likes: 587 }).expect(400)
  })
})

describe('5. DELETE test suite', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .auth(token, { type: 'bearer' })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initBlogs.length - 1)

    const contents = blogsAtEnd.map((r) => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})
afterAll(async () => {
  await mongoose.connection.close()
})
