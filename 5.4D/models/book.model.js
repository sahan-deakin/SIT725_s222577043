const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    match: /^b\d+$/   // e.g. b1, b2
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    trim: true
  },
  author: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    min: 1500,
    max: new Date().getFullYear()
  },
  genre: {
    type: String,
    required: true,
    enum: ['Science Fiction', 'Classic', 'Fantasy', 'Historical Fiction', 'Other']
  },
  summary: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500
  },
  price: {
    type: mongoose.Decimal128,
    required: true,
    get: v => v?.toString()
  }
}, {
  toJSON: {
    getters: true,
    transform(_doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

module.exports = mongoose.model('Book', BookSchema);