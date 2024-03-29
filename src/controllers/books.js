const bookModels = require('../models/books')
const miscHelper = require('../helpers/helpers')

module.exports = {
    newBook: (req, res) => {
        const data = {
            title: req.body.title,
            writter: req.body.writter,
            location: req.body.location,
            image: req.file.path,
            id_category: req.body.id_category,
            description: req.body.description,
            status: "Tersedia",
            created_at: new Date(),
            updated_at: new Date()
        }

        bookModels.newBook(data)
            .then(() => {
                miscHelper.response(res, data, 200)
            })

            .catch((error) => {
                miscHelper.response(res, error, 200)
                console.log(error)
            })
    },

    getBooks: (req, res) => {
        let limit = parseInt(req.query.limit) || 10
        let page = parseInt(req.query.page) || 1
        bookModels.getBooks(limit, page)
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    bookDetail: (req, res) => {
        const bookid = req.params.bookid

        bookModels.bookDetail(bookid)
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

        bookModels.updateBook(data, bookid)
            .then(() => {
                miscHelper.response(res, data, 200)
            })

            .catch((error) => {
                console.log(error)
            })
    },

    delBook: (req, res) => {
        const bookid = req.params.bookid

        bookModels.delBook(bookid)
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

        bookModels.findBook(search)
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
    },

    Allcategory: (req, res) => {
        bookModels.Allcategory()
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log("error all category", error)
            })
    }
}