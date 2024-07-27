const express = require('express');
const router = express.Router();
const mysql = require('mysql');
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
let loginHtml9='',loginHtml10='', loginHtml8='';
//to make the reading synchronous
const readHtmlFiles = async () => {

    loginHtml8 = await readFile('./public/html8.html', 'utf-8');
    loginHtml9 = await readFile('./public/job_findings.html', 'utf-8');
    loginHtml10 = await readFile('./public/show_all_hp.html', 'utf-8');
};
readHtmlFiles();

router.post('/queries', (req, response) => {
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
    let sql="SELECT* FROM job_listings"
    let skills=[]
    db.query(sql,(err,res)=>{
        if(err){console.log(err);
            res.send('Error')}
        else{
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
            </article>
        `).join('');

        const updatedHtml = loginHtml10.replace('{{JOB_LISTINGS}}', `
            <section class="job-listing">
                ${jobListings}
            </section>
        `);
        response.send(updatedHtml);
        }})
});

module.exports = router;

