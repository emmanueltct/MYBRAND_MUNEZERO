

const blogContainer=document.querySelector('.image-list')
 const url="https://mybrand-be-3-qrqs.onrender.com"
 var table=document.getElementById("article-table");


 const isValidToken=()=>{
    let token=JSON.parse(localStorage.getItem("token"));
    if(!token){
        return window.location.href='login.html'
     }
    return token
}





const fetchBlog=async()=>{

    const trows = document.querySelectorAll('.table-row');
    trows.forEach(row => {
     row.remove();
    });

    let tableRow=''
    document.querySelector('.loaders').style.display='flex'
    try {
        fetch(url+'/api/blogs')
        .then(res=>res.json())
        .then(result=>{
            document.querySelector('.loaders').style.display='none'
            result.data.forEach((blog,index) => {
                
                tableRow=`<tr class="table-row">
                    <td>${index+1}</td><td>${blog.createdAt}</td><td>${blog.title}</td>
                    <td><a href="new-article.html?updateBlog=${blog._id}"><i class='fa fa-edit' style='font-size:18px'></i></a></td>
                    <td><a href="admin-blog.html?id=${blog._id}"><i class='fa fa-eye' style='font-size:18px;color:#000'></i></a></td>
                    <td> <span style="width:20px"  class="loader" id="ids${blog._id}" style="display:none"></span><a class="delete-blog" href="#" onclick="deleteBlog('${blog._id}')" id="del${blog._id}"><i class='fa fa-trash' style='font-size:18px;color:red'></i></a><a class="loader1"></a></td>
                    </tr>`
                
                    table.insertAdjacentHTML('beforeend',tableRow); 
            });
        })

    } catch (error) {
    console.log(error)  
    }
}

const deleteBlog=async(blogId)=>{
    document.getElementById("del"+blogId).style.display='none'
    document.getElementById('ids'+blogId).style.display='block'

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
                showMessage('blog content is successful deleted')
                document.getElementById("del"+blogId).style.display='block'
                document.getElementById('ids'+blogId).style.display='none'
                setTimeout(() => {
                    fetchBlog()
                  }, 2000); 
              
            }
            return res.json()
        })
       
    } catch (error) {
      console.log(error)  
    }
    
}