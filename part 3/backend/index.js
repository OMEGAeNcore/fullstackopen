const express = require('express')
const morgan = require('morgan')
const errorHandler = require('./middlewares/errorHandler')
const unknownEndpoint = require('./middlewares/unknownEndpoint')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3001
const Phonebook = require('./mongoose/model/phonebook')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

app.get('/api/persons', (req, res) => {
  Phonebook.find({}).then((phoneDb) => {
    res.json(phoneDb)
  })
})
app.get('/api/persons/:id', (req, res) => {
  Phonebook.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).json({ error: 'Data not found in server.' })
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'Server error' })
    })
})
app.get('/info', (req, res) => {
  Phonebook.count().then((noOfPeople) => {
    const getDate = new Date().toUTCString()
    res.send(`
    <div>
        <p>Phonebook has info for ${noOfPeople} people</p>
        <p>${getDate}</p>
    </div>`)
  })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Phonebook.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).send({ message: 'Data was deleted successfully!' })
    })
    .catch((error) => {
      next(error)
    })
})

app.post('/api/persons/', (req, res, next) => {
  const body = req.body

  const person = new Phonebook({
    name: body.name,
    number: body.number,
  })
  person
    .save()
    .then((result) => {
      res.json(result)
    })
    .catch((error) => next(error))
})
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  const person = {
    name: name,
    number: number,
  }

  Phonebook.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updated) => {
      res.json(updated)
    })
    .catch((error) => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`)
})
