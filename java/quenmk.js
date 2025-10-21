// Đơn giản, client-side validation + ví dụ gọi API.
// Bạn cần thay URL_API bằng endpoint backend thật của mình.

const emailForm = document.getElementById('emailForm');
const resetForm = document.getElementById('resetForm');
const stepEmail = document.getElementById('step-email');
const stepReset = document.getElementById('step-reset');
const stepDone = document.getElementById('step-done');
const globalMsg = document.getElementById('globalMsg');
const backToEmail = document.getElementById('backToEmail');

function showStep(stepEl) {
  [stepEmail, stepReset, stepDone].forEach(s => {
    s.classList.remove('active');
    s.setAttribute('aria-hidden', 'true');
  });
  stepEl.classList.add('active');
  stepEl.setAttribute('aria-hidden', 'false');
  globalMsg.textContent = '';
}

// VALIDATORS
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isStrongPassword(pw) {
  return /(?=.{8,})/.test(pw) && /[a-z]/.test(pw) && /[A-Z]/.test(pw) && /\d/.test(pw);
}

// Step 1: gửi mã
emailForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailForm.email.value.trim();
  const emailError = document.getElementById('emailError');

  emailError.textContent = '';
  if (!email) { emailError.textContent = 'Vui lòng nhập email.'; return; }
  if (!isValidEmail(email)) { emailError.textContent = 'Email không hợp lệ.'; return; }

  // disable button
  const btn = emailForm.querySelector('button');
  btn.disabled = true;
  btn.textContent = 'Đang gửi...';

  try {
    // TODO: Thay bằng API của bạn
    // Ví dụ (fetch):
    /*
    const resp = await fetch('/api/request-reset', {
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({email})
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.message || 'Lỗi máy chủ');
    */

    // Mô phỏng thành công:
    await new Promise(r => setTimeout(r, 800));

    showStep(stepReset);
    // bạn có thể show message: "Mã đã được gửi tới email..."
    globalMsg.textContent = 'Mã xác thực đã được gửi tới email của bạn.';
    // nếu backend trả token id hay expire, lưu tạm nếu cần
  } catch (err) {
    emailError.textContent = err.message || 'Gửi mã thất bại. Thử lại.';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Gửi mã xác thực';
  }
});

// Step 2: reset password
resetForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const code = resetForm.code.value.trim();
  const password = resetForm.password.value;
  const confirm = resetForm.confirm.value;

  const codeError = document.getElementById('codeError');
  const passwordError = document.getElementById('passwordError');
  const confirmError = document.getElementById('confirmError');

  codeError.textContent = passwordError.textContent = confirmError.textContent = '';

  if (!code) { codeError.textContent = 'Nhập mã xác thực.'; return; }
  if (!password) { passwordError.textContent = 'Nhập mật khẩu mới.'; return; }
  if (!isStrongPassword(password)) {
    passwordError.textContent = 'Mật khẩu quá yếu. Cần ít nhất 8 ký tự, chữ hoa, chữ thường và số.';
    return;
  }
  if (password !== confirm) { confirmError.textContent = 'Mật khẩu xác nhận không khớp.'; return; }

  const btn = resetForm.querySelector('button');
  btn.disabled = true;
  btn.textContent = 'Đang xử lý...';

  try {
    // TODO: Thay bằng API của bạn
    /*
    const resp = await fetch('/api/reset-password', {
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        email: document.getElementById('email').value.trim(),
        code,
        password
      })
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.message || 'Lỗi máy chủ');
    */

    // Mô phỏng delay:
    await new Promise(r => setTimeout(r, 800));

    showStep(stepDone);
  } catch (err) {
    globalMsg.textContent = err.message || 'Đặt lại mật khẩu thất bại.';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Đặt lại mật khẩu';
  }
});

backToEmail.addEventListener('click', () => {
  showStep(stepEmail);
});

// khởi tạo
showStep(stepEmail);
