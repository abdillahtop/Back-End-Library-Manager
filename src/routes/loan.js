const express = require('express')
const Route = express.Router()

const LoanController = require('../controllers/loan')
const Auth = require('../helpers/auth')

Route
    .get('/', Auth.authInfo, Auth.accessToken, LoanController.getLoan)
    .get('/:cardid', Auth.authInfo, Auth.accessToken, LoanController.loanDetail)
    .post('/', Auth.authInfo, LoanController.newLoan)
    .patch('/:loanid', Auth.authInfo, LoanController.updateLoan)
    .delete('/:loanid', Auth.authInfo, LoanController.delLoan)

module.exports = Route