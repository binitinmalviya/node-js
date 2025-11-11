const express = require('express')
const { insertBook, getBookById, getBooks, deleteBookById, updateBookById } = require('../controller/book.controller');
const { bookValidations } = require('../utils/validation');
const { upload } = require('../utils/multer');
const bookRoutes = express.Router()


bookRoutes.post('/insert-book', upload.single('bookImage'), upload.array(), insertBook);
bookRoutes.get('/:id', getBookById);
bookRoutes.get('/', getBooks);
bookRoutes.delete('/:id', deleteBookById);
bookRoutes.put("/:id", upload.single('bookImage'), updateBookById)

module.exports = { bookRoutes }
