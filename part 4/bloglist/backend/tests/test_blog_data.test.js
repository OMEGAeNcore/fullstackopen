const listHelper = require('../utils/list_helper')
const { listWithOneBlog, blogsList } = require('./testData')
describe('favourite blog', () => {
  test('of the favourite blog', () => {
    const result = listHelper.favouriteBlog(blogsList)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })
})
describe('most liked', () => {
  test('should return most blogs created', () => {
    const result = listHelper.mostBlogs(blogsList)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
  test('should return most liked author', () => {
    const result = listHelper.mostLikes(blogsList)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogsList)
    expect(result).toBe(36)
  })
})
