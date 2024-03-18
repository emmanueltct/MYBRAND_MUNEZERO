const UserComment=(props)=>{

    const commentsList=props.comment
    const id=props.blogId;
    const url=props.url

    const {useState,useEffect}=React
    const [commentInput, setCommentInput]=useState("")
    const [commentList,setCommentList]=useState([])
    let [isServerError, setIsServerError]=useState(false)


const isValidToken=()=>{
    let token=JSON.parse(localStorage.getItem("token"));
    if(!token){
        return window.location.href='login.html'
     }
    return token
}



    useEffect(() => {
        fetchSingleBlogComments()
        }, []);


    const fetchSingleBlogComments=async()=>{
        await fetch(url+''+id+'/comments')
        .then(res=>res.json())
        .then(result=>{
            if(result.data){
                setCommentList(result.data)
            }
        })  
    }




const createComment=async(e)=>{
    e.preventDefault()
     document.querySelector(".sendButton").style.display='none'
     document.querySelector('.loader').style.display='block' 

    let formData=commentInput

    await fetch(url+''+id+'/comments',{
        method: 'POST',
        headers:{
        'Authorization':isValidToken()  , 
        'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            message:formData
          })
      })
      .then(response => {
            const status=response.status
            if(status==401){
                const msg='This action require authentication. please login to continue'
                setIsServerError(true)
                showMessage(msg,isServerError)
                setTimeout(() => {
                    window.location.href='login.html'
                }, 3000)
            }
            return response.json()
        })
        .then(data =>{
            document.querySelector(".sendButton").style.display='block'
            document.querySelector('.loader').style.display='none'
            if(data){
                if(data.error){
                    setIsServerError(true)
                    showMessage(data.error,isServerError)
                }else{
                    setIsServerError(false)
                    showMessage(data.message,isServerError)
                    setCommentInput('')
                    fetchSingleBlogComments()
                }
            }
        }
    )}
  
    
 
return (
    <>
       <div className="blog-comment-section">    
        <div className="comment-form-title" id="comment-form">Add your Comment here</div>
            <form className="comment-form" id="comment-form" onSubmit={createComment}>
                     <div id="snackbar"></div>
                    <div className="comment-input-section-comment validation">
                        <label>Comment</label>
                        <textarea cols="5" rows="6"  id="comment-desc" value={commentInput} onChange={(e)=>setCommentInput(e.target.value)} ></textarea>
                    </div>
                    <div className="loader"></div>
                    <div className="comment-input-section-button">
                        <button id="sendButton" className="sendButton" >Save</button>
                    </div>
            </form>
         </div>


        {
        commentList.map((userComment, index)=>(
          
    <div className="user-comment" key={index}>
        <div className="sender-profile">
            <div className="profile-container">
                <div className="sender-image"></div>
                <div className="sender-info">
                    <span>{userComment.user.names}</span>
                    <span style={{fontSize:"14px",marginTop:"-15px"}}>{userComment.createdAt} </span>
                </div>
            </div>
        </div>

        <div className="sender-message">
                <span className="sent-message"> 
                </span>
                <span className="sent-message-full">
                {userComment.message}
            </span>
           
        </div>
    </div>

    ))
   }
</>   
)
}


