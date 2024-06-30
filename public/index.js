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
    
    document.getElementById("contact-form").addEventListener('submit',()=>{
      document.getElementById("input-name").value=''
      document.getElementById("input-name").focus()
      document.getElementById("input-message").value=''
      document.getElementById("input-message").focus()
      document.getElementById("input-email").value=''
      document.getElementById("input-email").focus()
    })
    
    // Night mode toggle functionality
    const nightModeToggle = document.getElementById("night-mode-toggle");
    const body = document.body;
  
    nightModeToggle.addEventListener("click", function () {
      body.classList.toggle("night-mode");
    });
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

