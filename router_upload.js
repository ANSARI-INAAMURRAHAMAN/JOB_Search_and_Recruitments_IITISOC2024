const express = require('express');
const router = express.Router();
const multer = require('multer');
const mysql=require('mysql')
const { 
    authenticate, 
    authenticateSeeker, 
    authenticateRecruiter 
} = require('./middleware.js');
const { upload, upload2, upload3 } = require('./multerConfig.js');

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
        console.log('Connection with router_upload Established!')
    }})
router.post('/resume_upload', [upload.single('image_res'), authenticateSeeker], (req, response) => {
    const sql = `INSERT INTO resume VALUES('',
     '/images_resume/${req.file.filename}',
      'application/pdf',
       '${req.session.seekerUsername}')`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            return response.send(`
                <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 20px;">
                    <h2 style="color: red; margin-bottom: 20px;">Error: Unable to upload</h2>
                </body>`);
        } else {
            response.send(`<body style="font-family: Arial, sans-serif; text-align: center; margin-top: 20px;">
                <h3 style="margin-bottom: 20px;">Resume Uploaded</h3>
            </body>`);
        }
    });
});

router.post('/cover_letter_upload', [upload2.single('image_cov'), authenticateSeeker], (req, response) => {
    
    const sql = `INSERT INTO cover_letter VALUES('', '/images_cover/${req.file.filename}', '${req.session.seekerUsername}', '')`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            return response.send(`
                <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 20px;">
                    <h2 style="color: red; margin-bottom: 20px;">Error: Unable to upload</h2>
                </body>`);
        } else {
            response.send(`<body style="font-family: Arial, sans-serif; text-align: center; margin-top: 20px;">
                <h3>Cover Letter Uploaded</h3>
            </body>`);
        }
    });
});

module.exports = router;