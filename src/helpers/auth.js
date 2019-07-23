const jwt = require('jsonwebtoken')
const miscHelper = require('../helpers/helpers')

const allowedAccess = process.env.REQUEST_HEADERS

module.exports = {
    authInfo: (req, res, next) => {
        const headerAuth = req.headers['authorization']
        const headerSecret = req.headers['x-acceess-token']

        if (headerAuth !== allowedAccess) {
            return miscHelper.response(res, null, 401, 'Unauthorized, Need access token!')
        } else if (typeof headerSecret === 'undefined') {
            next()
        } else {
            const bearerToken = headerSecret.split(' ')
            const token = bearerToken[1]
            req.token = token
            console.log('Token stored!', token)
            next()
        }
    },

    acceessToken: (req, res, next) => {
        const secretKey = process.env.SECRET_KEY
        const acceessToken = req.token
        const userToken = req.headers['x-control-user']


        jwt.verify(acceessToken, secretKey, (err, decoded) => {
            if (err && err.name === 'TokenExpiredError') return miscHelper.response(res, null, 401, 'Token expired')

            if (err && err.name === 'JsonWebTokenError') return miscHelper.response(res, null, 402, 'Invalid Token')

            if (parseInt(userToken) !== parseInt(decoded.userid)) return miscHelper.response(res, null, 401, 'Invalid User Token')
            console.log(decoded)
            next()
        })
    }
}