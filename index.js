const express = require('express');const path=require('path');
const app = express();
app.use(express.static('public'));
const mysql=require('mysql');
const router = require('./router'); 
const router3 = require('./router3.js');
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
let loginHtml = '',loginHtml9='',loginHtml10='',loginHtml11='';
let loginHtml1 = '', loginHtml2 = '', loginHtml3 = '', loginHtml4 = '', loginHtml5 = '', loginHtml6 = '', loginHtml7='',loginHtml8='';
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
    loginHtml8 = await readFile('./public/html8.html', 'utf-8');
    loginHtml9 = await readFile('./public/job_findings.html', 'utf-8');
    loginHtml10 = await readFile('./public/show_all_hp.html', 'utf-8');
    loginHtml11 = await readFile('./public/applyerror.html','utf-8')
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

app.use('/', router2);

app.use('/',router3)

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
                jobs_found=jobs_found+`<div class="job" data-aos="fade-up">
                <h3 id="name">${e.job_name}</h3>
                <div class="company">
                    <img src="${e.Source}" alt="Company Logo">
                    <p>${e.Employer}</p></div>
                <div class="location">
                    <i class="fas fa-map-marker-alt"></i>
                    <p>${e.Location}</p> </div>
                <p>${e.description}.</p>
                <div class="skills">
                        <span>${e.requirements}</span>
                    </div>
                     <p style="margin-bottom: 10px;"><strong>Apply here</strong></p>
                     <form action="../apply_jobs?job_name=${e.job_name}&employer=${e.Employer}" method="post" style="margin-top: 10px;">
                     <input type="submit" value="Apply Now" style="background-color: #007bff; color: white; border: none;
                     padding: 10px 20px; cursor: pointer; border-radius: 4px;">
            </form>
            <p>By applying your resume and cover letter will be automatically sent</p>
                 </div></div><br>`
            })
            response.send(  `${loginHtml9}`+`<div class="job-listing">
            ${jobs_found}
            </div>`)
        }
    else{
        response.send('No jobs found!')
    }}) ; 
});


app.post('/apply_jobs', authenticateSeeker,(req,response)=>{
    //console.log(req.query)
    let abcd=''
    let search=`SELECT *FROM job_listings WHERE employer ='${req.query.employer}' AND job_name='${req.query.job_name}'`
    db.query(search,(err,res)=>{
        if(err){console.log(err)
        }
        else{
            abcd=res[0].Applicants;
            console.log(res[0].Applicants)
            const str = abcd;
            const searchTerm = req.session.seekerUsername;

            if (str.indexOf(searchTerm) !== -1) {
                response.send('Already applied')
            } 
            
            else if(abcd===''){
            let sql=`UPDATE job_listings SET Applicants =  '${req.session.seekerUsername}'
                WHERE employer ='${req.query.employer}' AND job_name='${req.query.job_name}' ;`
                //Replace the names with the one selected by the user...
            db.query(sql,(err,res)=>{
                    if(err){console.log(err)
                    }
                    else{response.send('Job application Posted!')
                    }
                })
            }
            else {
                let updated='';
                if(abcd.length===0){
                    updated=req.session.seekerUsername
                }
                updated=abcd+','+req.session.seekerUsername
                let sql_updated=`UPDATE job_listings SET Applicants =  '${updated}'
                WHERE employer ='${req.query.employer}' AND job_name='${req.query.job_name}' ;`
                db.query(sql_updated,(err,res)=>{
                    if(err){console.log(err)}
                    else{
                        response.send('Job application Posted!');
                    }
                })
            }}
    })
    })


let applicant_list=''
app.get('/see_applicants_jobs', authenticateRecruiter,(req,response)=>{
   let sql=`SELECT Applicants FROM job_listings WHERE employer='${req.session.recruiterUsername}'`
   let sqlnew=`SELECT job_name,Applicants FROM job_listings WHERE employer='${req.session.recruiterUsername}'`
   /*let job_name=''
   db.query(sqlnew,(err,res)=>{
    if(err){console.log(err)}
    else{
        //console.log(res)
        const pos = res.filter(row => console.log(row));
    }
   })
   */
   db.query(sqlnew,(err,res)=>{
    if(err){
        console.log(err)
    }
    if(res.length===0){
        response.send('No Applicants')
    }
    else{
        let html=''
        console.log(res)
        applicant_list=res[0].Applicants.split(',')
        let arr=[]
        
        for(let i=0;i<res.length;i++){
            res.forEach(e=>{
                console.log(e)
            })
        }
       res.forEach(e=>{
       console.log(e.Applicants+e.job_name)
       html= html+ `<body >
       <h1>For the role of${e.job_name}</h1>
        <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd;
        border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center; max-width: 500px;">
        <h2 style="margin-bottom: 20px; color: #007bff;">See the resume for the candidate</h2>
        <h4 >Name of applicant: ${e.Applicants}</h4>
        <p style="font-size: 16px; color: #333;">See the profile page of the applicant</p>
        <form action="../see_profile/${e.Applicants}" method="get" style="margin-bottom: 10px;">
            <input type="submit" value="See Profile" class="btn"
            style="background-color: #007bff; color: #fff; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 14px;">
        </form>
    </div>
        ${loginHtml7}`+`<br>`
       })
       
        response.send(html)
    }
   })
});
/*
 response.send()
*/
const routerUpload = require('./router_upload'); // Adjust the path as needed
app.use('/', routerUpload);

const router4=require('./router4.js')
app.use('/',router4)

app.listen(5000)
