const connection = require('../configs/db')

module.exports = {

    newBook: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO book SET ?`, data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    getBooks: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT a.id, name, writter, location, b.category 
            FROM book a JOIN book_category b ON a.category_id = b.category_id`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    bookDetail: (bookid) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT a.id, name, writter, location, b.category 
            FROM book a JOIN book_category b ON a.category_id = b.category_id 
            WHERE a.id = ?`, bookid, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    updateBook: (data, bookid) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE book SET ? WHERE id=?`, [data, bookid], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    delBook: (bookid) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM book WHERE id=?`, bookid, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    findBook: (search) => {
        return new Promise((resolve, reject) => {
            const sample = `%${search}%`
            connection.query(`SELECT a.id, name, writter, location, b.category 
            FROM book a JOIN book_category b ON a.category_id = b.category_id 
            WHERE name LIKE ? OR b.category LIKE ? OR location LIKE ?`, [sample, sample, sample], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    }
}