const express = require('express');
const router = express.Router();

const Controllers = require('../controllers');

// Route to get all books
router.get('/', Controllers.booksController.getAllBooks);
router.get('/:id', Controllers.booksController.getBookById);

// Routes for creating and updating books
router.post('/', Controllers.booksController.createBook);
router.put('/:id', Controllers.booksController.updateBook);

module.exports = router;