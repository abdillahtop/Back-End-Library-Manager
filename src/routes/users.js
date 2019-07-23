const express = require('express')
const Route = express.Router()

const BookController = require('../controllers/books')
const UserController = require('../controllers/users')
const Auth = require('../helpers/auth')

Route
    // .all('/*', )
    .get('/all', BookController.getBooks)
    .get('/:bookid', BookController.bookDetail)
    .get('/', BookController.findBook)
    .get('/pinjam/all', BookController.getBorrow)
    .get('/users/all', Auth.authInfo, Auth.acceessToken, UserController.getUsers)

    .post('/', BookController.newBook)
    .post('/pinjam', BookController.newBorrow)
    .post('/register', UserController.register)
    .post('/login', UserController.login)

    .patch('/:bookid', BookController.updateBook)
    .patch('/pinjam/:bookid', BookController.updateBorrow)

    .delete('/:bookid', BookController.delBook)


module.exports = Route