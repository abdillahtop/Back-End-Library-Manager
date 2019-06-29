const express = require('express')
const Route = express.Router()

const UserController = require('../controllers/users')

Route
    .get('/all', UserController.getBooks)
    .get('/:bookid', UserController.bookDetail)
    .get('/', UserController.findBook)
    .post('/', UserController.newBook)
    .patch('/:bookid', UserController.updateBook)
    .delete('/:bookid', UserController.delBook)


module.exports = Route