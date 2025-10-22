// ===== DATA STORAGE =====
let scheduleData = {};
let notifications = [];
let assignments = [];
let assignmentChartInstance = null;
let dayDistributionChartInstance = null;

// ===== KHỞI TẠO =====
document.addEventListener("DOMContentLoaded", function () {
    loadData();
    renderSchedule();
    renderNotifications();
    renderAssignments();
    loadUserInfo();

    // Trạng thái thông báo
    const savedNotification = localStorage.getItem("notificationEnabled");
    if (savedNotification !== null) {
        document.getElementById("notificationToggle").checked = savedNotification === "true";
    }

    // Tab khởi đầu
    const dashboardElement = document.querySelector(".menu li:first-child");
    if (dashboardElement) {
        switchMainTab("dashboard", dashboardElement);
    }

    // ESC để đóng modal
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeModal();
    });

    // Kiểm tra bài tập sắp hết hạn khi vào trang
    checkUpcomingAssignments();
});

// ===== LOAD & SAVE DATA =====
function loadData() {
    const savedSchedule = localStorage.getItem("scheduleData");
    const savedNotifications = localStorage.getItem("notifications");
    const savedAssignments = localStorage.getItem("assignments");

    if (savedSchedule) scheduleData = JSON.parse(savedSchedule);
    if (savedNotifications) notifications = JSON.parse(savedNotifications);
    if (savedAssignments) assignments = JSON.parse(savedAssignments);

    initializeDemoData();
}

function saveData() {
    localStorage.setItem("scheduleData", JSON.stringify(scheduleData));
    localStorage.setItem("notifications", JSON.stringify(notifications));
    localStorage.setItem("assignments", JSON.stringify(assignments));
}

// ===== CHUYỂN TAB =====
function switchMainTab(tabId, element) {
    document.querySelectorAll(".menu li").forEach(li => li.classList.remove("active"));
    if (element) element.classList.add("active");

    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    const targetTab = document.getElementById(tabId);
    if (targetTab) targetTab.classList.add("active");

    if (tabId === "statistics") updateStatisticsTab();

    updateHeader(tabId);
}

// ===== CẬP NHẬT HEADER =====
function updateHeader(tabId) {
    const titleElement = document.getElementById("main-title-text");
    const addButton = document.getElementById("add-schedule-btn");

    titleElement.style.opacity = 0;
    setTimeout(() => {
        addButton.style.display = "none";
        titleElement.innerHTML = "";

        switch (tabId) {
            case "dashboard":
                titleElement.innerHTML = "👋 Chào mừng bạn quay trở lại!";
                addButton.style.display = "flex";
                break;
            case "schedule":
                titleElement.innerHTML = "📅 Thời Khóa Biểu";
                addButton.style.display = "flex";
                break;
            case "assignments":
                titleElement.innerHTML = `
                    <img src="images/homework-icon.png" alt="Bài tập"
                    style="width:24px;height:auto;vertical-align:middle;margin-right:8px;"> 
                    Bài Tập`;
                break;
            case "statistics":
                titleElement.innerHTML = "📊 Thống Kê";
                break;
            case "settings":
                titleElement.innerHTML = "⚙️ Cài Đặt";
                break;
        }

        titleElement.style.opacity = 1;
    }, 150);
}

// ===== MODAL =====
function openModal() {
    document.getElementById("addModal").classList.add("active");
}
function closeModal() {
    document.getElementById("addModal").classList.remove("active");
}
document.addEventListener("click", function (event) {
    const modal = document.getElementById("addModal");
    if (event.target === modal) closeModal();
});

// ===== THÊM LỊCH HỌC =====
function addClass(event) {
    event.preventDefault();

    const day = document.getElementById("classDay").value;
    const time = document.getElementById("classTime").value;
    const subject = document.getElementById("classSubject").value;
    const room = document.getElementById("classRoom").value;
    const teacher = document.getElementById("classTeacher").value;

    const key = `${day}-${time}`;
    scheduleData[key] = { subject, room, teacher, day, time };

    saveData();
    renderSchedule();
    closeModal();
    event.target.reset();
    updateStatisticsTab();
    showToast("✓ Đã thêm lịch học thành công!");
}

// ===== RENDER THỜI KHÓA BIỂU =====
function renderSchedule() {
    const scheduleBody = document.getElementById("scheduleBody");
    const times = [
        "07:00 - 08:30", "08:45 - 10:15", "10:30 - 12:00",
        "13:00 - 14:30", "14:45 - 16:15", "16:30 - 18:00"
    ];
    const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];

    scheduleBody.innerHTML = "";
    times.forEach(time => {
        const row = document.createElement("tr");
        const timeCell = document.createElement("td");
        timeCell.textContent = time;
        row.appendChild(timeCell);

        days.forEach(day => {
            const cell = document.createElement("td");
            const classKey = `${day}-${time}`;
            if (scheduleData[classKey]) {
                const c = scheduleData[classKey];
                cell.innerHTML = `
                    <div class="class-cell" onclick="editClass('${classKey}')">
                        <strong>${c.subject}</strong>
                        <small><i class="fas fa-door-open"></i> ${c.room}</small>
                        ${c.teacher ? `<small><i class="fas fa-user"></i> ${c.teacher}</small>` : ""}
                        <button class="delete-class-btn" onclick="deleteClass(event, '${classKey}')">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>`;
            }
            row.appendChild(cell);
        });
        scheduleBody.appendChild(row);
    });
}

function editClass(key) {
    showToast("🛠 Chức năng chỉnh sửa lịch học đang được phát triển...");
}

function deleteClass(event, key) {
    event.stopPropagation();
    if (confirm("Bạn có chắc chắn muốn xóa lịch học này?")) {
        delete scheduleData[key];
        saveData();
        renderSchedule();
        updateStatisticsTab();
        showToast("✓ Đã xóa lịch học!");
    }
}

// ===== THÔNG BÁO =====
function addNotification() {
    const title = document.getElementById("notifTitle").value;
    const date = document.getElementById("notifDate").value;
    if (!title || !date) return showToast("⚠️ Vui lòng điền đầy đủ thông tin!");

    const notification = { id: Date.now(), title, date };
    notifications.unshift(notification);
    saveData();
    renderNotifications();

    document.getElementById("notifTitle").value = "";
    document.getElementById("notifDate").value = "";
    showToast("✓ Đã thêm thông báo!");
}

function renderNotifications() {
    const list = document.getElementById("notificationsList");
    notifications.sort((a, b) => new Date(a.date) - new Date(b.date));

    if (!notifications.length) {
        list.innerHTML = `<p style="text-align:center;color:#6b7280;padding:40px;">Chưa có thông báo nào</p>`;
        return;
    }

    list.innerHTML = notifications.map(n => `
        <div class="notification-card">
            <h4>${n.title}</h4>
            <p><i class="far fa-calendar"></i> ${formatDate(n.date)}</p>
            <button onclick="deleteNotification(${n.id})"><i class="fas fa-trash"></i> Xóa</button>
        </div>`).join("");
}

function deleteNotification(id) {
    if (confirm("Bạn có chắc chắn muốn xóa thông báo này?")) {
        notifications = notifications.filter(n => n.id !== id);
        saveData();
        renderNotifications();
        showToast("✓ Đã xóa thông báo!");
    }
}

// ===== BÀI TẬP =====
function addAssignment() {
    const subject = document.getElementById("assignSubject").value;
    const title = document.getElementById("assignTitle").value;
    const deadline = document.getElementById("assignDeadline").value;
    if (!subject || !title || !deadline)
        return showToast("⚠️ Vui lòng điền đầy đủ thông tin!");

    const assignment = { id: Date.now(), subject, title, deadline, completed: false };
    assignments.unshift(assignment);
    saveData();
    renderAssignments();
    updateStatisticsTab();

    document.getElementById("assignSubject").value = "";
    document.getElementById("assignTitle").value = "";
    document.getElementById("assignDeadline").value = "";
    showToast("✓ Đã thêm bài tập!");
}

function renderAssignments() {
    const list = document.getElementById("assignmentsList");
    assignments.sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
        return new Date(a.deadline) - new Date(b.deadline);
    });

    if (!assignments.length) {
        list.innerHTML = `<p style="text-align:center;color:#6b7280;padding:40px;">Chưa có bài tập nào</p>`;
        return;
    }

    list.innerHTML = assignments.map(a => `
        <div class="assignment-card ${a.completed ? "completed" : ""}">
            <div class="subject"><i class="fas fa-book"></i> ${a.subject}</div>
            <h4>${a.title}</h4>
            <div class="deadline"><i class="far fa-clock"></i> Hạn: ${formatDate(a.deadline)}</div>
            <div class="actions">
                <button onclick="toggleAssignment(${a.id})" class="${a.completed ? "completed" : ""}">
                    <i class="fas ${a.completed ? "fa-check-circle" : "fa-circle"}"></i>
                    ${a.completed ? "Đã hoàn thành" : "Hoàn thành"}
                </button>
                <button class="delete" onclick="deleteAssignment(${a.id})"><i class="fas fa-trash"></i></button>
            </div>
        </div>`).join("");
}

function toggleAssignment(id) {
    const a = assignments.find(x => x.id === id);
    if (a) {
        a.completed = !a.completed;
        saveData();
        renderAssignments();
        showToast(a.completed ? "✓ Đã đánh dấu hoàn thành!" : "✓ Đã bỏ đánh dấu!");
        updateStatisticsTab();
    }
}

function deleteAssignment(id) {
    if (confirm("Bạn có chắc chắn muốn xóa bài tập này?")) {
        assignments = assignments.filter(a => a.id !== id);
        saveData();
        renderAssignments();
        showToast("✓ Đã xóa bài tập!");
        updateStatisticsTab();
    }
}

// ===== HỖ TRỢ CHUNG =====
function formatDate(dateString) {
    const d = new Date(dateString + "T00:00:00");
    if (isNaN(d)) return dateString;
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}/${d.getFullYear()}`;
}

function showToast(message) {
    let toast = document.getElementById("toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast";
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toast.timeoutId);
    toast.timeoutId = setTimeout(() => toast.classList.remove("show"), 3000);
}

// ===== CÀI ĐẶT =====
function loadUserInfo() {
    const loggedInUsername = localStorage.getItem("username");
    const userName = loggedInUsername || localStorage.getItem("userName") || "Người dùng";
    const userRole = localStorage.getItem("userRole") || "Sinh viên";

    const nameInput = document.getElementById("userName");
    const roleSelect = document.getElementById("userRole");

    if (nameInput) nameInput.value = userName;
    if (roleSelect) roleSelect.value = userRole;

    const userDisplay = document.getElementById("user-display-name");
    if (userDisplay) userDisplay.textContent = userName;

    updateHeader(document.querySelector(".tab-content.active")?.id || "dashboard");
}

function saveUserInfo() {
    localStorage.setItem("userName", document.getElementById("userName").value);
    localStorage.setItem("userRole", document.getElementById("userRole").value);
    localStorage.setItem("username", document.getElementById("userName").value);
    loadUserInfo();
    showToast("✓ Đã lưu thông tin người dùng!");
}

function toggleNotification() {
    const toggle = document.getElementById("notificationToggle");
    localStorage.setItem("notificationEnabled", toggle.checked);
    if (toggle.checked) {
        if (!("Notification" in window)) {
            showToast("Trình duyệt không hỗ trợ thông báo desktop.");
            toggle.checked = false;
            return;
        }
        Notification.requestPermission().then(p => {
            if (p === "granted") showToast("✓ Thông báo desktop đã bật.");
            else {
                showToast("⚠️ Cần cấp quyền để bật thông báo.");
                toggle.checked = false;
                localStorage.setItem("notificationEnabled", false);
            }
        });
    } else showToast("✕ Thông báo desktop đã tắt.");
}

// ===== XÓA DỮ LIỆU =====
function clearAllData() {
    if (confirm("⚠️ Xóa toàn bộ dữ liệu?")) {
        localStorage.clear();
        scheduleData = {};
        notifications = [];
        assignments = [];
        if (assignmentChartInstance) assignmentChartInstance.destroy();
        if (dayDistributionChartInstance) dayDistributionChartInstance.destroy();
        loadData();
        renderSchedule();
        renderNotifications();
        renderAssignments();
        loadUserInfo();
        document.getElementById("notificationToggle").checked = false;
        showToast("✓ Dữ liệu đã được đặt lại!");
        switchMainTab("dashboard", document.querySelector(".menu li:first-child"));
    }
}

// ===== THỐNG KÊ =====
function calculateTotalClasses() { return Object.keys(scheduleData).length; }
function calculateCompletedTasks() { return assignments.filter(a => a.completed).length; }
function calculatePendingTasks() { return assignments.filter(a => !a.completed).length; }

function updateStatisticsTab() {
    document.getElementById("totalClasses").textContent = calculateTotalClasses();
    document.getElementById("completedTasks").textContent = calculateCompletedTasks();
    document.getElementById("pendingTasks").textContent = calculatePendingTasks();
    renderAssignmentChart();
    renderDayDistributionChart();
}

// ===== BIỂU ĐỒ =====
function renderAssignmentChart() {
    const subjectCounts = assignments.reduce((acc, a) => {
        const s = a.subject || "Khác";
        acc[s] = (acc[s] || 0) + 1;
        return acc;
    }, {});
    const labels = Object.keys(subjectCounts);
    const data = Object.values(subjectCounts);
    if (assignmentChartInstance) assignmentChartInstance.destroy();
    const ctx = document.getElementById("assignmentChart");
    if (ctx && labels.length) {
        assignmentChartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels,
                datasets: [{ data, backgroundColor: "#667eea" }]
            },
            options: { plugins: { legend: { display: false } }, responsive: true }
        });
    }
}

function renderDayDistributionChart() {
    const dayCounts = { "Thứ 2": 0, "Thứ 3": 0, "Thứ 4": 0, "Thứ 5": 0, "Thứ 6": 0, "Thứ 7": 0, "Chủ nhật": 0 };
    for (const k in scheduleData) if (scheduleData[k]?.day) dayCounts[scheduleData[k].day]++;
    const labels = Object.keys(dayCounts).filter(d => dayCounts[d] > 0);
    const data = labels.map(d => dayCounts[d]);
    if (dayDistributionChartInstance) dayDistributionChartInstance.destroy();
    const ctx = document.getElementById("dayDistributionChart");
    if (ctx && data.length) {
        dayDistributionChartInstance = new Chart(ctx, {
            type: "pie",
            data: { labels, datasets: [{ data }] },
            options: { responsive: true, plugins: { legend: { position: "right" } } }
        });
    }
}

// ===== DỮ LIỆU MẪU =====
function initializeDemoData() {
    if (Object.keys(scheduleData).length === 0) {
        scheduleData = {
            "Thứ 2-07:00 - 08:30": { subject: "Lập trình Web", room: "B301", teacher: "ThS. Trần Văn B", day: "Thứ 2", time: "07:00 - 08:30" },
            "Thứ 3-08:45 - 10:15": { subject: "Cơ sở dữ liệu", room: "A102", teacher: "PGS.TS. Lê Văn C", day: "Thứ 3", time: "08:45 - 10:15" },
            "Thứ 5-08:45 - 10:15": { subject: "Thiết kế web", room: "A102", teacher: "PGS.TS. Lê Văn D", day: "Thứ 5", time: "08:45 - 10:15" }
        };

    }
    if (!notifications.length) {
        notifications = [
            { id: Date.now(), title: "Họp lớp quan trọng", date: "2025-10-25" },
            { id: Date.now() + 1, title: "Đăng ký học kỳ mới", date: "2025-10-28" }
        ];
    }
    if (!assignments.length) {
        assignments = [
            { id: Date.now(), subject: "Toán rời rạc", title: "Bài tập chương 3", deadline: "2025-10-24", completed: false },
            { id: Date.now() + 1, subject: "Lập trình C", title: "Báo cáo đồ án", deadline: "2025-10-26", completed: true }, // ⚠ dấu ,
            { id: Date.now() + 2, subject: "Toán rời rạc", title: "Ôn tập kiểm tra", deadline: "2025-10-27", completed: true },
            { id: Date.now() + 3, subject: "Lập trình hướng đối tượng", title: "Báo cáo đồ án", deadline: "2025-10-28", completed: true }
        ];

    }
    saveData();
}

// ===== THÔNG BÁO TỰ ĐỘNG =====
function checkUpcomingAssignments() {
    const notificationEnabled = localStorage.getItem("notificationEnabled") === "true";
    if (!notificationEnabled || !("Notification" in window)) return;
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    assignments.forEach(a => {
        const deadline = new Date(a.deadline + "T00:00:00");
        const diff = deadline - now;
        if (!a.completed && diff > 0 && diff < 24 * 60 * 60 * 1000) {
            showDesktopNotification("🕒 Sắp đến hạn nộp bài!", `Bài tập "${a.title}" (${a.subject}) sẽ hết hạn vào ${formatDate(a.deadline)}.`);
        }
    });
}

function showDesktopNotification(title, body) {
    if (Notification.permission === "granted") {
        new Notification(title, { body, icon: "images/notify-icon.png" });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(p => {
            if (p === "granted") new Notification(title, { body });
        });
    }
}

const oldAddAssignment = addAssignment;
addAssignment = function () {
    oldAddAssignment();
    const notificationEnabled = localStorage.getItem("notificationEnabled") === "true";
    if (notificationEnabled) showDesktopNotification("📝 Đã thêm bài tập mới", "Bạn vừa thêm một bài tập mới!");
};

const oldAddNotification = addNotification;
addNotification = function () {
    oldAddNotification();
    const notificationEnabled = localStorage.getItem("notificationEnabled") === "true";
    if (notificationEnabled) showDesktopNotification("🔔 Thông báo mới", "Một thông báo mới vừa được thêm.");
};

setInterval(checkUpcomingAssignments, 60 * 60 * 1000);

window.switchMainTab = switchMainTab;
