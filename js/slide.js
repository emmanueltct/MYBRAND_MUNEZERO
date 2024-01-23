const initSlider=()=>{
    const imageList=document.querySelector(".slide-wraper .image-list");
    const sliderButtons=document.querySelectorAll(".slide-wraper .slider-button");
    const sliderScrollbar=document.querySelector(".blog-container .slider-scrollbar");
    const scrollbarThumb=sliderScrollbar.querySelector(".blog-container .scrollbar-thumb");
    const maxScrollLeft=imageList.scrollWidth - imageList.clientWidth;
    
  
    // slide image according to the slide buttons clicked

    sliderButtons.forEach(button=>{
        button.addEventListener("click",()=>{
            const direction=button.id==="prev-slide" ? -1:1;
            const scrollAmount=imageList.clientWidth * direction;
            imageList.scrollBy({left: scrollAmount,behavior:"smooth"} );
        })
    })

    const handleSlideButtons=()=>{
       sliderButtons[0].style.display=imageList.scrollLeft <= 0 ? "none":"block";
       sliderButtons[1].style.display=imageList.scrollLeft >= maxScrollLeft ? "none":"block";
    }

    // update scrollbar thumb position based on image csroll 
    const updateScrollThumbPosition=()=>{
      const scrollPosition= imageList.scrollLeft;
      const thumbPosition=(scrollPosition/maxScrollLeft)* (sliderScrollbar.clientWidth -scrollbarThumb.offsetWidth);
      scrollbarThumb.style.left=thumbPosition+"px";
    } 

    imageList.addEventListener("scroll",()=>{
        handleSlideButtons();
        updateScrollThumbPosition();
    })


}

window.addEventListener("load",initSlider);
