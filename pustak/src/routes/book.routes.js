const express = require('express');
const { insertBook, getBookById, getBooks, deleteBookById, updateBookById, getTrendingBooks } = require('../controller/book.controller');
const { upload } = require('../utils/multer');

const bookRoutes = express.Router();

bookRoutes.post('/insert-book', upload.single('image'), insertBook);
bookRoutes.get('/trending', getTrendingBooks);
bookRoutes.get('/:id', getBookById);
bookRoutes.get('/', getBooks);
bookRoutes.delete('/:id', deleteBookById);
bookRoutes.put('/:id', upload.single('bookImage'), updateBookById);

module.exports = bookRoutes;
