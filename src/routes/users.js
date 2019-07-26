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
    .get('/user/all', Auth.authInfo, Auth.accessToken, UserController.getUsers)
    .get('/user/loan/:cardId', UserController.loanUser)

    .post('/', BookController.newBook)
    .post('/pinjam', BookController.newBorrow)
    .post('/register', UserController.register)
    .post('/login', UserController.login)

    .patch('/:bookid', BookController.updateBook)
    .patch('/pinjam/:loaningid', BookController.updateBorrow)
    .patch('/users/logout/:userid', UserController.logout)

    .delete('/:bookid', BookController.delBook)


module.exports = Route