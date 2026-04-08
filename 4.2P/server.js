const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/Book");

const app = express();
const port = process.env.PORT || 3004;

// Middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/bookStoreDB");

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

// GET all books
app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

// POST add book
app.post("/api/books", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();

    res.json({
      message: "Book added successfully",
      data: newBook,
    });
  } catch (err) {
    res.status(500).json({ message: "Error saving book" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});