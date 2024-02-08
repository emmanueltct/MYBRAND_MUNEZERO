const initSlider=()=>{
    const imageList=document.querySelector(".slide-wraper .image-list");
    const sliderButtons=document.querySelectorAll(".slide-wraper .slider-button");
    const sliderScrollbar=document.querySelector(".blog-container .slider-scrollbar");
    const scrollbarThumb=sliderScrollbar.querySelector(".blog-container .scrollbar-thumb");
    const createDot=document.getElementById("slide-dots");
    let currentSlide=0;
    var activeDot=0; 

    const maxScrollLeft=imageList.scrollWidth - imageList.clientWidth;
    let scrollNumber=Math.round(maxScrollLeft / imageList.clientWidth);

    if(maxScrollLeft / imageList.clientWidth >=0.5){
       scrollNumber+=1;
    }
    //const currentSlide=0;  
   // console.log(scrollNumber+'test'+ maxScrollLeft % imageList.clientWidth)
    
    

    for(var i=0;i<=scrollNumber;i++){
        const dots='<span class="dots-dots" id="'+i+'" ></span>';
        createDot.insertAdjacentHTML('beforeend', dots);
    }

    const dots1=document.querySelectorAll('.dots-dots');


      
    // slide image according to the slide buttons clicked


    sliderButtons.forEach(button=>{
        button.addEventListener("click",()=>{
            const direction=button.id==="prev-slide" ? -1:1;
            const scrollAmount=imageList.clientWidth * direction;
            imageList.scrollBy({left: scrollAmount,behavior:"smooth"});
            document.getElementById(currentSlide).classList.remove("active");
            if(direction==1){
                currentSlide+=1
                
            }else{
                currentSlide-=1  
            }

            if(currentSlide<=dots1.length - 1){
                var slide=currentSlide;
                activeDot=currentSlide;
                document.getElementById(slide).classList.add("active"); 
            }

           
            
        })
    })


    // handle dot click to slide 

 
  
  dots1.forEach(dot=>{
    dot.classList.remove('active');
  
    document.getElementById(activeDot).classList.add("active");

     dot.addEventListener("click",()=>{
        let slideId=0;
        //activeDot=dot.id;
       // dot.classList.remove("active")
        if(currentSlide<dot.id){
            slideId=dot.id-currentSlide;
            currentSlide=dot.id;
        }else if(currentSlide>dot.id){
            slideId=dot.id-currentSlide;
            currentSlide=dot.id;
        }else{
            slideId=dot.id;
        };

        const scrollAmount=imageList.clientWidth * slideId;
        imageList.scrollBy({left: scrollAmount,behavior:"smooth"} );
            //document.getElementById(dot.id).classList.add("active");
            //dot.classList.add("active");
            document.getElementById(activeDot).classList.remove("active");
            activeDot=dot.id;
            document.getElementById(activeDot).classList.add("active");
          
     })
    
 })




    const handleSlideButtons=()=>{
       sliderButtons[0].style.display=imageList.scrollLeft <= 0 ? "none":"block";
       sliderButtons[1].style.display=imageList.scrollLeft >= maxScrollLeft ? "none":"block";
    }

    // update scrollbar thumb position based on image csroll 
   
    const updateScrollThumbPosition=()=>{
     var prev=0;
      const scrollPosition= imageList.scrollLeft;
      const thumbPosition=(scrollPosition/maxScrollLeft)* (sliderScrollbar.clientWidth -scrollbarThumb.offsetWidth);
      scrollbarThumb.style.left=thumbPosition+"px";
       
    /*
      prev=activeDot;
      
      activeDot= Math.round(scrollPosition/imageList.clientWidth);
      if(activeDot>prev){
        document.getElementById(prev).classList.remove("active"); 
        document.getElementById(activeDot+1).classList.add("active");
    }
    
    if(activeDot<prev){
        document.getElementById(prev).classList.remove("active"); 
        document.getElementById(activeDot).classList.add("active"); 
    }
      console.log(activeDot+"--"+prev);
    */
      
    } 

    imageList.addEventListener("scroll",()=>{
        handleSlideButtons();
        updateScrollThumbPosition();
    })


}

window.addEventListener("load",initSlider);

