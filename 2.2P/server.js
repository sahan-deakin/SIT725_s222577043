var express = require("express");
const path = require("path");

var app = express();
var port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ---------------- QUOTES ----------------

let quotes = [
  "The best way to predict the future is to invent it.",
  "Life is 10% what happens to us and 90% how we react to it.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Do not wait to strike till the iron is hot; but make it hot by striking."
];

// GET quote
app.get("/api/quote", (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json({ quote: quotes[randomIndex] });
});

// POST quote
app.post("/api/quote", (req, res) => {
  const { quote } = req.body;

  if (!quote || typeof quote !== "string") {
    return res.status(400).json({ error: "Please provide a valid quote." });
  }

  quotes.push(quote);
  res.json({ message: "Quote added successfully.", quotes });
});

// ---------------- CALCULATOR FUNCTIONS ----------------

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

// ---------------- CALCULATOR ROUTES ----------------

// GET - Add
app.get("/api/add", (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: "Invalid numbers" });
  }

  res.json({ result: add(a, b) });
});

// GET - Subtract
app.get("/api/subtract", (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: "Invalid numbers" });
  }

  res.json({ result: subtract(a, b) });
});

// POST - Multiply
app.post("/api/multiply", (req, res) => {
  const { a, b } = req.body;

  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({ error: "Invalid numbers" });
  }

  res.json({ result: multiply(a, b) });
});

// POST - Divide
app.post("/api/divide", (req, res) => {
  const { a, b } = req.body;

  if (typeof a !== "number" || typeof b !== "number" || b === 0) {
    return res.status(400).json({ error: "Invalid input or division by zero" });
  }

  res.json({ result: divide(a, b) });
});

// ---------------- HEALTH ----------------

app.get("/health", (req, res) => {
  res.send("Server is healthy!");
});

// ---------------- START ----------------

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});