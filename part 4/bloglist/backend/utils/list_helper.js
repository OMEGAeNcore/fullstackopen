const _ = require('lodash')

const dummy = (blogs) => {
  return 1 || blogs
}

const totalLikes = (blogs) => {
  const getTotalLikes = (sum, post) => sum + post.likes

  return blogs.length === 0 ? 0 : blogs.reduce(getTotalLikes, 0)
}

const favouriteBlog = (blogs) => {
  const currentPostModified = blogs.map(({ title, author, likes }) => ({
    title,
    author,
    likes,
  }))
  const getMostLikes = (maxLikedPost, { title, author, likes }) => {
    if (likes > maxLikedPost.likes) {
      maxLikedPost = {
        title,
        author,
        likes,
      }
    }
    return maxLikedPost
  }

  return currentPostModified.reduce(getMostLikes, { likes: 0 })
}

const mostBlogs = (blogs) => {
  const totalCounts = _.countBy(blogs, 'author')
  const formattedCounts = Object.keys(totalCounts).map((key) => ({
    author: key,
    blogs: totalCounts[key],
  }))
  const getMostBlogs = (value, { author, blogs }) => {
    if (value.blogs < blogs) {
      value = {
        author,
        blogs,
      }
    }
    return value
  }

  return formattedCounts.reduce(getMostBlogs, { blogs: 0 })
}

const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs, 'author')
  const totalLikes = _.mapValues(authors, (blog) => _.sumBy(blog, 'likes'))
  const formattedCounts = Object.keys(totalLikes).map((key) => ({
    author: key,
    likes: totalLikes[key],
  }))

  const getMostLikes = (value, { author, likes }) => {
    if (value.likes < likes) {
      value = {
        author,
        likes,
      }
    }
    return value
  }

  return formattedCounts.reduce(getMostLikes, { likes: 0 })
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}
