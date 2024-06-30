const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'recruitment_project'
});
db.connect()

function login(name, email, password) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM signup_seekers WHERE Username='${name}' AND Email='${email}' AND Password='${password}'`;
        db.query(sql, (err, res) => {
            if (err) {
                console.log(err);
                return reject('Error');
            } else {
                if (res.length === 0) {
                    return resolve('Not Found');
                } else {
                    return resolve('Found');
                }
            }
        });
    });
}

function login_recruiter(name, email, password) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM signup_recruiter WHERE Username='${name}' AND Email='${email}' AND Password='${password}'`;
        db.query(sql, (err, res) => {
            if (err) {
                console.log(err);
                return reject('Error');
            } else {
                if (res.length === 0) {
                    return resolve('Not Found');
                } else {
                    return resolve('Found');
                }
            }
        });
    });
}

module.exports = { login, login_recruiter };