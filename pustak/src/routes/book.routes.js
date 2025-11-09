const express = require('express')
const { insertBook, getBookById, getBooks, deleteBookById } = require('../controller/book.controller');
const { bookValidations } = require('../utils/validation');
const { upload } = require('../utils/multer');
const bookRoutes = express.Router()


bookRoutes.post('/insert-book', upload.single('bookImage'), upload.array(), insertBook);
bookRoutes.get('/:id', getBookById);
bookRoutes.get('/', getBooks);
bookRoutes.delete('/:id', deleteBookById);

module.exports = { bookRoutes }
