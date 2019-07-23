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

    getBooks: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT a.id_book, book_name, writter, location, image, b.category_name, description, status, created_at, updated_at
            FROM tb_book a JOIN tb_category b ON a.id_category = b.id_category`, (err, result) => {
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
            connection.query(`SELECT a.id_book, book_name, writter, location, image, b.category_name, description, status, created_at, updated_at
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
            connection.query(`SELECT a.id_book, book_name, writter, location, image, b.category_name , description, status, created_at, updated_at
            FROM tb_book a JOIN tb_category b ON a.id_category = b.id_category 
            WHERE book_name LIKE ? OR b.category_name LIKE ? OR location LIKE ?`, [sample, sample, sample], (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(err)
                    }
                })
        })
    },

    newBorrow: (data) => {
        return new Promise((resolve, rejected) => {
            connection.query(`INSERT INTO tb_pinjam SET ?`, data, (err, result) => {
                if (!err) {
                    resolve(result)
                    connection.query(`UPDATE tb_book SET status = 'Tidak tersedia' WHERE id_book =?`, [data.id_book])
                } else {
                    rejected(err)
                }
            })
        })
    },

    getBorrow: () => {
        return new Promise((resolve, rejected) => {
            connection.query(`SELECT id_pinjam, b.id_book, b.book_name, no_ktp, name, is_return ,borrow_date, return_date
            FROM tb_pinjam a JOIN tb_book b ON a.id_book = b.id_book`, (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        rejected(err)
                    }
                })
        })
    },

    updateBorrow: (loaningid, data) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE tb_pinjam SET ? WHERE id_pinjam = ?`, [data, loaningid], (err, result) => {
                if (!err) {
                    resolve(result)
                    connection.query(`UPDATE tb_book SET status = "Tersedia" WHERE id_book = ?`, data.id_book)
                } else {
                    reject("Dari update borrow:", err)
                }
            })
        })
    },

    register: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO users SET ?`, data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    getByEmail: (email) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT user_id, email, full_name, created_at, updated_at, salt, password FROM user WHERE email = ?', email, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }

}