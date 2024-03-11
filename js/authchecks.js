

    let token=JSON.parse(localStorage.getItem("token"));
    let url_check="https://mybrand-be-3-qrqs.onrender.com"
    
    document.querySelector('.right-side').style.opacity='0.1'
    //  showMessage('wait we are verifying if you have right access to this page ......................')
    if(!token){
       window.location.href='login.html'
    }else{
         fetch(url_check+'/api/users/auth/verifyToken',{
            headers: {
                'Authorization':token,
              }  
         })
        .then(res=>res.json())
        .then(result=>{
            
           // console.log(result)
            if(result.message){
                showMessage(result.message)
                setTimeout(() => {
                    window.location.href='login.html'
                  }, 3000);

            }else if (result.user!=='admin'){
              let  isServerError=true
                const message='Sorry !! you are not allowed to access this page'
                 showMessage(message,isServerError)
                setTimeout(() => {
                    window.location.href='index.html'
                  }, 3000);    
                
            }else{
                setTimeout(() => {
                    document.querySelector('.right-side').style.opacity='1'
                    document.querySelector('.user-info-box1 .user').innerHTML=result.user+" - "+result.names
                    
                  }, 2000); 
               
            }
        })
            
    }
  
const userLogout=()=>{
    localStorage.removeItem("token");
    window.location.href='index.html'
}

