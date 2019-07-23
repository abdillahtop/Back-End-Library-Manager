const express = require('express')
const Route = express.Router()

const UserController = require('../controllers/users')
const Auth = require('../helpers/auth')

Route
    // .all('/*', Auth.authInfo)
    .get('/all', UserController.getBooks)
    .get('/:bookid', UserController.bookDetail)
    .get('/', UserController.findBook)
    .get('/pinjam/all', UserController.getBorrow)
    .post('/', UserController.newBook)
    .post('/pinjam', UserController.newBorrow)
    .post('/register', UserController.register)
    .patch('/:bookid', UserController.updateBook)
    .patch('/pinjam/:bookid', UserController.updateBorrow)
    .delete('/:bookid', UserController.delBook)


module.exports = Route