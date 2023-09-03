const http = require("http");
const PORT = 3001;

const notes = [
  {
    name: "Ada Lovelace",
    number: "4876547677",
    id: 1,
  },
  {
    id: 2,
    name: "Ipshita Chakraborty",
    number: "576578769789",
  },
  {
    id: 3,
    name: "Arto Hellas",
    number: "8657657568",
  },
];

const app = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World");
});

app.listen(PORT);
console.log(`Server is running on port ${PORT}...`);
