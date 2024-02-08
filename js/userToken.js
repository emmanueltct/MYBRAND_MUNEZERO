

    let token=JSON.parse(localStorage.getItem("token"));
    
    if(token){
      
        fetch('https://mybrand-be-3-qrqs.onrender.com/api/users/auth/verifyToken',{
            headers: {
                'Authorization':token,
              }  
         })
        .then(res=>res.json())
        .then(result=>{

            if(result.message){
                loginButton.innerHTML='<a href="login.html"><button style="color:#FFFFFF">Login</button></a>'
            }else{

            let fname=result.names;
            fname=fname.split(" ")[0]
         const loginButton=document.getElementById("loginLink")
            loginButton.innerHTML=`<div class="dropdown">
                                    <button onclick="dropdown()" class="dropbtn">${fname}</button>
                                    <div id="myDropdown" class="dropdown-content">
                                    <a onclick="logout()">logout</a>
                                    </div>
                                 </div>
                                    `
            }
        })
            
      
    }

 
    function logout(){
        localStorage.removeItem("token");
        window.location.href='index.html'
    }




    function dropdown() {
        document.getElementById("myDropdown").classList.toggle("show");
      }
      
      // Close the dropdown if the user clicks outside of it
      window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      }