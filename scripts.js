// navbar

let navbar = document.querySelector('.navbar');
let navList = document.querySelector('.navbar');
let navActive = document.querySelector('.nav-active');

window.addEventListener('scroll' ,()=> {
    if(window.scrollY > 100){
        navbar.style.backgroundColor='rgba(255, 255, 255, 0.5)';
        navbar.style.transition="0.5s";
        navActive.style.backgroundColor="rgba(255, 255, 255, 0.7)"
    }else{
        navbar.style.backgroundColor=' transparent';
    }
});

   

  
