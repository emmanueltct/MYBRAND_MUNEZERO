
const SingleBlog = () => {
 

    
    const searchParams = new URLSearchParams(window.location.search);
    const blogId=searchParams.get('id');
    const url="https://mybrand-be-3-qrqs.onrender.com/api/blogs/";

   

    const {useEffect,useState}=React
    const [blog,setBlog]=useState([])
    const[comment,setComment]=useState(0)
    const[commentDate,setCommentDate]=useState("")
   useEffect(() => {
   
        const fetchSingleBlog=async()=>{
        const isError=document.querySelector('.single-blog-section')
        document.querySelector('.loaders').style.display='flex'
        document.querySelector('.loaders').style.paddingBottom='1200px'
        document.querySelector('.image-container').style.display="none"

          await fetch('https://mybrand-be-3-qrqs.onrender.com/api/blogs/'+blogId)
          .then(res=>res.json())
          .then(result=>{
                document.querySelector('.loaders').style.display='none'
                document.querySelector('.image-container').style.display="flex"
                 if(result.data){
                    setBlog(result.data)
                    let date=result.data.createdAt.split("T")
                    date=date[0]+" "+date[1].substr(0,8)
                    
                    setCommentDate(date)

                 }else{
                 // console.log(result.error)
                     isError.innerHTML=`<div className="blog-error" style='padding-bottom:1200px;color:red'>${result.error}</div>`
                 }
          })  
        }
        fetchSingleBlog()
        fetchSingleBlogComments()
        }, []);


        const fetchSingleBlogComments=async()=>{
            await fetch(url+''+blogId+'/comments')
            .then(res=>res.json())
            .then(result=>{
                if(result.data){
                    setComment(result.data)
                }
            })  
        }  

    return(
        <div className="single-blog-section" id="test">
                <div className="loaders">
                    <div className="loaderBlog"></div>
                    <div className="loaderBlog"></div> 
                    <div className="loaderBlog"></div>  
                </div>
            <div className="blog-title">
                <h3>{blog.title}</h3> 
            </div>
            <div className="blog-thumbnail">
                
                <div className="image-container">
                    <img src={blog.image} className="blog-image"/> 
                </div>
                <div className="blog-count">
                    <div className="comment-date">Posted on: {commentDate}</div>
                    <div className="comment-count">
                        <UserLike url={url} blogId={blogId} />
                        <span className="comment-span">{comment.length}<i className="fa fa-comments" style={{fontSize:"20px", color:"#A53DFF"}}></i></span></div>
                </div>
            </div>
            <div className="blog-text">
                <p className="blog-intro" style={{fontStyle:"italic"}}>" {blog.blogIntro} "</p>
                <p dangerouslySetInnerHTML={{__html:blog.content}}/>
            </div>

            <div className="comment-list">
                <UserComment url={url} blogId={blogId} comment={comment}/>
            </div>
              
           
            </div>
           
          );

        };




  const root = ReactDOM.createRoot(
    document.getElementById('commentDiv')
  );
  root.render(<SingleBlog/>);
