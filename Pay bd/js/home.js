// Load user profile
function loadHomeProfile(){
  const savedUser = localStorage.getItem("userProfile");
  if(savedUser){
    const user = JSON.parse(savedUser);
    document.getElementById("home-name").innerText = user.name;
    document.getElementById("home-profile").src = user.profileImg;
  }
}

// Currency selector
function currency(c){
  document.getElementById("bal").innerText = 
    c==="USD"?"$987.69":c==="EUR"?"€850":"৳120,450";
}

// Page navigation
function goPage(page){
  document.body.style.opacity = "0";
  setTimeout(()=>{window.location.href = page;},200);
}

// Show image popup
function showImg(src){
  document.getElementById("popup-img").src = src;
  document.getElementById("img-popup").style.display = "block";
}

// Hide image popup
function hideImg(){
  document.getElementById("img-popup").style.display = "none";
}


// On load
loadHomeProfile();
