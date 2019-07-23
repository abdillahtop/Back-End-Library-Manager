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
                } else {
                    reject(new Error(err))
                }
            })
        })
    }

}