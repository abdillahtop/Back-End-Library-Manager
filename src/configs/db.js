require('dotenv').config() //initialize dotenv config

const mysql = require('mysql')
const connection = mysql.createConnection({
    host: process.env.DB_HOST || "remotemysql.com",
    user: process.env.DB_USER || "1RZPjA2HfO",
    password: process.env.DB_PASSWORD || "jT7niSIXMy",
    database: process.env.DB_NAME || "1RZPjA2HfO"
})

connection.connect((err) => {
    if (err) console.log(`Error ${err}`)
})

module.exports = connection