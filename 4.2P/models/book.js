const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  price: Number,
  rating: Number,
  coverUrl: String,
});

module.exports = mongoose.model("Book", BookSchema);