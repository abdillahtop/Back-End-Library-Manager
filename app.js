require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors')
const xssFilter = require('x-xss-protection')
const logger = require('morgan')
const app = express();
const port = process.env.SERVER_PORT || 5000;

const userRoute = require('./src/routes/users')
const loanRoute = require('./src/routes/loan')
const bookRoute = require('./src/routes/books')
const whitelist = process.env.WHITELIST

const corsOptions = (req, callback) => {
    if (whitelist.split(',').indexOf(req.header('Origin')) !== -1) {
        console.log('Success')
        return callback(null, {
            origin: true
        })
    } else {
        console.log('Failed')
        return callback(null, {
            origin: false
        })
    }
}

app.use(cors())
app.options('*', cors(corsOptions))
app.use(xssFilter())
app.use(logger('dev'))
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
    console.log(`\n App listening on port ${port} \n`)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use('/user', userRoute)
app.use('/loan', loanRoute)
app.use('/book', bookRoute)
