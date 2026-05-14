const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    match: /^b\d+$/   // b1, b2, b100 etc
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
    max: new Date().getFullYear(),
    validate: { // Custom validator to ensure year is an integer
      validator: Number.isInteger,
      message: "Year must be an integer"
    }
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
    validate: { // Custom validator to ensure price is not negative
      validator: function (v) {
        return parseFloat(v.toString()) >= 0;
      },
      message: "Price cannot be negative"
    },
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