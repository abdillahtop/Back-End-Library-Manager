const userModels = require('../models/books')
const miscHelper = require('../helpers/helpers')

const jwt = require('jsonwebtoken')

module.exports = {
    getIndex: (res) => {
        return res.json({
            message: 'Hello'
        })
    },

    newBook: (req, res) => {
        const data = {
            book_name: req.body.book_name,
            writter: req.body.writter,
            location: req.body.location,
            image: req.body.image,
            id_category: req.body.id_category,
            description: req.body.description,
            status: req.body.status,
            created_at: new Date(),
            updated_at: new Date()
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
            book_name: req.body.name,
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
    },

    newBorrow: (req, res) => {
        const bookid = req.params.bookid
        const data = {
            id_book: req.body.id_book,
            no_ktp: req.body.no_ktp,
            name: req.body.name,
            is_return: "False",
            borrow_date: new Date(),
        }

        userModels.newBorrow(data, bookid)
            .then(() => {
                miscHelper.response(res, data, 200)
            })

            .catch((error) => {
                console.log(error)
            })
    },

    getBorrow: (req, res) => {
        userModels.getBorrow()
            .then((result) => {
                miscHelper.response(res, result, 200)
            })

            .catch((error) => {
                console.log(error)
            })
    },

    updateBorrow: (req, res) => {
        const loaningid = req.params.loaningid
        const data = {
            id_book: req.body.id_book,
            is_return: "True",
            return_date: new Date()
        }

        userModels.updateBorrow(loaningid, data)
            .then((result) => {
                miscHelper.response(res, data, 200)
            })

            .catch((error) => {
                console.log(error)
            })
    },

    register: (req, res) => {
        const salt = miscHelper.generateSalt(18)
        const passwordHash = miscHelper.setPassword(req.body.password, salt)

        const data = {
            email: req.body.email,
            full_name: req.body.fullname,
            password: req.body.password,
            salt: passwordHash.salt,
            token: 'test',
            status: 1,
            created_at: new Date(),
            updated_at: new Date()
        }

        userModels.register(data)
            .then((resultRegister) => {
                miscHelper.response(res, data, 200)
            })
            .catch((error) => {
                console.log("from Reagister :", error)
            })
    },

    login: (req, res) => {
        const email = req.body.email
        const password = req.body.password

        userModels.getByEmail(email)
            .then((result) => {
                const dataUser = result[0]
                const usePassword = miscHelper.setPassword(password, dataUser.salt).passwordHash

                if (usePassword === dataUser.password) {
                    dataUser.token = jwt.sign({
                        userid: dataUser.userid
                    }, process.env.SECRET_KEY, { expiresIn: '1h' })

                    delete dataUser.salt
                    delete dataUser.password

                    return miscHelper.response(res, dataUser, 200)
                } else {
                    return miscHelper.response(res, null, 403, 'Wrong password!')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }


}