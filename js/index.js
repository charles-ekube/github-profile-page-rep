// document.getElementById('search-label').onclick =  () => {
//     .style.background='yellow';
// }
document.getElementById("search-label").addEventListener("click", function() {
    document.getElementById("search-label").style.width = '400px';
  });



const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click',  () => {
    if(mobileMenu.style.display = "none"){
        mobileMenu.style.display = "block";
    }
    else if(mobileMenu.style.display = "block") {
        mobileMenu.style.display="none";
    }
})
