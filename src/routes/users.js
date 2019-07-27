const express = require('express')
const Route = express.Router()

const BookController = require('../controllers/books')
const UserController = require('../controllers/users')
const Auth = require('../helpers/auth')

Route
    // book
    .get('/all', BookController.getBooks)
    .get('/:bookid', BookController.bookDetail)
    .get('/', BookController.findBook)
    .get('/pinjam/all', Auth.authInfo, Auth.accessToken, BookController.getBorrow)

    .post('/', BookController.newBook)
    .post('/pinjam', BookController.newBorrow)

    .patch('/:bookid', BookController.updateBook)
    .patch('/pinjam/:loaningid', BookController.updateBorrow)

    .delete('/:bookid', BookController.delBook)

    // User    
    .get('/user/all', Auth.authInfo, Auth.accessToken, UserController.getUsers)
    .get('/user/loan/:cardId', Auth.authInfo, Auth.accessToken, UserController.loanUser)

    .post('/register', UserController.register)
    .post('/login', UserController.login)


    .patch('/users/logout/:userid', UserController.logout)

module.exports = Route