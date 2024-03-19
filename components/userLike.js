const UserLike=(props)=>{
const url=props.url
const blogId=props.blogId


const {useEffect,useState}=React

 const [like,setLike]=useState(0)
 let [isServerError, setIsServerError]=useState(false)

    useEffect(() => {
    fetchSingleBlogLikes()

    }, []);


    const isValidToken=()=>{
        let token=JSON.parse(localStorage.getItem("token"));
        if(!token){
            return window.location.href='login.html'
         }
        return token
    }


    const fetchSingleBlogLikes=async()=>{
        await fetch(url+''+blogId+'/likes')
        .then(res=>res.json())
        .then(result=>{
            if(result){
                setLike(result.Total_like)
            }
        })  
    }


    const createLike=async()=>{
        document.querySelector(".user-like").style.display='none'
        document.querySelector('.loader1').style.visibility='visible'
        await fetch(url+''+blogId+'/likes',{
            method: 'POST',
            headers:{
            'Authorization':isValidToken()  , 
            'Content-Type': 'application/json',
            }
        
        }).then(response => {
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
                setIsServerError(false)
                showMessage(data.message,isServerError)
                fetchSingleBlogLikes()
                document.querySelector(".user-like").style.display='block'
                document.querySelector('.loader1').style.visibility='hidden'
            } 
            
        )}





    return(
        <>
            <div id="snackbar"></div>
            <span className="loader1"></span>
            <span className="like-span user-like" onClick={createLike} >{like} <i className="fa fa-thumbs-up" style={{fontSize:"20px", color:"#A53DFF"}}></i></span> 
        </>
       
    )
}