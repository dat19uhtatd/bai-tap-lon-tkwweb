# 📚 HỆ THỐNG QUẢN LÝ LỊCH HỌC

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

**Ứng dụng web quản lý thời khóa biểu, bài tập và thông báo cho sinh viên & giáo viên**

[Tính năng](#-tính-năng-chính) • [Cài đặt](#-cài-đặt) • [Sử dụng](#-hướng-dẫn-sử-dụng) • [Đóng góp](#-quy-trình-git-workflow)

</div>

---

## 📌 Giới thiệu

**Hệ thống Quản lý Lịch học** là ứng dụng web giúp sinh viên và giáo viên quản lý hiệu quả:

- ⏰ Thời khóa biểu hàng tuần
- 📝 Bài tập với deadline và trạng thái hoàn thành
- 🔔 Thông báo cá nhân với tính năng nhắc nhở
- 📊 Thống kê trực quan qua biểu đồ

Ứng dụng được xây dựng với **HTML, CSS, JavaScript** thuần túy, sử dụng **LocalStorage** để lưu trữ dữ liệu phía client, đảm bảo trải nghiệm mượt mà và không cần kết nối server.

---

## ✨ Tính năng chính

### Quản lý Lịch học
- Thêm/hiển thị/xóa buổi học theo ngày và khung giờ
- Tự động lưu trữ bằng LocalStorage
- Giao diện lịch trực quan, dễ theo dõi

###  Quản lý Bài tập
- Thêm bài tập theo môn học và hạn nộp
- Đánh dấu trạng thái hoàn thành/chưa hoàn thành
- Sắp xếp và lọc bài tập theo deadline

###  Quản lý Thông báo
- Tạo thông báo với ngày nhắc nhở
- Hiển thị danh sách thông báo sắp tới
- Hỗ trợ thông báo desktop (nếu được phép)

###  Thống kê trực quan
- Tổng số lịch học, bài tập hoàn thành/chưa hoàn thành
- Biểu đồ cột: Lịch học theo ngày trong tuần
- Biểu đồ tròn: Tỷ lệ hoàn thành bài tập
- Powered by **Chart.js**

### ⚙️ Cài đặt cá nhân
- Lưu tên người dùng và vai trò (sinh viên/giáo viên)
- Bật/tắt thông báo desktop
- Xóa toàn bộ dữ liệu cục bộ (reset ứng dụng)

---

## 🛠️ Công nghệ sử dụng

| Thành phần | Công nghệ |
|------------|-----------|
| **Giao diện** | HTML5, CSS3 (Flexbox, Grid, Gradient) |
| **Logic & Tương tác** | JavaScript (ES6+) |
| **Lưu trữ dữ liệu** | LocalStorage API |
| **Biểu đồ** | [Chart.js](https://www.chartjs.org/) |
| **Icons** | [Font Awesome](https://fontawesome.com/) |

---

## 🚀 Cài đặt

### Yêu cầu hệ thống
- Trình duyệt hiện đại (Chrome 90+, Firefox 88+, Safari 14+)
- JavaScript được bật
- LocalStorage được hỗ trợ

### Hướng dẫn cài đặt

**1. Clone repository**
```bash
git clone https://github.com/dat19uhtatd/btl-tk-web.git
cd btl-tk-web
```

**2. Chạy ứng dụng**

**Cách 1:** Mở trực tiếp file
```bash
# Mở file trangchu.html bằng trình duyệt
open trangchu.html        # macOS
start trangchu.html       # Windows
xdg-open trangchu.html    # Linux
```

**Cách 2:** Chạy local server (khuyến nghị)
```bash
# Sử dụng Python
python -m http.server 8000

# Hoặc Node.js
npx http-server -p 8000

# Truy cập: http://localhost:8000
```

**Cách 3:** Sử dụng VS Code Live Server
- Cài extension "Live Server"
- Click phải `trangchu.html` → "Open with Live Server"

---

**Cách 4:** Nhấn vào link này: http://127.0.0.1:5500/dangnhap.html


---

## 📖 Hướng dẫn sử dụng

### 1. Thêm lịch học
1. Chọn tab **"Lịch học"**
2. Click **"+ Thêm lịch học"**
3. Điền thông tin: Thứ, giờ học, môn học, phòng, giảng viên
4. Click **"Lưu"**

### 2. Quản lý bài tập
1. Chọn tab **"Bài tập"**
2. Click **"+ Thêm bài tập"**
3. Nhập: Tên bài tập, môn học, hạn nộp
4. Đánh dấu hoàn thành bằng checkbox
5. Xóa bài tập nếu cần

### 3. Tạo thông báo
1. Chọn tab **"Thông báo"**
2. Click **"+ Thêm thông báo"**
3. Nhập: Tiêu đề, nội dung, thời gian nhắc
4. Hệ thống tự động nhắc khi đến giờ

### 4. Xem thống kê
- Chọn tab **"Thống kê"**
- Xem biểu đồ lịch học và tỷ lệ hoàn thành bài tập
- Theo dõi các chỉ số tổng quan

---



---

## 🤝 Quy trình Git Workflow

### Quy tắc cơ bản
- ❌ **KHÔNG BAO GIỜ** push trực tiếp lên `main`
- ✅ **LUÔN LUÔN** tạo Pull Request
- ✅ **PHẢI** pull code mới nhất trước khi bắt đầu

### Các bước thực hiện

**1. Pull code mới nhất**
```bash
git checkout main
git pull origin main
```

**2. Tạo branch mới**
```bash
git checkout -b feature/ten-tinh-nang
# hoặc
git checkout -b fix/ten-loi-can-sua
```

**Quy ước đặt tên branch:**
- `feature/` - Tính năng mới
- `fix/` - Sửa lỗi
- `refactor/` - Tái cấu trúc code
- `docs/` - Cập nhật tài liệu

**3. Commit changes**
```bash
git add .
git commit -m "type: mô tả ngắn gọn"
```

**Quy ước commit message:**
- `feat:` - Tính năng mới
- `fix:` - Sửa lỗi
- `docs:` - Cập nhật tài liệu
- `style:` - Format code
- `refactor:` - Tái cấu trúc code

**4. Push và tạo Pull Request**
```bash
git push origin feature/ten-tinh-nang
```

Sau đó:
1. Truy cập GitHub repository
2. Click **"New Pull Request"**
3. Điền thông tin PR: mục tiêu, thay đổi chính, cách test
4. Request review và chờ approve


### Quy tắc chung
- **Indent:** 2 spaces
- **Naming:**
  - Variables/Functions: `camelCase`
  - CSS classes: `kebab-case` hoặc BEM
- **Comments:** Ngắn gọn, rõ ràng
- **Tách module:** Mỗi page/component 1 file CSS riêng
- **Ngôn ngữ:** Ưu tiên tiếng Anh cho tên class/biến

---

## 👨‍💻 Thông tin dự án

**Sinh viên thực hiện:**
- **Họ và tên:** Phan Tiến Đạt
- **Lớp:** CNTT3-K65
- **Môn học:** Thiết kế Web
- **Trường:** Đại học Giao thông Vận tải

**Liên hệ:**
- GitHub: [@dat19uhtatd](https://github.com/dat19uhtatd)
- Repository: [btl-tk-web](https://github.com/dat19uhtatd/btl-tk-web)

---

## 📄 License

Dự án này được phát triển cho mục đích học tập tại Đại học Giao thông Vận tải.

---

<div align="center">

**⭐ Nếu thấy hữu ích, đừng quên star repo nhé! ⭐**

Made with ❤️ by Phan Tiến Đạt

</div>
