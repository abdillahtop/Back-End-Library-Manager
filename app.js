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

app.post('/',(req,res) => {
    const data = {
        name : req.body.name,
        writter : req.body.writter,
        location : req.body.location,
        category_id : req.body.category_id
    }

    conn.query('INSERT INTO lantai1 SET ?', [data], (err,result) => {
        if (err){
            return res.send({
                error : err,
            })
        } else {
            return res.send({
                status : 200,
                message :`Nama : ${data.name}, Writter : ${data.writter}, Location : ${location} has been insert`
            })
        }
    })
})

app.patch('/:userid', (req,res) => {
    const userid = req.params.userid
    
    const data = {
        name : req.body.name,
        writter : req.body.writter,
        location : req.body.location,
        category_id : req.body.category_id
    }

    conn.query('UPDATE lantai1 SET ? WHERE id=?', [data,userid], (err,result) => {
        if (err){
            return res.send({
                error : err,
            })
        } else {
            return res.send({
                status : 200,
                message :`data updated on Title :${data.name}, Writter : ${data.writter}, Location : ${data.location} `
            })
        }

    })

})

app.delete('/:userid', (req,res) => {
    const userid = req.params.userid
    const data = {
        name : req.body.name,
        writter : req.body.writter,
        location : req.body.location,
        category_id : req.body.category_id
    }

    conn.query('DELETE FROM lantai1 WHERE id=?' , [userid], (err,result) => {
        if (err){
            return res.send({
                error : err,
            })
        } else {
            return res.send({
                status : 200,
                message :`Title : ${data.name},Writter by : ${data.writter} at: ${data.location} has been Delete`,
                result : result
            })
        }

    })
})

app.get('/all', (req,res) => {

    conn.query(`SELECT lt1.id,name,writter,location,lt2.category FROM lantai1 lt1 JOIN lantai2 lt2 ON lt1.category_id = lt2.category_id`, (err,result) => {
        if(err) console.log(err)
        res.json(result)
    })
})

app.get('/', (req,res) => {
    const search = req.query.search

    conn.query(`SELECT lt1.id,name,writter,location,lt2.category FROM lantai1 lt1 JOIN lantai2 lt2 ON lt1.category_id = lt2.category_id WHERE category LIKE '%${search}%' OR location LIKE '%${search}%' `, (err,result) => {
        if(err) console.log(err)
        res.json(result)
    })
})
