const title=document.querySelector('.blog-title h4')
const intro=document.querySelector('.blog-text .blog-intro')
const body=document.querySelector(".blog-text .content")
const image=document.querySelector('.image-container')
const buttons=document.querySelector('.comment-action-button')
const blodDate=document.querySelector('.blog-date')
const blogComment=document.querySelector('.comment-span')
const blogLike=document.querySelector('.user-like')
const blogUnlike=document.querySelector('.user-unlike')
const commentSection=document.querySelector('.comment-list')
//const blodUnlike=document.querySelector('.')

let commentList=''

const isError=document.querySelector('.single-blog-section')

const searchParams = new URLSearchParams(window.location.search);
const blogId=searchParams.get('id');
// import { url } from "./blog-index-api";

const url="https://mybrand-be-3-qrqs.onrender.com"



const isValidToken=()=>{
    let token=JSON.parse(localStorage.getItem("token"));
    if(!token){
        return window.location.href='login.html'
     }
    return token
}



const fetchSingleBlog=async()=>{
    document.querySelector('.loaders').style.display='flex'
    document.querySelector('.blog-thumbnail').style.display='none'

  await fetch(url+'/api/blogs/'+blogId)
  .then(res=>res.json())
  .then(result=>{
         if(result.data){

             document.querySelector('.loaders').style.display='none'
            document.querySelector('.blog-thumbnail').style.display='flex'
             const data=result.data;
             title.innerHTML=data.title
             intro.innerHTML=`" ${data.blogIntro} "`
             body.innerHTML=data.content
             image.innerHTML=`<img src="${data.image}" class="blog-image"/>`
             blodDate.innerHTML=`Posted on: ${data.createdAt} `

            buttons.innerHTML=`<button style="background-color:#A53DFF;" onclick="updateBlog('${data._id}')" ><span><i class="fa fa-pencil" ></i></span> Edit</button> 
            <span style='width:30px' class="loader1"></span> <button class='delete-button' style="background-color:#8C1919;" onclick="deleteThisBlog('${data._id}')"><span><i class="fa fa-trash" ></i></span> Delete</button>`
         }else{
         // console.log(result.error)
             isError.innerHTML=`<div class="blog-error">${result.error}</div>`
         }
  })  
}

const fetchSingleBlogComments=async()=>{
   
    commentSection.innerHTML=""
    await fetch(url+'/api/blogs/'+blogId+'/comments')
    .then(res=>res.json())
    .then(result=>{
           if(result.data){
              
               const data=result.data;
               blogComment.innerHTML=`Comments:${data.length} `
               data.forEach(comment => {
                //console.log(comment)
               

               commentList =` <div class="user-comment">
               <div class="sender-profile">
                   <div class="profile-container">
                       <div class="sender-image"></div>
                       <div class="sender-info">
                           <span>${comment.user.names}</span>
                           <span style="font-size:14px;margin-top:-15px">${comment.createdAt} </span>
                           <span  class="loader" id="ids${comment._id}" style="display:none"></span>
                           <button class='delete-comment' id="delete${comment._id}" onclick="deleteSingleComment('${comment._id}')">delete comment</button>
                       </div>
                   </div>
               </div>
               <div class="sender-message">
                       <input type="checkbox" class="checkbox-in" id="${comment._id}" />
                       <span class="sent-message"> 
                           <!-- this work on less text --> 
                       </span>
                       <span class="sent-message-full">
                        ${comment.message}
                   </span>
                    <label for="${comment._id}">Read more</label> 
               </div>
           </div> 
           ` 
          
           //commentSection.innerHTML=commentList
           commentSection.insertAdjacentHTML('beforeend',commentList)
           document.getElementById("ids"+comment._id).style.display='none'
         // commentSection.remove()
         
        });
        

        const userComment=document.getElementsByClassName("sender-message");
        var length=userComment.length;
       // console.log(userComment)
    for(var i=0;i<length;i++){
        
        var innerblock=userComment[i].childNodes[5].innerText;
         var lessTexT=userComment[i].childNodes[3];
         var checkbox=userComment[i].childNodes[1];
         var showButton=userComment[i].childNodes[7];
         //console.log(userComment[i].childNodes);
    
         let newStr = innerblock.replace(/\s+/g, ' ');
    
        if(newStr.length>50){
            console.log(newStr.length)
            //console.log(newStr)
            var newText=newStr.trim().substring(0,50)+".....";  
            console.log(newText)
            lessTexT.innerText=newText;
        }else{
            //console.log(newStr)
            console.log(newStr.length)
           lessTexT.style.display="none" ;
           showButton.style.display="none";
           userComment[i].childNodes[5].innerText=newStr
           userComment[i].childNodes[5].style.display="flex";
        }
        
        };

           }else{
           // console.log(result.error)
              // isError.innerHTML=`<div class="blog-error">${result.error}</div>`
           }
            
    })  
}

const fetchSingleBlogLikes=async()=>{
    await fetch(url+'/api/blogs/'+blogId+'/likes')
    .then(res=>res.json())
    .then(result=>{
           if(result){
            blogLike.innerHTML=`Likes: ${result.Total_like}`
           }else{
           // console.log(result.error)
               
           }
    })  
}


const deleteBlog=(blogText)=>{
    //console.log('tettttttte')
    document.querySelector(".delete-button").style.display='none'
    document.querySelector('.loader1').style.visibility='visible'
    try {
    fetch(url+'/api/blogs/'+blogId, {
        method: 'DELETE',
        headers: {
          'Authorization':isValidToken(),
          'Content-Type': 'application/json'
        }
      })

    .then(res=>{
        if(res.status=='204'){
            document.querySelector(".delete-button").style.display='block'
            document.querySelector('.loader1').style.visibility='hidden'
            setTimeout(() => {
                showMessage('blog content is successful deleted')
                window.location.href='admin-blog-list.html'
              }, 3000); 
        }
        return res.json()
    })
   
} catch (error) {
  console.log(error)  
}
}


//document.querySelector('.loader').style.display='none'
const deleteSingleComment=async(id)=>{
    document.querySelector("#delete"+id).style.display='none'
    document.querySelector('#ids'+id).style.display='block'
    
    try {
  await  fetch(url+'/api/comments/'+id, {
        method: 'DELETE',
        headers: {
          'Authorization':isValidToken(),
          'Content-Type': 'application/json'
        }
      })

    .then(res=>{
        if(res.status=='204'){
            fetchSingleBlogComments()
            document.querySelector("#delete"+id).style.display='block'
            document.querySelector('#ids'+id).style.display='none'
            setTimeout(() => {
                showMessage('comment content is successful deleted')
                
              }, 3000); 
        }
        return res.json()
    })
   
} catch (error) {
  console.log(error)  
}


}



   