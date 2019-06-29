const userModels = require('../models/users')
const miscHelper = require('../helpers/helpers')

module.exports = {
    getIndex: (res) => {
        return res.json({
            message: 'Hello'
        })
    },

    newBook: (req, res) => {
        const data = {
            name: req.body.name,
            writter: req.body.writter,
            location: req.body.location,
            category_id: req.body.category_id
        }

        userModels.newBook(data)
            .then(() => {
                miscHelper.response(res, data, 200)
            })

            .catch((error) => {
                console.log(error)
            })
    },

    getBooks: (req, res) => {
        userModels.getBooks()
            .then((result) => {
                miscHelper.response(res, result, 200)
            })

            .catch((error) => {
                console.log(error)
            })
    },

    bookDetail: (req, res) => {
        const bookid = req.params.bookid

        userModels.bookDetail(bookid)
            .then((resultUser) => {
                if (resultUser[0]) {
                    const result = resultUser[0]
                    miscHelper.response(res, result, 200)
                } else {
                    res.json("404 : Not Found")
                }
            })

            .catch((error) => {
                console.log(error)
            })

    },

    updateBook: (req, res) => {
        const bookid = req.params.bookid
        const data = {
            name: req.body.name,
            writter: req.body.writter,
            location: req.body.location,
            category_id: req.body.category_id
        }

        userModels.updateBook(data, bookid)
            .then(() => {
                miscHelper.response(res, data, 200)
            })

            .catch((error) => {
                console.log(error)
            })
    },

    delBook: (req, res) => {
        const bookid = req.params.bookid

        userModels.delBook(bookid)
            .then(() => {
                const result = {
                    Delete: `data id ${bookid} has been delete`
                }
                miscHelper.response(res, result, 200)
            })

            .catch((error) => {
                console.log(error)
            })
    },

    findBook: (req, res) => {
        const search = req.query.search

        userModels.findBook(search)
            .then((findingBook) => {
                const result = findingBook

                if (result[0]) {
                    miscHelper.response(res, result, 200)
                } else {
                    res.json("404 : Not Found")
                }
            })

            .catch((error) => {
                console.log(error)
            })
    }

}