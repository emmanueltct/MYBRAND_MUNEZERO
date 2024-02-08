const url="https://mybrand-be-3-qrqs.onrender.com"

const userRegister=(formData)=>{
    document.querySelector('.loader').style.display='block'
    document.querySelector('.submit-button').style.display='none'
    fetch(url+'/api/users/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          names:formData.names,
          email:formData.email,
          password:formData.password
        })
      }).then(response => response.json())
        .then(data =>{
           
            if(data.inputError){
                showMessage(data.inputError) 
                document.querySelector('.loader').style.display='none'
                document.querySelector('.submit-button').style.display='block'
            }else if(data.error){
                showMessage(data.error) 
                document.querySelector('.loader').style.display='none'
                document.querySelector('.submit-button').style.display='block'
            }else{
                showMessage(data.message) 
                 document.querySelector('.loader').style.display='none'
                 document.querySelector('.submit-button').style.display='block'
                if(data.token){
                  let token=data.token
                  localStorage.setItem("token" ,JSON.stringify(token)) 
                  
                  setTimeout(() => {
                    window.location.href='login.html'
                  }, 3000);
                  
                  
                 }
            }
        } 
          
    )}
