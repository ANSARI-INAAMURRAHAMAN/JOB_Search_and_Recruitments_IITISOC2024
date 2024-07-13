const express = require('express');
const router = express.Router();
const mysql=require('mysql')
const multer=require('multer')
const { readFile } = require('fs').promises;
router.use(express.json());
router.use(express.urlencoded({extended:false}));
const {  
    authenticateSeeker, 
    authenticateRecruiter 
} = require('./middleware.js');

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'recruitment_project'
})
const { upload, upload2, upload3 } = require('./multerConfig.js');

db.connect((err)=>{
    if(err){
        throw err;
    }
    else{
        console.log('Connection with router3 Established!')
    }})

router.get('/resume/:Name', authenticateRecruiter,(req,response)=>{
    let sql=`SELECT file_name FROM resume INNER
    JOIN signup_seekers ON resume.User_name='${req.params.Name}'`
    db.query(sql,(err,res)=>{
        if(err){
            console.log(err);
            return response.send('Error');
        }
        else if(res.length>0)
        {    
            response.send(`<html><body>
            <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 20px;">
    <h2 style="margin-bottom: 20px;">Resume of the Client</h2>
    <embed src="${res[0].file_name}" width="100%" height="500px" type="application/pdf" style="border: 1px solid #ccc; border-radius: 4px;">
    <br>
    </div>
    </body></html>`);
        }else{
            response.send(`Candidate has not uploaded the resume`)
        }
})}
)

router.get('/cover_letter/:Name', authenticateRecruiter,(req,response)=>{ 
    
    let sql=`SELECT filename FROM cover_letter INNER
    JOIN signup_seekers ON cover_letter.username='${req.params.Name}'`
    db.query(sql,(err,res)=>{
        if(err){
            console.log(err);
            return response.send('Error');
        }
        else if(res.length>0)
        {    
            response.send(`<html><body style="font-family: Arial, sans-serif; text-align: center; margin-top: 20px;">
            <h2 style="margin-bottom: 20px;">Cover Letter of the Client</h2>
            <embed src="${res[0].filename}" width="100%" height="600px" type="application/pdf" style="border: 1px solid #ccc; border-radius: 4px;">
            <br>
        </body></html>`);
        }else{
            response.send(`Candidate has not uploaded the cover letter`)
        }
    })})
    module.exports=router
