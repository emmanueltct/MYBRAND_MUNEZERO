const url="https://mybrand-be-3-qrqs.onrender.com"
const isValidToken=()=>{
    let token=JSON.parse(localStorage.getItem("token"));
    if(!token){
        return window.location.href='login.html'
     }
    return token
}

const createBlog=async(formData)=>{

    document.querySelector('.submit-button').style.display='none';
    document.querySelector('.loader').style.display='block';

  try {
    await fetch(url+'/api/blogs', {
        method: 'POST',
        headers: {
          'Authorization':isValidToken(),
        
        },
        body: formData,
      }).then(response =>response.json())
        .then(data =>{
            console.log(data)
          document.querySelector('.submit-button').style.display='block';
          document.querySelector('.loader').style.display='none';

            if(data.error){
              showMessage(data.error)
            }
            else{
              showMessage(data.message) 
            setTimeout(() => {
              window.location.href='admin-blog-list.html'
            }, 3000);   
           } 
        })
    
  } catch (error) {
    document.querySelector('.form-error').innerText=error;
  }
   
}

const getSingleBlog=async()=>{
    const searchParams = new URLSearchParams(window.location.search);
    const blogId=searchParams.get('updateBlog');

    await fetch(url+'/api/blogs/'+blogId)
    .then(res=>res.json())
    .then(result=>{

        if(result.data){
          
            newArticle.style.display='none' ;
            updatearticle.style.display='block';
            document.querySelector('.old-thumbnail').style.display='flex';
            document.getElementById('blog-thumbnail-label').innerText='Existing Thumbnail for this blog'
            thumbnail.style.display='none';
            

            let singleBlog=result.data;
            if(singleBlog){
                document.getElementById("article-title").value=singleBlog.title;
                document.getElementById("intro").value=singleBlog.blogIntro;
                document.querySelector(".existing-profile").setAttribute("src",singleBlog.image);
                document.getElementById("inp_editor1").innerHTML=singleBlog.content;
                editor1.setHTML(`${singleBlog.content}`);
                
            }
        
    
    }

    }) 
}


const updateBlog=async(formData)=>{
    document.querySelector('#updateArticle').style.display='none';
    document.querySelector('.loader').style.display='block';
    const searchParams = new URLSearchParams(window.location.search);
    const blogId=searchParams.get('updateBlog');
    try {
      console.log('then here')
        await fetch(url+'/api/blogs/'+blogId, {
            method: 'PATCH',
            headers: {
              'Authorization':isValidToken(),
            
            },
            body: formData,
          }).then(response =>response.json())
            .then(data =>{
               console.log(data)
                document.querySelector('.submit-button').style.display='block';
                document.querySelector('.loader').style.display='none';

                if(data.error){
                  showMessage(data.error)
                }else if(data.message){
                   showMessage(data.message)
                    setTimeout(() => {
                      window.location.href='admin-blog-list.html'
                      
                    }, 3000); 
                    //window.location.href='admin-blog-list.html'
                   
             } 
            })
        
      } catch (error) {
        document.querySelector('.form-error').innerText=error;
      }
}