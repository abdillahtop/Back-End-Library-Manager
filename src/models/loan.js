const connection = require('../configs/db')

module.exports = {

    newLoan: (data) => {
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

    getLoan: () => {
        return new Promise((resolve, rejected) => {
            connection.query(`SELECT id_pinjam, b.id_book, b.title, id_card, name, is_return ,forfeit, borrow_date, return_date,expaired
        FROM tb_pinjam a JOIN tb_book b ON a.id_book = b.id_book`, (err, result) => {
                    if (!err) {
                        resolve(result)
                    } else {
                        rejected(err)
                    }
                })
        })
    },

    loanDetail: (cardid) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT b.id_pinjam, b.id_book, a.title ,a.writter, a.image, b.borrow_date, b.return_date, b.expaired, b.forfeit, b.expaired FROM tb_book a Join tb_pinjam b WHERE a.id_book = b.id_book AND b.id_card = ?`, cardid, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    updateLoan: (loanid, data) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE tb_pinjam SET ? WHERE id_pinjam = ?`, [data, loanid], (err, result) => {
                if (!err) {
                    resolve(result)
                    connection.query(`UPDATE tb_book SET status = "Tersedia" WHERE id_book = ?`, data.id_book)
                } else {
                    reject(err)
                }
            })
        })
    },

    deleteLoan: (loanid) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM tb_pinjam WHERE id_pinjam = ?`, loanid, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
}