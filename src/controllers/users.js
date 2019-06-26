const userModels = require ('../models/users')
const miscHelper = require ('../helpers/helpers')

module.exports = {
    getIndex : (req, res) => {
        return res.json ({ message: 'Hello' })
    },

    //Using Callback
    getBooks : (req, res) => {
        userModels.getBooks ((err, result) => {
            if (err) console.log (err)
    
            miscHelper.response (res, result, 200)
        })
    },

    //Using Promise
    bookDetail : (req, res) => {
        const userid = req.params.userid

        userModels.bookDetail (userid)
         .then ((resultUser) => {
             const result = resultUser[0]
             miscHelper.response (res, result, 200)
         })

         .catch ((error) => {
            console.log(error)
         })

    },

    // Using Promise
    newBook : (req, res) => {
        const data = {
            name : req.body.name,
            writter : req.body.writter,
            location : req.body.location,
            category_id : req.body.category_id
        }

        userModels.newBook (data)
        .then (() => {
            const result = {
                name : data.name,
                writter : data.writter,
                location : data.location,
                category_id : data.category_id
            }
    
            miscHelper.response (res, result, 200)
        })

        .catch ((error) => {
            console.log(error)
         })
    },

    updateBook : (req, res) => {
        const userid = req.params.userid
        const data = {
            name : req.body.name,
            writter : req.body.writter,
            location : req.body.location,
            category_id : req.body.category_id
        }

        userModels.updateBook (data,userid)
        .then (() => {
            const result = {
                name : data.name,
                writter : data.writter,
                location : data.location,
                category_id : data.category_id
            }
            miscHelper.response (res, result, 200)
        })

        .catch ((error) => {
            console.log(error)
        })
    },

    delBook : (req, res) => {
        const userid = req.params.userid

        userModels.delBook (userid)
        .then (() => {
            const result = {
                Delete : `data id ${userModels} has been delete`
            }
            miscHelper.response (res, result, 200)
        })

        .catch ((error) => {
            console.log(error)
        })
    },

    findBook : (req, res) => {
        const search = req.query.search

        userModels.findBook (search)
        .then ((findingBook) => {
            const result = findingBook
            miscHelper.response (res, result, 200)
        })

        .catch ((error) => {
            console.log(error)
        })
    }

}