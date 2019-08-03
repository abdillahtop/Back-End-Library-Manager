const connection = require('../configs/db')

module.exports = {

    newBook: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO tb_book SET ?`, data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    getBooks: (limit, page) => {
        let offset = (limit * page) - limit
        return new Promise((resolve, reject) => {
            connection.query(`SELECT a.id_book, title, writter, location, image, a.id_category, b.category_name, description, status, created_at, updated_at
            FROM tb_book a JOIN tb_category b ON a.id_category = b.id_category ORDER BY a.id_book desc LIMIT ? OFFSET ?`, [limit, offset], (err, result) => {
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
            connection.query(`SELECT a.id_book, title, writter, location, image, b.category_name, description, status, created_at, updated_at
            FROM tb_book a JOIN tb_category b ON a.id_category = b.id_category 
            WHERE a.id_book = ?`, bookid, (err, result) => {
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
            connection.query(`UPDATE tb_book SET ? WHERE id_book=?`, [data, bookid], (err, result) => {
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
            connection.query(`DELETE FROM tb_book WHERE id_book=?`, bookid, (err, result) => {
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
            connection.query(`SELECT a.id_book, title, writter, location, image, b.category_name , description, status, created_at, updated_at
            FROM tb_book a JOIN tb_category b ON a.id_category = b.id_category 
            WHERE title LIKE ? OR b.category_name LIKE ? OR location LIKE ?`, [sample, sample, sample], (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(err)
                    }
                })
        })
    }

}