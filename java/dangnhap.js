document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); 

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  
  if (!email || !password) {
    alert("Vui lòng nhập đầy đủ Email/Mã sinh viên và Mật khẩu!");
    return;
  }
  
  
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  
  if (!passwordRegex.test(password)) {
    alert("Mật khẩu không đáp ứng yêu cầu:\n- Phải có ít nhất 6 ký tự.\n- Phải chứa ít nhất một chữ hoa (A-Z).\n- Phải chứa ít nhất một chữ thường (a-z).\n- Phải chứa ít nhất một chữ số (0-9).");
    return;
  }

 
  
  const defaultRole = email.includes('@') ? email : 'Sinh viên ' + email; 

  alert("Đăng nhập thành công!\nXin chào " + defaultRole);

  
  localStorage.setItem("username", defaultRole);

  
  window.location.href = "trangchu.html";
});


function togglePassword() {
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("eyeIcon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.innerHTML = `
      <path d="M12 6a9.77 9.77 0 018.94 6A9.77 9.77 0 0112 18a9.77 9.77 0 01-8.94-6A9.77 9.77 0 0112 6m0-2C6 4 1.73 7.11 0 12c1.73 4.89 6 8 12 8s10.27-3.11 12-8c-1.73-4.89-6-8-12-8zm0 5a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3z"/>`;
  } else {
    passwordInput.type = "password";
    eyeIcon.innerHTML = `
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17
      c-2.76 0-5-2.24-5-5s2.24-5 5-5
      5 2.24 5 5-2.24 5-5 5z"/>`;
  }
}
