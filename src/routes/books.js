const express = require('express')
const Route = express.Router()
const BookController = require('../controllers/books')
const Auth = require('../helpers/auth')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${new Date().toISOString().replace(/:/g, '-')}${file.originalname}`);
    }
})
const upload = multer({ storage: storage })
// const upload = multer({ dest: 'uploads/' })
console.log(upload)
Route
    .all('/', Auth.authInfo)
    .get('/all', BookController.getBooks)
    .get('/:bookid', BookController.bookDetail)
    .get('/', BookController.findBook)
    .post('/', upload.single('image'), BookController.newBook)
    .patch('/:bookid', BookController.updateBook)
    .delete('/:bookid', BookController.delBook)

module.exports = Route