const bookService = require('../services/books.services');

// GET ALL
exports.getAllBooks = async (_req, res, next) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json({
      statusCode: 200,
      data: books,
      message: 'Books retrieved'
    });
  } catch (err) {
    next(err);
  }
};

// GET BY ID
exports.getBookById = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json({
      statusCode: 200,
      data: book
    });
  } catch (err) {
    next(err);
  }
};

// CREATE
exports.createBook = async (req, res, next) => {
  try {
    const book = await bookService.createBook(req.body);

    res.status(201).json({
      statusCode: 201,
      data: book,
      message: 'Book created'
    });
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message || 'Server error'
    });
  }
};

// UPDATE
exports.updateBook = async (req, res, next) => {
  try {
    const book = await bookService.updateBook(req.params.id, req.body);

    res.status(200).json({
      statusCode: 200,
      data: book,
      message: 'Book updated'
    });
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message || 'Server error'
    });
  }
};