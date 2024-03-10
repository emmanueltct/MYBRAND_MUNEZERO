const blogContainer=document.querySelector('.image-list')
const eachCard=document.querySelectorAll('.image-item')

 const url="https://mybrand-be-3-qrqs.onrender.com"
 document.querySelector('.loaders').style.display='flex'
let output=''





const AllBlogs=async()=>{

    eachCard.forEach(card=>{
        card.remove();
   })


await  fetch(url+'/api/blogs')
.then(res=>res.json())
.then(result=>{

    document.querySelector('.loaders').style.display='none'
    result.data.forEach(blog => {
        // console.log(blog)
        

     output =`<div class="image-item" >
                    <img src="${blog.image}" alt="Article image of"/>
                    <div class="blog-card-text">
                        <div class="fun-fact">
                            <span>Published on:${blog.createdAt}</span>
                        </div>
                        <div class="main-title"><a href="blog.html?id=${blog._id}">${blog.title}</a></div>
                        <div class="single-blog-title">
                        ${blog.blogIntro.substr(0,48)+'.....'} 
                        </div>
                        <div class="fun-fact">
                            <span>${blog.likes} <i class="fa fa-thumbs-up" style="font-size:15px; color:#A53DFF"></i> </span>
                            <span>${blog.comments} <i class="fa fa-comments" style="font-size:15px; color:#A53DFF"></i></span>
                        </div>
                    </div> 
                 </div>`
                 blogContainer.insertAdjacentHTML('beforeend',output)    
         // blogContainer.innerHTML=output  
        // console.log(blog)
    });
    initSlider()
})
}





AllBlogs()






const querries=async(formData)=>{

    document.querySelector('.loader').style.display='block'
    document.querySelector('#submit-button').style.display='none'
    //console.log(formData.email)
   await fetch(url+'/api/querries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          formData
        )
      }).then(response => response.json())
        .then(data =>{
            document.querySelector('.loader').style.display='none'
            document.querySelector('#submit-button').style.display='block'
            if(data.error){
                showMessage(data.error)
                
            }else{
                //alert(data.message)
                showMessage(data.message)
                document.getElementById("contact-form").reset();
                document.querySelector(".fa-check-circle").style.visibility='hidden'
            }

            

        } 
          
    )}