const bookService = require('../services/books.services');

exports.getAllBooks = async (_req, res, next) => {
  try {
    const data = bookService.getAllBooks();
    res.status(200).json({
      statusCode: 200,
      data,
      message: 'Books retrieved successfully'
    });
  } catch (err) {
    next(err);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const book = bookService.getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({
      statusCode: 200,
      data: book
    });
  } catch (err) {
    next(err);
  }
};