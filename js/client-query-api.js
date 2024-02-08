
const isValidToken=()=>{
    let token=JSON.parse(localStorage.getItem("token"));
    if(!token){
        return window.location.href='login.html'
     }
    return token
}

const url="https://mybrand-be-3-qrqs.onrender.com"
let querryList='';
let querryContainer=document.querySelector('.queries-list')

const fetchQuerries=async()=>{
   
    await fetch(url+'/api/querries',{
    method:"GET",
    headers: {
        'Authorization':isValidToken(),
      }
    })
    .then(res=>{
        if(res.status==404){
            querryContainer.innerHTML="<div style='height:70vh' ><h3>There is no client querry in database </h3></div>"
        }
        return res.json()})
    .then(result=>{
           // console.log(result.data)
           if(result.data){
              
               const data=result.data;
              // blogComment.innerHTML=`${data.length} <i class="fa fa-comments" style="font-size:20px; color:#A53DFF"></i>`
               data.forEach(msg => {
                //console.log(comment)
               
               querryList =` <div class="user-query">
               <div class="sender-profile">
                   <div class="profile-container">
                       <div class="sender-info">
                           <span>${msg.client_info.names}</span>
                           <span class="budget-span" style="font-size:14px;margin-top:-15px">Budget: 100$ </span>
                       </div>
                   </div>
                   <div class="sender-contact">
                       <div class="sender-contact-address">
                           <span><i class="fa fa-map-marker" aria-hidden="true"></i></span>  
                            ${msg.client_info.location}
                       </div>
                       <div class="sender-contact-mail">
                           <span><i class="fa fa-envelope" aria-hidden="true"></i></span>
                             ${msg.client_info.email}
                       </div>
                   </div>
               </div>
               <div class="sender-message">
                   <span class="sender-message-subject">
                       ${msg.client_subject}
                   </span>
                   <span class="sender-message-line"></span>
                   <span class="sender-message-text">
                       <input type="checkbox" class="checkbox-in" id="${msg._id}" />
                       <span class="sent-message"> 
                           <!-- this work on less text --> 
                       </span> 
                       <span class="sent-message-full">
                        ${msg.client_message}
                       </span>
                       <label for="${msg._id}">Read more</label> 
                   </span>
                   <div style='display:flex;flex-direction:row;justify-content: space-between;width:50%'>
                         <a href="mailto: ${msg.client_info.email}"><button class='btn1'>reply</button></a>
                        <div style='width:20px ; color:red;display:none' id="${msg._id}">Deleting......</div>
                        <span  class="loader" id="ids${msg._id}" style="display:none"></span>
                        <button class='btn1 delete-querry${msg._id}' onclick="deleteQuerry('${msg._id}')">delete</button>
                    </div>
               </div>
               
           </div> `
           

           //querryContainer.innerHTML=querryList
         // commentSection.remove()
         querryContainer.insertAdjacentHTML('beforeend',querryList)
        });
      
        const userComment=document.getElementsByClassName("sender-message-text");
    var length=userComment.length;

for(var i=0;i<length;i++){
    var innerblock=userComment[i].childNodes[5].innerText;
     var lessTexT=userComment[i].childNodes[3];
     var checkbox=userComment[i].childNodes[1];
     var showButton=userComment[i].childNodes[7];
     //console.log(userComment[i].childNodes);

     let newStr = innerblock.replace(/\s+/g, ' ');
    

    if(newStr.length>150){
        var newText=newStr.trim().substring(0,80)+".....";  
        lessTexT.innerText=newText;
    }else{
       lessTexT.style.display="none" ;
       showButton.style.display="none";
       userComment[i].childNodes[5].innerText=newStr
       userComment[i].childNodes[5].style.display="flex";
    
      
    };
    }
 }


    })  
}

function emailReply(){
    console.log('hhhhh')
   return "mailto:someone@example.com "
}

function deleteQuerry(id){
            document.querySelector(".delete-querry"+id).style.display='none'
            document.getElementById("ids"+id).style.display='block'
    
    try {
        fetch(url+'/api/querries/'+id, {
            method: 'DELETE',
            headers: {
              'Authorization':isValidToken(),
              'Content-Type': 'application/json'
            }
          })

        .then(res=>{
            document.querySelector(".delete-querry"+id).style.display='flex'
            document.getElementById("ids"+id).style.display='none'
            if(res.status=='204'){

                showMessage('Querry content is successful deleted')
                setTimeout(() => {
                    querryContainer.innerHTML='';
                    fetchQuerries()
                  }, 2000); 
              
            }
            return res.json()
        })
       
    } catch (error) {
      console.log(error)  
    }
    
}