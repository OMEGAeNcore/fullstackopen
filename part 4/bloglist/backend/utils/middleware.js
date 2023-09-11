const logger = require('./logger')
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    })
  }

  next(error)
}
const userExtractor = (request, response, next) => {
  // Token Setup
  /**
   * Fetching Token from authorization header, which uses Bearer Scheme to send authorization string
   * @param {*} request contains authorization data
   * @returns Token available from authorization header realm
   */
  const auth = request.get('authorization')
  if (auth && auth.startsWith('Bearer ')) {
    request.user = auth.replace('Bearer ', '')
  } else {
    request.user = null
  }

  next()
}

module.exports = {
  errorHandler,
  userExtractor,
}
