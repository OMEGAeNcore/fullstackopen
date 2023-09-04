const mongoose = require("mongoose");
const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    required: true
  },
  number: String,
});
phonebookSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});
const Phonebook = mongoose.model("Phonebook", phonebookSchema);

module.exports = Phonebook;
