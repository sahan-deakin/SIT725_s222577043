var express = require("express");
const path = require("path");

var app = express();
var port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// GET API - Add Operation
app.get("/api/add", (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: "Invalid numbers" });
  }
  var calculation = a + b;
  res.json({ result: calculation });
});

// GET API - Subtract Operation
app.get("/api/subtract", (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: "Invalid numbers" });
  }

  var calculation = a - b;
  res.json({ result: calculation });
});

// POST API - Multiply Operation
app.post("/api/multiply", (req, res) => {
  const { a, b } = req.body;

  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({ error: "Invalid numbers" });
  }

  var calculation = a * b;
  res.json({ result: calculation });
});

// POST API - Divide Operation
app.post("/api/divide", (req, res) => {
  const { a, b } = req.body;

  if (typeof a !== "number" || typeof b !== "number" || b === 0) {
    return res.status(400).json({ error: "Invalid input or division by zero" });
  }

  var calculation = a / b;
  res.json({ result: calculation });
});

app.get("/health", (req, res) => {
  res.send("Server is healthy!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});