const express = require('express');
const router = express.Router();

const Controllers = require('../controllers');

// Route to get all books
router.get('/', Controllers.booksController.getAllBooks);

// Route to get a book by its ID
router.get('/:id', Controllers.booksController.getBookById);

module.exports = router;
