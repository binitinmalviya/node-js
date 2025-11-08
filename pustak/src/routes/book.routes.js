const express = require('express')
const { insertBook, getBookById, getBooks } = require('../controller/book.controller');
const { bookValidations } = require('../utils/validation');
const { upload } = require('../utils/multer');
const bookRoutes = express.Router()


bookRoutes.post('/insert-book', bookValidations, upload.single('bookImage'), insertBook);
bookRoutes.get('/:id', getBookById);
bookRoutes.get('/', getBooks);

module.exports = { bookRoutes }
