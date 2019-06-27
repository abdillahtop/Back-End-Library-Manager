const express = require('express')
const Route = express.Router()

const UserController = require('../controllers/users')

Route
    .get('/all', UserController.getBooks)
    .get('/:userid', UserController.bookDetail)
    .get('/', UserController.findBook)
    .post('/', UserController.newBook)
    .patch('/:userid', UserController.updateBook)
    .delete('/:userid', UserController.delBook)


module.exports = Route