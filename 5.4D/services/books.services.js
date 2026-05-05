const Book = require('../models/book.model');

const allowedFields = ['id','title','author','year','genre','summary','price'];

function validateFields(data) {
  return Object.keys(data).every(f => allowedFields.includes(f));
}

// GET ALL
async function getAllBooks() {
  return Book.find({}).lean({ getters: true });
}

// GET BY ID
async function getBookById(id) {
  return Book.findOne({ id }).lean({ getters: true });
}

// CREATE (SAFE WRITE)
async function createBook(data) {

  if (!validateFields(data)) {
    throw { status: 400, message: 'Unknown fields not allowed' };
  }

  const { id, title, author, year, genre, summary, price } = data;

  try {
    const book = new Book({ id, title, author, year, genre, summary, price });
    return await book.save();
  } catch (err) {
    if (err.code === 11000) {
      throw { status: 409, message: 'Duplicate ID' };
    }
    throw { status: 400, message: 'Validation error: ' + err.message };
  }
}

// UPDATE (SAFE WRITE)
async function updateBook(id, data) {

  if (!validateFields(data)) {
    throw { status: 400, message: 'Unknown fields not allowed' };
  }

  if (data.id) {
    throw { status: 400, message: 'ID cannot be changed' };
  }

  try {
    const updated = await Book.findOneAndUpdate(
      { id },
      { $set: data },
      {
        new: true,
        runValidators: true,
        upsert: false
      }
    );

    if (!updated) {
      throw { status: 404, message: 'Book not found' };
    }

    return updated;

  } catch (err) {
    if (err.status) throw err;
    throw { status: 400, message: 'Validation error: ' + err.message };
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook
};