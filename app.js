require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 5000;

const userRoute = require ('./src/routes/users')

app.listen (port, () => {
    console.log(`\n App listening on port ${port} \n`)
})  

app.use (bodyParser.json())
app.use (bodyParser.urlencoded({extended: false}))

app.use ('/', userRoute)

// error middleware 'next'
app.use (function (err, req, res, next) {
    res.send ({err : err.message})
})