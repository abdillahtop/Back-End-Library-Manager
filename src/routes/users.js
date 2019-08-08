const express = require('express')
const Route = express.Router()

const UserController = require('../controllers/users')
const Auth = require('../helpers/auth')

Route
    .all('/', Auth.authInfo)
    .get('/', Auth.accessToken, UserController.getUsers)
    .post('/register', UserController.register)
    .post('/login', UserController.login)
    .post('/logout/:userid', UserController.logout)
    .post('/verified/:userid', UserController.verifiedUser)
    .delete('/:userid', UserController.delUser)

module.exports = Route