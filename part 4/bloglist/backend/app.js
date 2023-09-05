// Package imports
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// User-defined imports
const blogRouter = require('./controllers/Blog')
const config = require('./utils/config')
const logger = require('./utils/logger')

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
app.use('/api/blogs', blogRouter)


module.exports = app
