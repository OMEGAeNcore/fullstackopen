// Package imports
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// User-defined imports
const blogRouter = require('./controllers/Blog')
const userRouter = require('./controllers/Users')
const loginRouter = require('./controllers/Login')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

// Initializing
const app = express()

// Connecting to MongoDB
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl).then(() => {
  logger.info('connected to MongoDb')
})

// Middlewares
app.use(cors())
app.use(express.json())

// Router
app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

// For handling errors
app.use(middleware.errorHandler)

module.exports = app
