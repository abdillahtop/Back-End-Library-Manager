const express = require('express')
const Route = express.Router()

const UserController = require('../controllers/users')

Route
    .get('/all', UserController.getBooks)
    .get('/:bookid', UserController.bookDetail)
    .get('/', UserController.findBook)
    .get('/pinjam/all', UserController.getBorrow)
    .post('/', UserController.newBook)
    .post('/pinjam', UserController.newBorrow)
    .patch('/:bookid', UserController.updateBook)
    .patch('/pinjam/:bookid', UserController.updateBorrow)
    .delete('/:bookid', UserController.delBook)


module.exports = Route