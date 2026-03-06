document.getElementById("signin-btn").addEventListener("click", function () {
  const username = document.getElementById("user-name");
  const userName = username.value;

  const inputPass = document.getElementById("pass");
  const Pass = inputPass.value;

  if (userName == "admin" && Pass == "admin123") {
    alert("Sign In successful!");

    window.location.assign("home.html");
  } else {
    alert("Try Again..");
  }
});