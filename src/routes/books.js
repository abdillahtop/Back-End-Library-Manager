const express = require('express')
const Route = express.Router()

const BookController = require('../controllers/books')
const Auth = require('../helpers/auth')

Route
    .all('/', Auth.authInfo)
    .get('/all', BookController.getBooks)
    .get('/:bookid', BookController.bookDetail)
    .get('/', BookController.findBook)
    .post('/', BookController.newBook)
    .patch('/:bookid', BookController.updateBook)
    .delete('/:bookid', BookController.delBook)

module.exports = Route