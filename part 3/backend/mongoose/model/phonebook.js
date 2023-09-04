require("dotenv").config();
const mongoose = require("mongoose");
const Phonebook = require("../schema/Phonebook");
const url = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((res) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB: ", error.message);
  });

module.exports = Phonebook;
