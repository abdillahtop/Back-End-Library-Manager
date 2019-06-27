const userModels = require('../models/users')
const miscHelper = require('../helpers/helpers')

module.exports = {
    getIndex: (res) => {
        return res.json({
            message: 'Hello'
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

    //Using Promise
    bookDetail: (req, res) => {
        const userid = req.params.userid

        userModels.bookDetail(userid)
            .then((resultUser) => {
                const result = resultUser[0]
                miscHelper.response(res, result, 200)
            })

            .catch((error) => {
                console.log(error)
            })

    },

    // Using Promise
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

    updateBook: (req, res) => {
        const userid = req.params.userid
        const data = {
            name: req.body.name,
            writter: req.body.writter,
            location: req.body.location,
            category_id: req.body.category_id
        }

        userModels.updateBook(data, userid)
            .then(() => {
                miscHelper.response(res, data, 200)
            })

            .catch((error) => {
                console.log(error)
            })
    },

    delBook: (req, res) => {
        const userid = req.params.userid

        userModels.delBook(userid)
            .then(() => {
                const result = {
                    Delete: `data id ${userid} has been delete`
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