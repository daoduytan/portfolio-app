const express = require('express');
const router = express.Router();
const bookControler = require('../controllers/book');

// POST BOOK
router.post('', bookControler.postBook);

// GET ALL BOOKS
router.get('', bookControler.getBooks);

// UPDATE BOOK
router.patch('/:id', bookControler.updateBook);

// DELETE BOOK
router.delete('/:id', bookControler.deleteBook);

module.exports = router;
