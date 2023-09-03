const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(morgan("tiny"));

let phoneDb = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
const generateId = () => {
  const maxId = [...phoneDb.map((p) => p.id)];
  let randomId = Math.floor(Math.random() * 10000);
  while (maxId.includes(randomId)) {
    randomId = Math.floor(Math.random() * 10000);
  }
  return randomId;
};

app.get("/", (req, res) => {
  res.send(`<h1>Hello World</h1>`);
});
app.get("/api/persons", (req, res) => {
  res.json(phoneDb);
});
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = phoneDb.find((p) => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ message: "Could not find appropriate data." });
  }
});
app.get("/info", (req, res) => {
  const noOfPeople = phoneDb.length;
  const getDate = new Date().toUTCString();
  res.send(`
    <div>
        <p>Phonebook has info for ${noOfPeople} people</p>
        <p>${getDate}</p>
    </div>`);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const isPresent = phoneDb.find((p) => p.id === id);

  if (isPresent) {
    phoneDb = phoneDb.filter((p) => p.id !== id);
    res.status(204).json({ message: "Data was deleted successfully!" });
  } else {
    res.status(404).json({ message: "Data is not present on the server" });
  }
});

app.post("/api/persons/", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Person data is missing",
    });
  }
  if (phoneDb.find((p) => p.name === body.name)) {
    return res.status(405).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  phoneDb = phoneDb.concat(person);
  res.json(phoneDb);
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`);
});
