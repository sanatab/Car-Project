// validation code -------------------------

document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();
  // alert('hello')
  checkData(); 
});

// Selectors
let username = document.getElementById("username");
let email = document.getElementById("email");
let password1 = document.getElementById("password1");
let password2 = document.getElementById("password2");

// Empty array for storing data given by the user
let array = [];
let error = true;

function checkData() {
  let usernameVal = username.value.trim();
  let emailVal = email.value.trim();
  let password1Val = password1.value.trim();
  let password2Val = password2.value.trim();
  // alert(usernameVal);

  if (usernameVal == "") {
    setError(username, "Username can't be blank");
  } else if (usernameVal <= 2) {
    setError(username, "Minimum 3 characters required");
  } else {
    setSuccess(username);
    error = false;
  }

  if (emailVal == "") {
    setError(email, "Email can't be blank");
  } else if (!isEmail(emailVal)) {
    setError(email, "Email is not Valid");
  } else {
    setSuccess(email);
    error = false;
  }

  if (password1Val == "") {
    setError(password1, "Password can't be blank");
  } else {
    setSuccess(password1);
    error = false;
  }

  if (password2Val == "") {
    setError(password2, "Password can't be blank");
  } else if (password2Val == password1Val) {
    setSuccess(password2);
    error = false;
  } else {
    setError(password2, "Password did not matched");
  }

  if (!error) {

    let userData = {
      Name: usernameVal,
      Email: emailVal,
      Password: password1Val,
    };
    array.push(userData);
    saveData(array);

    console.log(array);
    username.value = "";
    email.value = "";
    password1.value = "";
    password2.value = "";
    
    alert('Form submit Successfully');
    window.location.href='login.html'
  }
}

function setError(u, msg) {
  error = true;
  var parentBox = u.parentElement;
  parentBox.className = "error";
  var span = parentBox.querySelector("span");
  span.innerText = msg;
}

function setSuccess(u) {
  var parentBox = u.parentElement;
  parentBox.className = "success";
}

function isEmail(e) {
  var reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(e);
}

// store task data in local storage in form of string
function saveData(array) {
  let str = JSON.stringify(array);
  localStorage.setItem("data", str);
  // showData();
}

// Get data from local storage in form of object
let objStr = localStorage.getItem("data");
if (objStr != null) {
  array = JSON.parse(objStr);
  console.log(array);
}
