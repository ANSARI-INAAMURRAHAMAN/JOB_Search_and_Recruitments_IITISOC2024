const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const { authenticateSeeker, authenticateRecruiter } = require('./middleware.js');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'recruitment_project'
});

db.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('Connection with router3 Established!');
    }
});

router.get('/resume/:Name', authenticateRecruiter, (req, response) => {
    let sql = `SELECT resume.file_name FROM resume
               JOIN signup_seekers ON resume.User_name = signup_seekers.username
               WHERE signup_seekers.username = ?`;
    db.query(sql, [req.params.Name], (err, res) => {
        if (err) {
            console.error(err);
            return response.send('Error');
        } else if (res.length > 0) {
            response.send(`
                <html>
                <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 20px;">
                    <h2 style="margin-bottom: 20px;">Resume of the Client</h2>
                    <embed src="${res[0].file_name}" width="55%" height="500px"  style="border: 1px solid #ccc; border-radius: 4px;">
                    <br>
                </body>
                </html>
            `);
        } else {
            response.send('Candidate has not uploaded the resume');
        }
    });
});

router.get('/cover_letter/:Name', authenticateRecruiter, (req, response) => {
    let sql = `SELECT cover_letter.filename FROM cover_letter
               JOIN signup_seekers ON cover_letter.username = signup_seekers.username
               WHERE signup_seekers.username = ?`;
    db.query(sql, [req.params.Name], (err, res) => {
        if (err) {
            console.error(err);
            return response.send('Error');
        } else if (res.length > 0) {
            response.send(`
                <html>
                <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 20px;">
                    <h2 style="margin-bottom: 20px;">Cover Letter of the Client</h2>
                    <embed src="${res[0].filename}" width="50%" height="600px"  style="border: 1px solid #ccc; border-radius: 4px;">
                    <br>
                </body>
                </html>
            `);
        } else {
            response.send('Candidate has not uploaded the cover letter');
        }
    });
});

module.exports = router;
