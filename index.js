const express = require('express');

const mysql = require('mysql');
const app = express();
app.use(express.static('public'));

const router = require('./router'); 
const router3 = require('./router3.js');
const { readFile } = require('fs').promises;
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const http=require('http')

const socketio=require('socket.io')

const server = http.createServer(app);
const io = socketio(server);

const cloudinary = require('cloudinary');

cloudinary.v2.config({
  cloud_name: 'dq2skbvkx',
  api_key: '782254474184389',
  api_secret: 'YOUR_API_SECRET',
  secure: true,
});




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
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'recruitment_project'
});
db.connect((err)=>{
    if(err){
        //console.log(err)
        throw err;
    }
    else{
        console.log('Connection Established!')
    }})
//Reading login and signup files
let loginHtml = '',loginHtml9='',loginHtml10='',loginHtml11='',chat='',received='';
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
    chat=await readFile('./public/chat.html','utf-8');
    received=await readFile('./public/received.html','utf-8')
};

let username_seeker='';let username_recruiter='';

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

app.use('/', router2);

app.use('/',router3)
let job_name=''
app.post('/find_jobs', authenticateSeeker,async(req,response)=>{
    let jobs_found=''
    const name=req.body.name;
    console.log(name)
    let sql=`SELECT* FROM job_listings WHERE job_name LIKE '${name}%'`
    db.query(sql,(err,res)=>{
        if(err){
            console.log(err)
            return response.send('Error')
        }
        if(res.length>0){
            job_name=res[0].job_name;
            const jobListings = res.map(job => `
                <article class="job" data-aos="fade-up"  onclick="showDetails(event, this)">
                    <header>
                        <h3>${job.job_name}</h3>
                        <div class="company">
                            <img src="${job.Source}" alt="${job.Employer} logo">
                            <span>${job.Employer}</span>
                        </div>
                    </header>
                    <div class="job-details">
                        <p class="location"><i class="fas fa-map-marker-alt"></i> ${job.Location}</p>
                        <p class="description">${job.description}</p>
                        <div class="skills">
                            ${job.requirements.split(',').map(skill => `<span>${skill.trim()}</span>`).join('')}
                        </div>
                        <footer class="meta-info">
                            <p><i class="fas fa-clock"></i> Posted on ${new Date(job.reg_date).toLocaleDateString()}</p>
                            <p><i class="fas fa-briefcase"></i> ${job.employment_type}</p>
                        </footer>
                    </div>
                    <form action="../apply_jobs?job_name=${job.job_name}&employer=${job.Employer}" method="post" >
                    <input type="submit" value="Apply Now" class="apply-btn">
           </form>
           <p>After applying your resume and cover letter will be automatically sent</p>
                </article>
            `).join('');

            const updatedHtml = loginHtml9.replace('{{JOB_LISTINGS}}',`
                <section class="job-listing">
                    ${jobListings}
                </section>
            `);
            response.send(updatedHtml);
        }
    else{
        response.send('No jobs found!')
    }}) ; 
});
app.post('/filter',authenticateSeeker,(req,response)=>{
    let jobs_found=''
    const location=req.body.job_location
    const employment_type=req.body.employment_type
    let sql=`SELECT* FROM job_listings WHERE job_name ='${job_name}'
    AND Location= '${location}' AND employment_type='${employment_type}'`;
    db.query(sql,(err,res)=>{
        if(err){
            console.log(err)
        }
        if(res.length>0){
            const jobListings = res.map(job => `
                <article class="job" data-aos="fade-up"  onclick="showDetails(event, this)">
                    <header>
                        <h3>${job.job_name}</h3>
                        <div class="company">
                            <img src="${job.Source}" alt="${job.Employer} logo">
                            <span>${job.Employer}</span>
                        </div>
                    </header>
                    <div class="job-details">
                        <p class="location"><i class="fas fa-map-marker-alt"></i> ${job.Location}</p>
                        <p class="description">${job.description}</p>
                        <div class="skills">
                            ${job.requirements.split(',').map(skill => `<span>${skill.trim()}</span>`).join('')}
                        </div>
                        <footer class="meta-info">
                            <p><i class="fas fa-clock"></i> Posted on ${new Date(job.reg_date).toLocaleDateString()}</p>
                            <p><i class="fas fa-briefcase"></i> ${job.employment_type}</p>
                        </footer>
                    </div>
                    <form action="../apply_jobs?job_name=${job.job_name}&employer=${job.Employer}" method="post" >
                    <input type="submit" value="Apply Now" class="apply-btn">
           </form>
           <p>After applying your resume and cover letter will be automatically sent</p>
                </article>
            `).join('');

            const updatedHtml = loginHtml9.replace('{{JOB_LISTINGS}}', `
                <section class="job-listing">
                    ${jobListings}
                </section>
            `);
            response.send(updatedHtml);
        }
        else{
            response.send('No jobs found!')
        }
    })  
})

app.post('/apply_jobs', authenticateSeeker,(req,response)=>{
    let abcd=''
    let search=`SELECT *FROM job_listings WHERE employer ='${req.query.employer}' AND job_name='${req.query.job_name}'`
    db.query(search,(err,res)=>{
        if(err){console.log(err)
        }
        else if(res.length>0){
            abcd=res[0].Applicants;
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
                    else{response.send(`<h2 style="text-align:center;">Job application Posted!</h2>`)
                    }
                })
            }
            else {
                let updated='';
                if(abcd.length===0){
                    updated=req.session.seekerUsername
                }
                else{
                updated=abcd+','+req.session.seekerUsername
                }
                let sql_updated=`UPDATE job_listings SET Applicants =  '${updated}'
                WHERE employer ='${req.query.employer}' AND job_name='${req.query.job_name}' ;`
                db.query(sql_updated,(err,res)=>{
                    if(err){console.log(err)}
                    else{
                        response.send(`<h2 style="text-align:center;">Job application Posted!</h2>`);
                    }
                })
            }}
    })
    })


let applicant_list=''
app.get('/see_applicants_jobs', authenticateRecruiter, (req, response) => {
    let sqlnew = `SELECT job_name, Applicants FROM job_listings WHERE employer='${req.session.recruiterUsername}'`;
    db.query(sqlnew, (err, res) => {

        if (err) {
            console.log(err);
            return response.status(500).send('An error occurred');
        }

        if (res.length === 0) {
            return response.send('<main><p>No Applicants</p></main>');
        }

        let html = '';
        res.forEach(job => {
            const applicants = job.Applicants.split(',').filter(a => a.trim() !== '');
            html += `
                <div class="role">
                    <h2>Applicants for ${job.job_name}</h2>
                    <div class="applicants-container">
            `;

            applicants.forEach(applicant => {
                html += `
                    <div class="applicant-card">
                        <h3>${applicant}</h3>
                        <p>View the profile of this applicant</p>
                        <form action="../see_profile/${applicant}" method="get">
                            <button type="submit" class="btn">See Profile</button>
                        </form>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        response.send(loginHtml7.replace('<!-- Your dynamic content will be inserted here -->', html));

    });
});
app.get('/message_rec/:name',authenticateRecruiter,(req,response)=>{
    response.send(`${chat}`)
                
});



app.get('/message/:Name',authenticateSeeker,(req,response)=>{
   
    response.send(`${received}`)
    
})


const routerUpload = require('./router_upload'); // Adjust the path as needed
app.use('/', routerUpload);

const router4=require('./router4.js')
app.use('/',router4)

server.listen(5000
    )



/*res.forEach(e=>{
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
       */
