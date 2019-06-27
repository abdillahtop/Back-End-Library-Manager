const connection = require('../configs/db')

module.exports = {
    getBooks: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT bo1.id,name,writter,location,bo2.category FROM book bo1 JOIN book_category bo2 ON bo1.category_id = bo2.category_id`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    bookDetail: (userid) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT bo1.id,name,writter,location,bo2.category FROM book bo1 JOIN book_category bo2 ON bo1.category_id = bo2.category_id WHERE bo1.id = ?`, userid, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

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

    updateBook: (data, userid) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE book SET ? WHERE id=?`, [data, userid], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    delBook: (userid) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM book WHERE id=?`, userid, (err, result) => {
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
            connection.query(`SELECT bo1.id,name,writter,location,bo2.category FROM book bo1 JOIN book_category bo2 ON bo1.category_id = bo2.category_id WHERE name = ? OR bo2.category = ? OR location = ?`, [search, search, search], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    }
}