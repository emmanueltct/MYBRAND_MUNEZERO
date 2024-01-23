

const mediaQuery = window.matchMedia('(max-width: 768px)')

       
// var status=true;
     document.getElementById("show-menu").addEventListener("click", showNavigation);
     document.getElementById("close-menu").addEventListener("click", hideNavigation);
     document.getElementById("link").addEventListener("click", handleLink);



     var elements = document.getElementById("link");
     var togleMenue=document.getElementById("togle-menu");
     var showMenu=document.getElementById("show-menu");
     var closeMenu=document.getElementById("close-menu");


 function showNavigation() {
     elements.style.display="flex";
     showMenu.style.display="none";
     closeMenu.style.display="flex";
     closeMenu.style.marginTop="35%";
     //alert("buton clicked"+status)
 }

 function hideNavigation() {
     elements.style.display="none";
     closeMenu.style.display="none";
     showMenu.style.display="flex";
     showMenu.style.marginTop="35%";
 }

 function handleLink() {
     if(handleTabletChange(mediaQuery)){
     elements.style.display="none";
     closeMenu.style.display="none";
     showMenu.style.display="flex"; 
     showMenu.style.marginTop="35%";
     }
 }


 function handleTabletChange(e) {
 // Check if the media query is true
  if (e.matches) {
      elements.style.display="none";
     return true;  
     }else{
         elements.style.display="flex";
         return false; 
     }
 }

mediaQuery.addListener(handleTabletChange)

// Initial check
handleTabletChange(mediaQuery)

const menu= document.getElementById('nav-bar');
window.addEventListener('scroll', function() {  
    if (window.scrollY > 0) {
        menu.style.backgroundColor="#edf1f7";
       
    }else{
        menu.style.backgroundColor="#FFF";  
    } 
})