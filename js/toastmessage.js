function showMessage(message,isError) {
    document.getElementById("snackbar").innerText=message
    var x = document.getElementById("snackbar");
    if(isError){
      x.style.color='red'
    }else{
      x.style.color='white'
    }
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }