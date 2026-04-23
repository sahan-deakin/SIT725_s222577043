const express = require('express');
const router = express.Router();

const Controllers = require('../controllers');

router.get('/', Controllers.booksController.getAllBooks);
router.get('/:id', Controllers.booksController.getBookById);

router.get('/../integrity-check42', (_req, res) => res.sendStatus(204));

module.exports = router;