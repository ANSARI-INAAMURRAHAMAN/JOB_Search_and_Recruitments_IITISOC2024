const express = require('express');
const router = express.Router();
const { login, login_recruiter } = require('./login'); // Import login functions from login.js
const mysql=require('mysql')
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'recruitment_project'
})
db.connect((err)=>{
    if(err){
        throw err;
    }
    else{
        console.log('Connection Established!')
    }})
router.post('/login_seeker_login', async (req, res) => {
    const { name, email, pass } = req.body;
    try {
        const file = await login(name, email, pass);
        if (file === 'Found') {
            req.session.seekerAuth = true;
            req.session.seekerUsername =name;
            res.redirect('/user_seeker');
        } else {
            res.send('Not Found');
        }
    } catch {
        res.send('No! error h');
    }
});

router.post('/login_recruiter/login', async (req, res) => {
    const { name, email, pass } = req.body;
    try {
        const file = await login_recruiter(name, email, pass);
        if (file === 'Found') {
            req.session.recruiterAuth = true;
            req.session.recruiterUsername =name;
            res.redirect('/user_recruiter');
        } else {
            res.send('Not authorized');
        }
    } catch (error) {
        console.log(error);
        res.send('Error! ');
    }
});


router.post('/signup_recruiter', (req, response) => {
    const { name, email, pass } = req.body;
    let sql = '';
    if (name && pass) {
        sql = `INSERT INTO signup_recruiter VALUES('','${name}','${email}','${pass}')`;
    }
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            response.send('Error');
        } else {
            req.session.recruiterAuth = true;
            req.session.recruiterUsername = name;
            response.redirect('/user_recruiter');
        }
    });
});

router.post('/signup_seeker', (req, response) => {
    const { name, email, pass } = req.body;
    let sql = `INSERT INTO signup_seekers VALUES('','${name}','${email}','${pass}')`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            response.send('error');
        } else {
            req.session.seekerAuth = true;
            req.session.seekerUsername = name;
            response.redirect('/user_seeker');
        }
    });
});

module.exports = router;