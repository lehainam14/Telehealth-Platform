function showToast(text) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = text;
  toast.classList.add("show");

  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => toast.classList.remove("show"), 1600);
}

function initTopNavActive() {
  const links = document.querySelectorAll("a[data-page]");
  if (!links.length) return;

  const path = window.location.pathname || "";
  const file = path.split("/").pop(); // e.g. "index.html"

  const pageFromFile = (() => {
    if (file === "notifications.html") return "notifications";
    if (file === "home.html") return "home";
    return null;
  })();

  links.forEach(a => {
    const active = pageFromFile && a.dataset.page === pageFromFile;
    a.classList.toggle("active", active);
    a.setAttribute("aria-current", active ? "page" : "false");
  });
}

const AUTH_STORAGE_KEY = "telehealth_current_user";

function getCurrentUser() {
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
}

function setCurrentUser(user) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

function clearCurrentUser() {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

function syncHeaderAuthLink() {
  const authLink = document.querySelector(".ym-login");
  if (!authLink) return;

  const user = getCurrentUser();
  if (user) {
    authLink.textContent = "Hồ sơ";
    authLink.href = "profile.html";
    return;
  }

  authLink.textContent = "Đăng nhập";
  authLink.href = "login.html";
}

function initLoginPage() {
  const form = document.getElementById("login-form");
  if (!form) return;

  const user = getCurrentUser();
  if (user) {
    window.location.href = "profile.html";
    return;
  }

  const errorEl = document.getElementById("login-error");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email")?.value?.trim() || "";
    const password = document.getElementById("password")?.value || "";

    if (email !== "patient@telehealth.vn" || password !== "123456") {
      if (errorEl) {
        errorEl.textContent = "Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.";
        errorEl.classList.remove("hidden");
      }
      return;
    }

    const currentUser = {
      fullName: "Nguyễn Minh Anh",
      email: "patient@telehealth.vn",
      phone: "0912 345 678",
      birthDate: "12/07/2001"
    };

    setCurrentUser(currentUser);
    syncHeaderAuthLink();
    window.location.href = "profile.html";
  });
}

function initProfilePage() {
  const profileRoot = document.getElementById("profile-root");
  if (!profileRoot) return;

  const user = getCurrentUser();
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const nameEl = document.getElementById("pf-name");
  const emailEl = document.getElementById("pf-email");
  const phoneEl = document.getElementById("pf-phone");
  const birthEl = document.getElementById("pf-birth");
  const logoutBtn = document.getElementById("btn-logout");

  if (nameEl) nameEl.textContent = user.fullName || "Chưa cập nhật";
  if (emailEl) emailEl.textContent = user.email || "Chưa cập nhật";
  if (phoneEl) phoneEl.textContent = user.phone || "Chưa cập nhật";
  if (birthEl) birthEl.textContent = user.birthDate || "Chưa cập nhật";

  logoutBtn?.addEventListener("click", () => {
    clearCurrentUser();
    syncHeaderAuthLink();
    window.location.href = "login.html";
  });
}

function initNotificationsPage() {
  const segBtns = document.querySelectorAll(".seg-btn");
  const notifList = document.getElementById("notif-list");
  const notifEmpty = document.getElementById("notif-empty");
  const btnMarkAll = document.getElementById("btn-mark-all");

  if (!segBtns.length || !notifList || !notifEmpty) return;

  const state = { unreadCount: 2 }; // chỉnh để test

  function render(filter) {
    const hasItems = state.unreadCount > 0 || filter === "all";

    if (!hasItems) {
      notifEmpty.classList.remove("hidden");
      notifList.classList.add("hidden");
      notifList.innerHTML = "";
      return;
    }

    notifEmpty.classList.add("hidden");
    notifList.classList.remove("hidden");

    const items = [];
    if (filter === "unread") {
      if (state.unreadCount > 0) {
        items.push({ unread: true, title: "Xác nhận bảo hiểm y tế", sub: "Nhắc bạn hoàn tất thông tin trước khi khám" });
      }
    } else {
      items.push(
        { unread: true, title: "Xác nhận bảo hiểm y tế", sub: "Nhắc bạn hoàn tất thông tin trước khi khám" },
        { unread: false, title: "Chương trình sinh hoạt", sub: "Bạn có thể đăng ký tham gia theo lịch" }
      );
    }

    notifList.innerHTML = items.map(it => `
      <article class="notif-item ${it.unread ? "unread" : ""}">
        <div class="notif-dot" aria-hidden="true"></div>
        <div>
          <div class="notif-title">${it.title}</div>
          <div class="notif-sub">${it.sub}</div>
        </div>
      </article>
    `).join("");
  }

  segBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      segBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      render(btn.dataset.filter || "all");
    });
  });

  btnMarkAll?.addEventListener("click", () => {
    state.unreadCount = 0;
    showToast("Đã đánh dấu tất cả là đã đọc");

    const activeSeg = document.querySelector(".seg-btn.active");
    render(activeSeg?.dataset?.filter || "all");
  });

  // initial
  const activeSeg = document.querySelector(".seg-btn.active");
  render(activeSeg?.dataset?.filter || "all");
}

function initFeaturedSliderAuto() {
  const track = document.getElementById("featured-track");
  const dotsContainer = document.getElementById("featured-dots");
  if (!track || !dotsContainer) return;

  const slides = Array.from(track.children);
  const total = slides.length;
  if (total <= 1) return; // chỉ 1 slide thì khỏi chạy

  let index = 0;
  let timerId = null;
  const AUTO_DELAY = 4000; // 4 giây chuyển 1 lần

  // tạo dots theo số slide
  dotsContainer.innerHTML = slides
    .map((_, i) => `<span class="featured-dot ${i === 0 ? "active" : ""}"></span>`)
    .join("");
  const dots = Array.from(dotsContainer.children);

  function goTo(i, restartTimer = true) {
    index = (i + total) % total; // vòng tròn
    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((d, idx) => d.classList.toggle("active", idx === index));

    if (restartTimer) startTimer();
  }

  function startTimer() {
    if (timerId) clearInterval(timerId);
    timerId = setInterval(() => {
      goTo(index + 1, false); // tự động sang slide kế tiếp
    }, AUTO_DELAY);
  }

  // cho phép click dot để nhảy thẳng tới slide
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => goTo(i, true));
  });

  // khởi động
  goTo(0, true);
}

const AUTH_KEYS = {
  users: "telehealth_users",
  currentUser: "telehealth_current_user"
};

const DEMO_USER = {
  fullName: "Bệnh nhân mẫu",
  email: "patient@telehealth.vn",
  password: "123456",
  phone: "Chưa cập nhật",
  birthDate: "Chưa cập nhật"
};

function loadUsers() {
  try {
    const raw = localStorage.getItem(AUTH_KEYS.users);
    const users = raw ? JSON.parse(raw) : [];
    if (Array.isArray(users)) return users;
  } catch (error) {
    console.warn("Không thể đọc danh sách user:", error);
  }
  return [];
}

function saveUsers(users) {
  localStorage.setItem(AUTH_KEYS.users, JSON.stringify(users));
}

function getCurrentUser() {
  try {
    const raw = localStorage.getItem(AUTH_KEYS.currentUser);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn("Không thể đọc current user:", error);
    return null;
  }
}

function setCurrentUser(user) {
  localStorage.setItem(AUTH_KEYS.currentUser, JSON.stringify(user));
}

function clearCurrentUser() {
  localStorage.removeItem(AUTH_KEYS.currentUser);
}

function syncHeaderAuthLink() {
  const loginLink = document.querySelector(".ym-login");
  if (!loginLink) return;

  const currentUser = getCurrentUser();
  if (currentUser) {
    loginLink.setAttribute("href", "profile.html");
    loginLink.innerHTML = '<i data-lucide="user"></i> Hồ sơ';
  } else {
    loginLink.setAttribute("href", "login.html");
    loginLink.innerHTML = '<i data-lucide="log-in"></i> Đăng nhập';
  }

  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

function normalizeEmail(email) {
  return (email || "").trim().toLowerCase();
}

function showAuthMessage(el, message) {
  if (!el) return;
  if (message) {
    el.textContent = message;
    el.classList.remove("hidden");
  } else {
    el.textContent = "";
    el.classList.add("hidden");
  }
}

function initLoginPage() {
  const loginForm = document.getElementById("login-form");
  if (!loginForm) return;

  const errEl = document.getElementById("login-error");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showAuthMessage(errEl, "");

    const formData = new FormData(loginForm);
    const email = normalizeEmail(formData.get("email"));
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      showAuthMessage(errEl, "Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }

    const users = loadUsers();
    const found = users.find(u => normalizeEmail(u.email) === email && u.password === password);
    const isDemo = email === DEMO_USER.email && password === DEMO_USER.password;

    if (!found && !isDemo) {
      showAuthMessage(errEl, "Email hoặc mật khẩu không đúng.");
      return;
    }

    setCurrentUser(found || DEMO_USER);
    syncHeaderAuthLink();
    window.location.href = "profile.html";
  });
}

function initRegisterPage() {
  const registerForm = document.getElementById("register-form");
  if (!registerForm) return;

  const errEl = document.getElementById("register-error");
  const successEl = document.getElementById("register-success");

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showAuthMessage(errEl, "");
    showAuthMessage(successEl, "");

    const formData = new FormData(registerForm);
    const fullName = String(formData.get("fullName") || "").trim();
    const email = normalizeEmail(formData.get("email"));
    const phone = String(formData.get("phone") || "").trim();
    const birthDate = String(formData.get("birthDate") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (!fullName || !email || !phone || !birthDate || !password || !confirmPassword) {
      showAuthMessage(errEl, "Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (password.length < 6) {
      showAuthMessage(errEl, "Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      showAuthMessage(errEl, "Mật khẩu xác nhận không khớp.");
      return;
    }

    const users = loadUsers();
    const alreadyExists = users.some(u => normalizeEmail(u.email) === email) || email === DEMO_USER.email;
    if (alreadyExists) {
      showAuthMessage(errEl, "Email này đã được sử dụng.");
      return;
    }

    const newUser = { fullName, email, phone, birthDate, password };
    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser);
    syncHeaderAuthLink();
    showAuthMessage(successEl, "Đăng ký thành công! Đang chuyển đến hồ sơ...");

    window.setTimeout(() => {
      window.location.href = "profile.html";
    }, 700);
  });
}

// DOMContentLoaded - Khởi tạo tất cả
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded - Khởi tạo các thành phần");
  syncHeaderAuthLink();
  initLoginPage();
  initRegisterPage();
  initProfilePage();
  initTopNavActive();
  syncHeaderAuthLink();
  initLoginPage();
  initProfilePage();
  initNotificationsPage();
  initFeaturedSliderAuto(); // gọi slider tự động
});