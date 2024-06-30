const express = require('express');const path=require('path');
const app = express();
app.use(express.static('public'));
const mysql=require('mysql');
const router = require('./router'); // Import the login signup router
const{sendFile}=require('fs')
const { readFile } = require('fs').promises;
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const http=require('http')
const bcrypt = require('bcrypt');
const socketio=require('socket.io')
//to create a socket server
app.set("view engine","ejs")
const session=require('express-session')
app.use(session({
    secret:'Some secret',
    resave:false,
    saveUninitialized:false,
}));

const { 
    authenticateSeeker, 
    authenticateRecruiter 
} = require('./middleware.js');

const { upload, upload2, upload3 } = require('./multerConfig.js');
app.set("view engine","ejs")

//routes for login
app.use('/', router);
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
//Reading login and signup files
let loginHtml = '',loginHtml9='',loginHtml10='',loginHtml11='', loginHtml1 = '', loginHtml2 = '', loginHtml3 = '', loginHtml4 = '', loginHtml5 = '', loginHtml6 = '', loginHtml7='',loginHtml8='';
//to make the reading synchronous
const readHtmlFiles = async () => {
    loginHtml = await readFile('./public/login_seeker.html', 'utf-8');
    loginHtml1 = await readFile('./public/login_recruiter.html', 'utf-8');
    loginHtml2 = await readFile('./public/signup_seeker.html', 'utf-8');
    loginHtml3 = await readFile('./public/signup_recruiter.html', 'utf-8');
    loginHtml4 = await readFile('./public/seekers_dashboard.html', 'utf-8');
    loginHtml5 = await readFile('./public/recruiter_dashboard.html', 'utf-8');
    loginHtml6 = await readFile('./public/seeker_profile.html', 'utf-8');
    loginHtml7 = await readFile('./public/seeapplicants.html', 'utf-8');
    loginHtml8 = await readFile('./public/chatwith.html', 'utf-8');
    loginHtml9 = await readFile('./public/job_findings.html', 'utf-8');
    loginHtml10 = await readFile('./public/show_all_hp.html', 'utf-8');
    loginHtml11=await readFile('./public/applyerror.html','utf-8')
};
let username_seeker=''
let username_recruiter=''
readHtmlFiles();
const router2 = require('./router2'); //general home page
app.get('/login_seeker',(req,res)=>{
    res.send(loginHtml)
})
app.get('/login_recruiter',(req,res)=>{
    res.send(loginHtml1)
})
app.get('/signup_seeker',(req,res)=>{
    res.send(loginHtml2)
})
app.get('/signup_recruiter',(req,res)=>{
    res.send(loginHtml3)
})
//login functions only set up as modules in login.js
//dashboards and other page
app.get('/user_seeker', authenticateSeeker,(req,res)=>{
    console.log( `  seeker dashboard`)
    username_seeker=req.session.seekerUsername
    res.send(` <h1>Welcome ${username_seeker}</h1><br> ${loginHtml4}<br>`)
})
app.get('/user_recruiter',authenticateRecruiter,(req,res)=>{
    console.log( `  recruiter dash_board `)
    username_recruiter=req.session.recruiterUsername;
    res.send(`<h2>Welcome ${username_recruiter}</h2> ${loginHtml5} <br>`)
})

app.use('/', router2);

let profile=''
app.get('/seeker_profile', authenticateSeeker,(req,response)=>{
    let sql=`SELECT* FROM profile_seeker WHERE username='${username_seeker}'`;
    db.query(sql,(err,res)=>{
        if(err){
            console.log(err)
        }else if(res.length>0){
            profile=`${loginHtml6} <div class="profile">
            <h1>Job Seeker Profile</h1><h2>Set up your profile as visible to the recruiter</h2>
            <form action="profile_setup.html">
              <input type="submit" value="Edit Profile" class="edit-btn"></form>
            <div class="section"><h2>About Me</h2>
              <div class="about_self">${res[0].description}</div></div>
            <div class="section"><h2>Skills</h2>
              <div class="skills">${res[0].skills}</div></div></div>`
            response.send(`${profile}`)
        }
        else{
            response.redirect(`/see_profile`)
        }
    })
})
app.get('/see_profile', authenticateRecruiter,(req,response)=>{
    let sql=`SELECT* FROM profile_seeker WHERE username='${username_seeker}'`;
    db.query(sql,(err,res)=>{
        if(err){
            console.log(err)
        }else if(res.length>0){
            profile=`${loginHtml6} <div class="profile">
             <h2>Applicant's profile summary</h2> <div class="about_self">${res[0].description}</div><br>
            <h2>Applicant Skills</h2><div class="skills">${res[0].skills}</div></div>
            ${loginHtml8}`
            response.send(`${profile}`)
        }
        else{
            response.sendFile(path.join(__dirname, 'public', 'profile_setup.html'));
        }})
})

app.post('/setup_profile', authenticateSeeker,(req,response)=>{
     console.log('   setup wala route')
     let skills = [];
        const desc = req.body.desc;
        req.body.skills.forEach(e => {
            skills.push(e);
        });
        let skillString = skills.join(',');
        let sql = `INSERT INTO profile_seeker VALUES('', '${username_seeker}', '${desc}', '${skillString}')`;
        db.query(sql, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                response.redirect('/seeker_profile');
            }
        });
})

app.post('/post_jobs',[upload3.single('image_employer'), authenticateRecruiter],(req,response)=>{
    let msg1=''
    const { title, job_description: description, qualifications: requirement, dropdownOptions: location } = req.body;
    const currentDateTime = new Date().toLocaleString();
    let sql=`INSERT INTO job_listings VALUES('','${title}','/images_logo/${req.file.filename}',
    '${description}','${username_recruiter}','${requirement}','${location}',' ','${currentDateTime}')`
    db.query(sql,(err,res)=>{
        if(err){
            msg1=err
            console.log(err)
        }
        else{
            response.send('Posted')
        }})
})
app.post('/find_jobs', authenticateSeeker,async(req,response)=>{
    let jobs_found=''
    const name=req.body.name;
    const filter=req.body.skills;
    let sql=`SELECT* FROM job_listings WHERE job_name LIKE '${name}%'`//AND LIKE '${filter}%'
    db.query(sql,(err,res)=>{
        if(err){
            console.log(err)
            return response.send('Error')
        }
        if(res.length>0){
            res.forEach(e=>{
                jobs_found=jobs_found+`<div class="findings">
                <h2 style="margin-bottom: 10px; color: #007bff;">${e.job_name} at ${e.Employer}</h2>
                <div style="margin-bottom: 10px;">
                    <img src="${e.Source}" width="50" height="80" alt="Logo" style="border-radius: 4px;" > 
                 </div>    ${loginHtml9}  </div><br>`
            })
            response.send(`${jobs_found}`)
        }
    else{
        response.send('No jobs found!')
    }
}) ; 
});

app.post('/apply_jobs', authenticateSeeker,(req,response)=>{
        let sql=`UPDATE job_listings
        SET Applicants =  '${username_seeker}'
        WHERE employer ='Abhijit kashyap' AND job_name='Web developer' ;`
        //Replace the names with the one selected by the user...
        db.query(sql,(err,res)=>{
            if(err){
                console.log(err)
            }
            else{
                response.send('Job application Posted!')
            }
        })}
)

app.get('/see_applicants_jobs', authenticateRecruiter,(req,response)=>{
    console.log(' Recruiter')
    response.send(`<body >
    <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center; max-width: 500px;">
        <h2 style="margin-bottom: 20px; color: #007bff;">See the resume for the candidate</h2>
        <h4 >Name of applicant: ${username_seeker}</h4>
    ${loginHtml7}`)
});

const routerUpload = require('./router_upload'); // Adjust the path as needed
app.use('/', routerUpload);

app.get('/resume', authenticateRecruiter,(req,response)=>{
 
    let sql=`SELECT file_name FROM resume INNER
    JOIN signup_seekers ON resume.User_name='${username_seeker}'`
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

app.get('/cover_letter', authenticateRecruiter,(req,response)=>{ 
    
    let sql=`SELECT filename FROM cover_letter INNER
    JOIN signup_seekers ON cover_letter.username='${username_seeker}'`
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
            response.send(`Candidate has not uploaded the resume`)
        }
    })})
//When user presses submit it will go to the upload middleware


app.listen(5000)