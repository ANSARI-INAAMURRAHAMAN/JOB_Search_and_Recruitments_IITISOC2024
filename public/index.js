document.addEventListener("DOMContentLoaded", function () {
    // Back to top button functionality
    let backToTopButton = document.getElementById("back-to-top");
  
    window.addEventListener("scroll", function () {
      if (window.scrollY > 200) {
        backToTopButton.style.display = "block";
      } else {
        backToTopButton.style.display = "none";
      }
    });
  
    backToTopButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
    
    const jobCards = document.querySelectorAll('.job-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  jobCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    observer.observe(card);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Add loading animation to form submission
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    this.classList.add('loading');
    // Simulate form submission
    setTimeout(() => {
      this.classList.remove('loading');
      this.reset();
      alert('Message sent successfully!');
    }, 2000);
  });
});
    
    // Night mode toggle functionality
    const nightModeToggle = document.getElementById("night-mode-toggle");
    const body = document.body;
  
    nightModeToggle.addEventListener("click", function () {
      body.classList.toggle("night-mode");
    });

  

/*const form=document.querySelector('.form');
document.querySelector('.sp').addEventListener('click',function(e){
    e.preventDefault()
    const search=new FormData(form)
    const payload=new URLSearchParams(search);
    const options={
    method:'POST',
    body:payload
};
fetch('../api',options)
.then(res=>{res.json().then(val=>{
    console.log(val)
}).catch(err=>
    console.log(err)
);
});
})
*/
















/*
const form=document.querySelector('.form');
let data=document.querySelector('.empty')
form.addEventListener('submit',function(e){
    e.preventDefault()
    const pay=new FormData(form);
    const payload=new URLSearchParams(pay);
    const options={
        method:'POST',
        body:payload,
    };
    fetch('../api/2',options)
    .then((res)=> res.json())
    .then((val)=>{
        data.innerHTML=' '
        val.data.forEach((person) => {
            data.innerHTML+=`${person.name}    `
        }); 
    })
    .catch(err=>{
        console.log(err)
    })
});
*/

