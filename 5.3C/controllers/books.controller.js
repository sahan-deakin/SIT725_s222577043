const bookService = require('../services/books.services');

exports.getAllBooks = async (_req, res, next) => {
  try {
    const data = await bookService.getAllBooks();
    res.status(200).json({ statusCode: 200, data });
  } catch (err) {
    next(err);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json({ statusCode: 200, data: book });
  } catch (err) {
    next(err);
  }
};