
let url="https://mybrand-be-3-qrqs.onrender.com"
let comment=0
let likes=0
let blogcount=0

const AllBlogs=async()=>{
    document.querySelector('.loader').style.display='block'
    document.querySelector('.c-comment .numbers').style.display='none'
    document.querySelector('.c-blog .numbers').style.display='none'
    //document.querySelector('.c-querries .numbers').style.display='none'

    await  fetch(url+'/api/blogs')
    .then(res=>res.json())
    .then(result=>{
      

        blogcount=result.data.length
        result.data.forEach(blog => {
        
             comment = comment + blog.comments
             likes  = likes + blog.likes
             
        });

        document.querySelector('.c-comment .loader').style.display='none'
        document.querySelector('.c-blog .loader').style.display='none'
        document.querySelector('.c-comment .numbers').style.display='block'
        document.querySelector('.c-blog .numbers').style.display='block'
        

        document.querySelector('.c-comment .numbers').innerHTML=(comment+likes)
        document.querySelector('.c-blog .numbers').innerHTML=blogcount
        

       // console.log("like:"+likes, "comment:"+comment,"blog"+blogcount)
    })

   

    }
    
    AllBlogs()

    const isValidToken=()=>{
        let token=JSON.parse(localStorage.getItem("token"));
        if(!token){
            return window.location.href='login.html'
         }
        return token
    }
    

    let querryList='';
    //let querryContainer=document.querySelector('.queries-list')
    
    const fetchQuerries=async()=>{
         document.querySelector('.c-querries .numbers').style.display='none'

        await fetch(url+'/api/querries',{
        method:"GET",
        headers: {
            'Authorization':isValidToken(),
          }
        })
        .then(res=>res.json())
        .then(result=>{
               // console.log(result.data)
               const data=0;
               if(result.data){
                 const data=result.data.length;
                   document.querySelector('.c-querries .numbers').style.display='block'
                   document.querySelector('.c-querries .loader').style.display='none'
                   document.querySelector('.c-querries .numbers').innerHTML=data
                 }else{
                   document.querySelector('.c-querries .numbers').style.display='block'
                   document.querySelector('.c-querries .loader').style.display='none'
                   document.querySelector('.c-querries .numbers').innerHTML=data
                 }
        })  
    }
    
    fetchQuerries()