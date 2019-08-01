const loandModels = require('../models/loan')
const miscHelper = require('../helpers/helpers')

module.exports = {
    newLoan: (req, res) => {
        let expired_date = new Date()
        expired_date.setDate(expired_date.getDate() + 7)
        const bookid = req.params.bookid
        const data = {
            id_book: req.body.id_book,
            id_card: req.body.id_card,
            name: req.body.name,
            expaired: expired_date,
            is_return: "False",
            borrow_date: new Date(),
            return_date: "Anda Belum Mengembalikan Buku"
        }

        loandModels.newLoan(data, bookid)
            .then(() => {
                miscHelper.response(res, data, 200)
            })

            .catch((error) => {
                console.log(error)
            })
    },

    loanDetail: (req, res) => {
        const cardid = req.params.cardid

        loandModels.loanDetail(cardid)
            .then((result) => {
                miscHelper.response(res, result, 200)
            })

            .catch((error) => {
                console.log(error)
                miscHelper.response(res, null, 404, 'Kamu belum meminjam apapun')
            })
    },

    getLoan: (req, res) => {
        loandModels.getLoan()
            .then((result) => {
                miscHelper.response(res, result, 200)
            })

            .catch((error) => {
                miscHelper.response(res, null, 404, 'Access Denied!!')
            })
    },

    updateLoan: (req, res) => {
        const loanid = req.params.loanid
        const data = {
            id_book: req.body.id_book,
            is_return: "True",
            return_date: new Date()
        }

        loandModels.updateLoan(loanid, data)
            .then(() => {
                miscHelper.response(res, data, 200)
            })

            .catch((error) => {
                console.log(error)
            })
    },

    delLoan: (req, res) => {
        const loan = req.params.loanid

        loandModels.delLoan(loan)
            .then((result) => {
                miscHelper.response(res, result, 200)
            })

            .catch((error) => {
                console.log(error)
            })

    }
}