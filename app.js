require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 5000;

const mysql = require('mysql')
const conn = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME

});

app.listen(port, () => {
    console.log(`\n App listening on port ${port} \n`)
})  

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req,res) => {
    res.send("Hello Pertama boskue")
})

app.post('/',(req,res) => {
    const data = {
        name : req.body.name,
        phone : req.body.phone,
        location : req.body.location,
        created_at : new Date(),
        updated_at : new Date()
    }
    conn.query('INSERT INTO users SET ?', data, (err,result) => {
        if (err) console.log(err)
        res.json(result)
    })
})

app.patch('/:userid', (req,res) => {
    const userid = req.params.userid
    
    const data = {
        name : req.body.name,
        phone : req.body.phone,
        location : req.body.location,
        created_at : new Date()
    }

    conn.query('UPDATE users SET ? WHERE id= ?', [data,userid], (err,result) => {
        if(err) console.log(err)
        res.json(result)
    })

})

app.delete('delete')
