function showMenu() {
  
    const leftSide= document.getElementById("left-side");
       leftSide.style.display="flex";
     document.getElementById("left-side").style.width = "210px";
     document.getElementById("show-menu").style.display="none";
     document.getElementById("close-menu").style.display="block";
    
   }
   
       function closeMenu() {
       document.getElementById("left-side").style.width = "0";
       document.getElementById("show-menu").style.display= "block";
       document.getElementById("close-menu").style.display="none";
       }



function myFunction() {
 // let w = window.innerWidth;
 // let h = window.outerHeight;
 /*
  if(w>=600){
    document.getElementById("left-side").style.display="flex";
    document.getElementById("left-side").style.display="210px";
    document.getElementById("show-menu").style.display= "none";
    document.getElementById("close-menu").style.display="none";
  }
  */
 //return w
}

