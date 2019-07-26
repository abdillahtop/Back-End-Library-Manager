const connection = require('../configs/db')

module.exports = {
    getUsers: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    userDetail: (userid) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE user_id  = ?', userid, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    register: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO users SET ?', data, (err, result) => {
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
            connection.query('SELECT user_id, email, full_name,salt, password, created_at, updated_at FROM users WHERE email = ?', email, (err, result) => {
                if (!err) {
                    resolve(result)
                    connection.query('UPDATE users SET status = 1 WHERE email = ?', email)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    logout: (userid) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE users SET status = 0 WHERE user_id = ?`, userid, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    loanUser: (IdCard) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT a.book_name , b.borrow_date, b.return_date FROM tb_book a Join tb_pinjam b WHERE a.id_book = b.id_book AND b.no_ktp= ?`, IdCard, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    }

}