const form = document.getElementById("registerForm");
const alertBox = document.getElementById("alertBox");
const passwordError = document.getElementById("passwordError");

// Hàm validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Hàm validate mật khẩu mạnh
function isStrongPassword(password) {
  // Tối thiểu 8 ký tự, có chữ hoa, chữ thường và số
  return password.length >= 8 && 
         /[a-z]/.test(password) && 
         /[A-Z]/.test(password) && 
         /[0-9]/.test(password);
}

// Hàm hiển thị thông báo
function showAlert(message, type = "success") {
  alertBox.style.display = "block";
  alertBox.textContent = message;
  
  if (type === "success") {
    alertBox.style.backgroundColor = "#e8f5e9";
    alertBox.style.color = "#2e7d32";
    alertBox.style.borderColor = "#a5d6a7";
  } else if (type === "error") {
    alertBox.style.backgroundColor = "#ffebee";
    alertBox.style.color = "#d32f2f";
    alertBox.style.borderColor = "#ef9a9a";
  } else if (type === "warning") {
    alertBox.style.backgroundColor = "#fff3e0";
    alertBox.style.color = "#f57c00";
    alertBox.style.borderColor = "#ffcc80";
  }
}

// Hàm ẩn thông báo
function hideAlert() {
  alertBox.style.display = "none";
}

// Hàm lưu dữ liệu vào memory (có thể mở rộng để lưu vào database)
function saveUserData(userData) {
  // Lưu vào array trong memory
  if (!window.registeredUsers) {
    window.registeredUsers = [];
  }
  window.registeredUsers.push(userData);
  
  console.log("Người dùng đã đăng ký:", userData);
  console.log("Tổng số người dùng:", window.registeredUsers.length);
  
  return true;
}

// Kiểm tra username đã tồn tại chưa
function isUsernameTaken(username) {
  if (!window.registeredUsers) return false;
  return window.registeredUsers.some(user => user.username === username);
}

// Kiểm tra email đã tồn tại chưa
function isEmailTaken(email) {
  if (!window.registeredUsers) return false;
  return window.registeredUsers.some(user => user.email === email);
}

// Xử lý real-time validation cho mật khẩu
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

confirmPasswordInput.addEventListener("input", function() {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  
  if (confirmPassword && password !== confirmPassword) {
    passwordError.textContent = "❌ Mật khẩu xác nhận không khớp!";
    passwordError.style.display = "block";
  } else {
    passwordError.textContent = "";
    passwordError.style.display = "none";
  }
});

// Xử lý submit form
form.addEventListener("submit", function(e) {
  e.preventDefault(); // Ngăn gửi form mặc định
  
  // Ẩn thông báo cũ
  hideAlert();
  passwordError.textContent = "";
  
  // Lấy dữ liệu từ form
  const fullname = document.getElementById("fullname").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  
  // Lấy giới tính (radio button)
  const genderRadios = document.querySelectorAll('input[name="gender"]');
  let gender = "";
  for (const radio of genderRadios) {
    if (radio.checked) {
      gender = radio.value;
      break;
    }
  }
  
  const timezone = document.getElementById("timezone").value;
  const language = document.getElementById("language").value;
  const organization = document.getElementById("organization").value.trim();
  
  // Validate các trường bắt buộc
  if (!username) {
    showAlert("❌ Vui lòng nhập tên truy cập!", "error");
    document.getElementById("username").focus();
    return;
  }
  
  if (!email) {
    showAlert("❌ Vui lòng nhập địa chỉ email!", "error");
    document.getElementById("email").focus();
    return;
  }
  
  if (!password) {
    showAlert("❌ Vui lòng nhập mật khẩu!", "error");
    document.getElementById("password").focus();
    return;
  }
  
  if (!confirmPassword) {
    showAlert("❌ Vui lòng xác nhận mật khẩu!", "error");
    document.getElementById("confirmPassword").focus();
    return;
  }
  
  // Validate định dạng email
  if (!isValidEmail(email)) {
    showAlert("❌ Địa chỉ email không hợp lệ!", "error");
    document.getElementById("email").focus();
    return;
  }
  
  // Kiểm tra username đã tồn tại
  if (isUsernameTaken(username)) {
    showAlert("❌ Tên truy cập đã được sử dụng!", "error");
    document.getElementById("username").focus();
    return;
  }
  
  // Kiểm tra email đã tồn tại
  if (isEmailTaken(email)) {
    showAlert("❌ Email đã được đăng ký!", "error");
    document.getElementById("email").focus();
    return;
  }
  
  // Kiểm tra độ mạnh mật khẩu
  if (!isStrongPassword(password)) {
    showAlert("⚠️ Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số!", "warning");
    document.getElementById("password").focus();
    return;
  }
  
  // Kiểm tra mật khẩu khớp
  if (password !== confirmPassword) {
    passwordError.textContent = "❌ Mật khẩu xác nhận không khớp!";
    showAlert("❌ Mật khẩu xác nhận không khớp!", "error");
    document.getElementById("confirmPassword").focus();
    return;
  }
  
  // Tạo object userData
  const userData = {
    fullname: fullname || "Không có",
    username: username,
    email: email,
    password: password, // Trong thực tế nên mã hóa
    gender: gender || "Không xác định",
    timezone: timezone,
    language: language,
    organization: organization || "Không có",
    registeredAt: new Date().toLocaleString('vi-VN')
  };
  
  // Lưu dữ liệu
  saveUserData(userData);
  
  // Hiển thị thông báo thành công
  showAlert(`✅ Đăng ký thành công! Xin chào, ${username}!`, "success");
  
  // Log thông tin ra console
  console.log("=== THÔNG TIN ĐĂNG KÝ ===");
  console.log("Họ và tên:", userData.fullname);
  console.log("Tên truy cập:", userData.username);
  console.log("Email:", userData.email);
  console.log("Giới tính:", userData.gender);
  console.log("Múi giờ:", userData.timezone);
  console.log("Ngôn ngữ:", userData.language);
  console.log("Tổ chức:", userData.organization);
  console.log("Thời gian đăng ký:", userData.registeredAt);
  console.log("========================");
  
  // Reset form sau 2.5 giây
  setTimeout(() => {
    form.reset();
    hideAlert();
    passwordError.textContent = "";
  }, 2500);
});

// Thêm hiệu ứng focus cho các input
const inputs = document.querySelectorAll('input, select');
inputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.style.borderColor = '#0078d7';
    this.style.boxShadow = '0 0 0 3px rgba(0, 120, 215, 0.1)';
  });
  
  input.addEventListener('blur', function() {
    this.style.borderColor = '#ccc';
    this.style.boxShadow = 'none';
  });
});

// Log khi script được load
console.log("✓ Script dangnhap.js đã được tải thành công!");
console.log("Sẵn sàng xử lý đăng ký người dùng.");