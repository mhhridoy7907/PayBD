const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

function toggleForm(){
  loginForm.classList.toggle("hidden");
  registerForm.classList.toggle("hidden");
}

function togglePassword(id){
  const input = document.getElementById(id);
  const span = input.nextElementSibling;
  if(input.type === "password"){ input.type = "text"; span.textContent="Hide"; }
  else{ input.type = "password"; span.textContent="Show"; }
}

// REGISTER
async function register(){
  const name  = document.getElementById("regName").value.trim();
  const phone = document.getElementById("regPhone").value.trim();
  const pass  = document.getElementById("registerPassword").value;
  const cpass = document.getElementById("registerConfirm").value;

  if(!name || !phone || !pass || !cpass){ alert("সব তথ্য দিন"); return; }
  if(pass.length < 6){ alert("Password কমপক্ষে 6 digit হতে হবে"); return; }
  if(pass !== cpass){ alert("Password মিলছে না"); return; }

  try {
    const res = await fetch("register.php", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({name, phone, password:pass})
    });
    const data = await res.json();
    alert(data.message);
    if(data.status==="success"){ toggleForm(); }
  } catch(err){ alert("Server error! পুনরায় চেষ্টা করুন।"); }
}

// LOGIN
async function login(){
  const phone = document.getElementById("loginPhone").value.trim();
  const pass  = document.getElementById("loginPassword").value;

  if(!phone || !pass){ alert("Phone ও Password দিন"); return; }

  try {
    const res = await fetch("login.php", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({phone, password:pass})
    });
    const data = await res.json();
    alert(data.message);
    if(data.status==="success"){
      localStorage.setItem("loggedIn","true");
      window.location.href="home.html";
    }
  } catch(err){ alert("Server error! পুনরায় চেষ্টা করুন।"); }
}
