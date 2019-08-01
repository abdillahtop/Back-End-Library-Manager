const userModels = require('../models/books')
const miscHelper = require('../helpers/helpers')

module.exports = {
    newBook: (req, res) => {
        const data = {
            title: req.body.title,
            writter: req.body.writter,
            location: "Menunggu Veritifikasi",
            image: req.body.image,
            id_category: req.body.id_category,
            description: req.body.description,
            status: "Tersedia",
            created_at: new Date(),
            updated_at: new Date()
        }

        userModels.newBook(data)
            .then(() => {
                miscHelper.response(res, data, 200)
            })

            .catch((error) => {
                miscHelper.response(res, error, 200)
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
            title: req.body.title,
            writter: req.body.writter,
            location: req.body.location,
            image: req.body.image,
            id_category: req.body.id_category,
            description: req.body.description,
            status: req.body.status,
            created_at: new Date(),
            updated_at: new Date()
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