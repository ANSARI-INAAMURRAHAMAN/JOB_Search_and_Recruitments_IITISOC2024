const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const { readFile } = require('fs').promises;
router.use(express.json());
router.use(express.urlencoded({extended:false}));
// Database connection should be in index.js and passed to router if needed
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
        console.log('router2.js Connection Established!')
    }})
//Reading login and signup files
let loginHtml = '',loginHtml9='',loginHtml10='', loginHtml7='',loginHtml8='';
//to make the reading synchronous
const readHtmlFiles = async () => {

    loginHtml8 = await readFile('./public/chatwith.html', 'utf-8');
    loginHtml9 = await readFile('./public/job_findings.html', 'utf-8');
    loginHtml10 = await readFile('./public/show_all_hp.html', 'utf-8');
};
readHtmlFiles();
router.get('/queries', (req, response) => {
    const username=req.body.username
    const mail=req.body.input_email
    const msg=req.body.input_message
    console.log(req.body)
    let sql=`INSERT INTO queries VALUES('','${username}','${mail}','${msg}')`
    db.query(sql,(err,res)=>{
if(err){
    console.log(err)
}   
    else{
        response.send("Your Query Posted "+`<br>Now go back`)
    }
    })
});

router.get('/showall_joblistings', (req, response) => {
    let all_jobs=''
    let sql="SELECT* FROM job_listings"
    db.query(sql,(err,res)=>{
        if(err){console.log(err);res.send('Error')}
        else{
            res.forEach(e=>{
                all_jobs=all_jobs+`${loginHtml10}<br><div class="container"><h3 style=' color: #007bff;margin: 5px 0;'>${e.job_name}</h3>
                <div class="logo">
                <h5 style=color: #555555;'>Employer:-</h5><p style='font-size: 10px;
                margin: 5px 0;font-size: 16px;color: #333333;'>${e.Employer}</p>
                </div><p style="font-size:12px;">Employer Description</p><p>${e.description}</p><br></div><br>`
            })
            response.send(`<header style="width: 100%; background-color: #f8f9fa; padding: 10px 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); display: flex; justify-content: space-between; align-items: center; position: fixed; top: 0; left: 0; z-index: 1000;">
            <a href="../" style="color: #006699; text-decoration: none; display: flex; align-items: center;">
              <i class="fas fa-briefcase" style="margin-right: 8px; font-size: 24px;"></i>
              <h1 style="font-family: Arial, sans-serif; font-size: 24px; margin: 0; color: #006699;">CareerConnect</h1>
            </a>
            <h3 class="section-title" style="font-family: Arial, sans-serif; font-size: 20px; color: #333; margin: 0;">Some of the latest job news and openings</h3>
          </header>
          <br><br>
          `+all_jobs)
        }})
});

// Add other routes here

module.exports = router;

