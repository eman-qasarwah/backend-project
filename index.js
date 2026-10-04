const express = require('express')
const Phonebook = require('./phonebook')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())

morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// app.use(morgan('tiny'))

// let Phonebook = [
//   {
//     "id": "1",
//     "name": "Arto Hellas",
//     "number": "040-123456"
//   },
//   {
//     "id": "2",
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523"
//   },
//   {
//     "id": "3",
//     "name": "Dan Abramov",
//     "number": "12-43-234345"
//   },
//   {
//     "id": "4",
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122"
//   }
// ]

app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then(p => {
    response.json(p)
  })
})

app.get('/api/info', (request, response) => {
  Phonebook.countDocuments({}).then(count => {
    response.send(
      `<p>Phonebook has info for ${count} people</p>` +
      `<p>${new Date()}</p>`
    )
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Phonebook.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      response.json(person)
    })
    .catch(error => {
      next(error)
    })
})

// app.delete('/api/persons/:id', (request, response) => {
//   const id = request.params.id
//   Phonebook = Phonebook.filter(n => n.id !== id)
//   response.status(204).end()
// })

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  Phonebook.findOne({ name: body.name }).then(person => {
    if (person) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }

    const phone = new Phonebook({
      name: body.name,
      number: body.number
    })

    return phone.save().then(savedPhone => {
      response.json(savedPhone)
    })
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Phonebook.findByIdAndDelete(request.params.id).then(
    () => response.status(204).end()
  ).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const number = request.body.number

  Phonebook.findById(request.params.id).then(person => {
    if (!person) {
      return response.status(404).end()
    }

    person.number = number

    person.save().then(
      updatedPerson => response.json(updatedPerson)
    )
  }).catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id'
    })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    })
  }

  next(error)
}

app.use(errorHandler)

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})