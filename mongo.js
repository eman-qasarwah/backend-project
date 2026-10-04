const mongoose = require('mongoose')
const dns = require('dns')

dns.setServers(['8.8.8.8'])

let password
let namep
let numperp

if (process.argv.length === 3) {
  password = process.argv[2]
} else {
  password = process.argv[2]
  namep = process.argv[3]
  numperp = process.argv[4]
}

const url = `mongodb+srv://Eman1Qasarwah:${password}@cluster0.zdg7w71.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({})
    .then(result => {
      console.log('phonebook:')
      result.forEach(person => {
        console.log(person.name + ' ' + person.number)
      })
      mongoose.connection.close()
    })
} else {
  const person = new Person({
    name: namep,
    number: numperp
  })

  person.save().then(() => {
    console.log(
      'added ' + person.name + ' number ' + person.number + ' to phonebook'
    )
    mongoose.connection.close()
  })
}