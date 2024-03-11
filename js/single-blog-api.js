const title=document.querySelector('.blog-title h3')
const intro=document.querySelector('.blog-text .blog-intro')
const body=document.querySelector(".blog-text .content")
const image=document.querySelector('.image-container')
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
let isServerError=false

const isValidToken=()=>{
    let token=JSON.parse(localStorage.getItem("token"));
    if(!token){
        //showMessage('this action rquire user to authenticate , please login to continue')
        setTimeout(() => {
            window.location.href='login.html'
          }, 3000)
     }
    return token
}


const fetchSingleBlog=async()=>{
    document.querySelector('.loaders').style.display='flex'
    document.querySelector('.blog-comment-section').style.display="none"
  await fetch(url+'/api/blogs/'+blogId)
  .then(res=>res.json())
  .then(result=>{
        document.querySelector('.loaders').style.display='none'
        document.querySelector('.blog-comment-section').style.display="flex"
         if(result.data){
             const data=result.data;
             title.innerHTML=data.title
             intro.innerHTML=`" ${data.blogIntro} "`
             body.innerHTML=data.content
             image.innerHTML=`<img src="${data.image}" class="blog-image"/>`
             blodDate.innerHTML=`Posted on: ${data.createdAt} `
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
               blogComment.innerHTML=`${data.length} <i class="fa fa-comments" style="font-size:20px; color:#A53DFF"></i>`
               data.forEach((comment,index) => {
                //console.log(comment)
               
               commentList =` <div class="user-comment">
               <div class="sender-profile">
                   <div class="profile-container">
                       <div class="sender-image"></div>
                       <div class="sender-info">
                           <span>${comment.user.names}</span>
                           <span style="font-size:14px;margin-top:-15px">${comment.createdAt} </span>
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
           </div>`
           
         // commentSection.remove()
        commentSection.insertAdjacentHTML('beforeend',commentList)
        //console.log(index)
     
       // commentSection.innerHTML=commentList

        const userComment=document.getElementsByClassName("sender-message");
        var length=userComment.length;
    
        var innerblock=userComment[index].childNodes[5].innerText;
         var lessTexT=userComment[index].childNodes[3];
         var checkbox=userComment[index].childNodes[1];
         var showButton=userComment[index].childNodes[7];
         //console.log(userComment[i].childNodes);
    
         let newStr = innerblock.replace(/\s+/g, ' ');
                console.log(index+'=>'+newStr)
        if(newStr.length>50){
            var newText=newStr.trim().substring(0,50)+".....";  
            lessTexT.innerText=newText;
        }else{
         
           lessTexT.style.display="none" ;
           showButton.style.display="none";
           userComment[index].childNodes[5].innerText=newStr
           userComment[index].childNodes[5].style.display="flex";
        }
     
        });

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
            blogLike.innerHTML=`${result.Total_like} <i class="fa fa-thumbs-up" style="font-size:20px; color:#A53DFF"></i>`
           }else{
           // console.log(result.error)
               
           }
    })  
}



const createLike=async()=>{
    document.querySelector(".user-like").style.display='none'
    document.querySelector('.loader1').style.visibility='visible'
    await fetch(url+'/api/blogs/'+blogId+'/likes',{
        method: 'POST',
        headers:{
        'Authorization':isValidToken()  , 
        'Content-Type': 'application/json',
        }
    
      }).then(response => {
        const status=response.status
        if(status==401){

            const msg='This action require authentication. please login to continue'
            isServerError=true
            showMessage(msg,isServerError)
            setTimeout(() => {
                window.location.href='login.html'
              }, 3000)
        }
         return response.json()
        })
        .then(data =>{
            isServerError=false
            showMessage(data.message,isServerError)
            fetchSingleBlogLikes()
            document.querySelector(".user-like").style.display='block'
            document.querySelector('.loader1').style.visibility='hidden'
        } 
          
    )}


    const createComment=async(formData)=>{

        document.querySelector(".sendButton").style.display='none'
        document.querySelector('.loader').style.display='block' 

        await fetch(url+'/api/blogs/'+blogId+'/comments',{
            method: 'POST',
            headers:{
            'Authorization':isValidToken()  , 
            'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                message:formData
              })
          }).then(response => {
            const status=response.status
            if(status==401){

                const msg='This action require authentication. please login to continue'
                isServerError=true
                showMessage(msg,isServerError)
                setTimeout(() => {
                    window.location.href='login.html'
                  }, 3000)
            }
             return response.json()})
            .then(data =>{

                if(data){
                    //console.log(data)
                    if(data.error){
                        isServerError=true
                       showMessage(data.error,isServerError)
                    }else{
                        isServerError=false
                        showMessage(data.message,isServerError)
                        document.querySelector("label").innerHTML=`<span>Comment</span>`
                        document.querySelector("label").style.color='black'
                        document.getElementById("commentform").reset();
                        fetchSingleBlogComments()
                    }
                    document.querySelector('.loader').style.display='none'
                    document.querySelector(".sendButton").style.display='block'

                }else{
                    document.querySelector(".sendButton").style.display='none'
                    document.querySelector('.loader').style.display='block'
                    
                }  
            }
        )}
    
    



 
