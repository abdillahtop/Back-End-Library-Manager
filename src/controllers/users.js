const userModels = require('../models/users')
const miscHelper = require('../helpers/helpers')

const jwt = require('jsonwebtoken')

module.exports = {
    getUsers: (req, res) => {
        userModels.getUsers()
            .then((result) => {
                miscHelper.response(res, result, 200)
            })

            .catch((error) => {
                console.log("dari get user:", error)
            })
    },
    register: (req, res) => {
        const salt = miscHelper.generateSalt(18)
        const passwordHash = miscHelper.setPassword(req.body.password, salt)

        const data = {
            email: req.body.email,
            full_name: req.body.fullname,
            password: passwordHash.passwordHash,
            salt: passwordHash.salt,
            token: 'Test',
            status: 0,
            created_at: new Date(),
            updated_at: new Date()
        }

        userModels.register(data)
            .then((resultRegister) => {
                miscHelper.response(res, resultRegister, 200)
            })
            .catch((error) => {
                console.log(error)
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
                    userid: dataUser.user_id
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
    },

    logout: (req, res) => {
        const userid = req.params.userid
        userModels.logout(userid)
            .then((result) => {
                miscHelper.response(res, result, 200)
                console.log("constol userid:", userid)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    loanUser: (req, res) => {
        const cardId = req.params.cardId
        userModels.loanUser(cardId)
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log("err from loanuser controller :", error)
            })
    }

}