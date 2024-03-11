//let url="https://mybrand-be-3-qrqs.onrender.com"
let url="https://mybrand-be-3-qrqs.onrender.com"
let isServerError=false
const userLogin=async(formData)=>{
    document.querySelector('.loader').style.display='block'
    document.querySelector('.submit-button').style.display='none'
    await fetch(url+'/api/users/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email:formData.email,
          password:formData.password
        })
      }).then(response => response.json())
        .then(data =>{

            if(data.inputError){
               isServerError=true
                showMessage(data.inputError, isServerError) 
                document.querySelector('.loader').style.display='none'
                document.querySelector('.submit-button').style.display='block'
            }else{
              isServerError=true
                showMessage(data.message, isServerError) 
                 document.querySelector('.loader').style.display='none'
                 document.querySelector('.submit-button').style.display='block'
                if(data.token){
                  let token=data.token
                  localStorage.setItem("token" ,JSON.stringify(token)) 
                  
                  //setTimeout(() => {
                    ridirectUser()
                 // }, 3000);
                  
                  
                 }
            }
        } 
          
    )}

   


const ridirectUser=async()=>{
  isServerError=false
  showMessage('wait for a server redirection .......', isServerError)
  let token=JSON.parse(localStorage.getItem("token"));
    await fetch(url+'/api/users/auth/verifyToken',{
        headers: {
            'Authorization':token,
          }  
     })
    .then(res=>res.json())
    .then(result=>{
      const user=result.user
        if(user==='admin'){
          window.location.href='admin-index.html'
        }else{
          window.location.href='index.html'
        }
        //ultreturn result.user 
    })
        
}