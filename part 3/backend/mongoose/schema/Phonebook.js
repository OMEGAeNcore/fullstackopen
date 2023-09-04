const mongoose = require('mongoose')
const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Must be at least 3 characters long, got {VALUE}'],
    required: [true, 'User Name required'],
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{8}/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'User phone number required'],
  },
})
phonebookSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  },
})
const Phonebook = mongoose.model('Phonebook', phonebookSchema)

module.exports = Phonebook
