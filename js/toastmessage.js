function showMessage(message) {
    document.getElementById("snackbar").innerText=message
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }