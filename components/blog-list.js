
const App = () => {

    const {useEffect,useState}=React
    
    const [blog,setBlog]=useState([])
   

  

   useEffect(() => {
        console.log("First call on mount..");
        document.querySelector('.loaders').style.display='flex'
        document.querySelector('.blog-container').style.display="none"
        const AllBlogs=async()=>{
            await  fetch('https://mybrand-be-3-qrqs.onrender.com/api/blogs')
            .then(res=>res.json())
            .then(result=>{
                console.log(result.data)
                document.querySelector('.loaders').style.display='none'
                document.querySelector('.blog-container').style.display="block"
                   setBlog(result.data) 
                 return result

            })
            }
        AllBlogs()
       
        }, []);

        
        const scrollRight = () => {
            const container = document.querySelector(".image-list");
            if (container) {
              container.scrollBy({
                left: 400,
                behavior: "smooth",
              });
            }
          };
        
          const scrollLeft = () => {
            const container = document.querySelector(".image-list");
            if (container) {
              container.scrollBy({
                left: -400,
                behavior: "smooth",
              });
            }
          };


        return  (
                 <div className="slide-wraper">
                    <button id="prev-slide" onClick={scrollLeft} className=" slider-button materil-slider-button"><i className="fa fa-chevron-left" aria-hidden="true"></i></button>
                    <div className="image-list">
                    
                    {
                      blog.map((list, index) => (

                        <div key={index} className="image-item" >
                         <img src={list.image} alt="Article image of"/>
                            <div className="blog-card-text">
                                <div className="fun-fact">
                                    <span>Published on:{list.createdAt}</span>
                                </div>
                                <div className="main-title"><a href={"blog.html?id="+list._id}>{list.title}</a></div>
                                <div className="single-blog-title">
                                {list.blogIntro.substr(0,48)+'.....'} 
                                </div>
                                <div className="fun-fact">
                                    <span>{list.likes} <i className="fa fa-thumbs-up" style={{fontSize:"15px", color:"#A53DFF"}}></i> </span>
                                    <span>{list.comments} <i className="fa fa-comments" style={{fontSize:"15px", color:"#A53DFF"}}></i></span>
                                </div>
                            </div> 
                        </div>
                     ))} 

                     </div>
                    <button id="next-slide" onClick={scrollRight} className="slider-button"><i className="fa fa-chevron-right" aria-hidden="true"></i></button>
                 </div>
            
            
          );

        };




  const root = ReactDOM.createRoot(
    document.getElementById('imageList')
  );
  root.render(<App/>);
