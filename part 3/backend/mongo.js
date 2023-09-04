const mongoose = require("mongoose");
const Phonebook = require("./mongoose/schema/Phonebook");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}
const password = process.argv[2];
const url = `mongodb+srv://omegaen:${password}@fullstackopen-1.oriiabj.mongodb.net/phoneBook?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

if (process.argv.length < 5) {
  Phonebook.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const name = process.argv[3];
  const number = process.argv[4];

  const phonebook = new Phonebook({
    name: name,
    number: number,
  });

  phonebook.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
