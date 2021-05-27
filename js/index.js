// document.getElementById('search-label').onclick =  () => {
//     .style.background='yellow';
// }
// document.getElementById("search-label").addEventListener("click", function() {
//     document.getElementById("search-label").style.width = '400px';
//   });



// const mobileMenuBtn = document.getElementById("mobile-menu-btn");
// const mobileMenu = document.getElementById('mobile-menu');

// mobileMenuBtn.addEventListener('click',  () => {
//     if(mobileMenu.style.display = "none"){
//         mobileMenu.style.display = "block";
//     }
//     else if(mobileMenu.style.display = "block") {
//         mobileMenu.style.display="none";
//     }
// })

// mobile nav toggle function
const mobileNavToggle = document.getElementById('mobile-nav-toggle');
const mobileNavDropdown = document.getElementById('mobile-nav-dropdown');

mobileNavToggle.onclick = () => {
    
        if(mobileNavDropdown.style.display === 'none'){
    
            mobileNavDropdown.style.display = 'block';
        }
        else {
            mobileNavDropdown.style.display = 'none';
        }
    }


// tabs function
const toggleTabs = (e, tabName) => {
    
    const tabsContent = document.getElementsByClassName('tabs-content-item');
    const tabLinks = document.getElementsByClassName('tabs-list-item');

    for (var i = 0; i < tabsContent.length; i++) {
        tabsContent[i].style.display = 'none';
    }
    
    for (var i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace('active', '');
    }

    document.getElementById(tabName).style.display = 'block';
    e.currentTarget.className += 'active';
    

    

} 
