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
  const file = path.split("/").pop();

  const pageFromFile = (() => {
    if (file === "notifications.html") return "notifications";
    if (file === "home.html") return "home";
    return null;
  })();

  links.forEach(a => {
    const active = a.dataset.page === pageFromFile;
    a.classList.toggle("active", active);
    a.setAttribute("aria-current", active ? "page" : "false");
  });

  const dropdownLinks = document.querySelectorAll(".dropdown-menu li a");
  dropdownLinks.forEach(a => {
    const href = a.getAttribute("href") || "";
    if (href && (file === href.split("/").pop())) {
      const parentDropdown = a.closest(".ym-dropdown");
      if (parentDropdown) {
        parentDropdown.style.background = "rgba(31,120,255,0.14)";
        parentDropdown.style.color = "rgba(11,58,120,0.95)";
        parentDropdown.style.borderRadius = "999px";
      }
    }
  });
}

function initNotificationsPage() {
  const segBtns = document.querySelectorAll(".seg-btn");
  const notifList = document.getElementById("notif-list");
  const notifEmpty = document.getElementById("notif-empty");
  const btnMarkAll = document.getElementById("btn-mark-all");

  if (!segBtns.length || !notifList || !notifEmpty) return;

  const state = { unreadCount: 2 };

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
        { unread: true,  title: "Xác nhận bảo hiểm y tế", sub: "Nhắc bạn hoàn tất thông tin trước khi khám" },
        { unread: false, title: "Chương trình sinh hoạt",  sub: "Bạn có thể đăng ký tham gia theo lịch" }
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

  const activeSeg = document.querySelector(".seg-btn.active");
  render(activeSeg?.dataset?.filter || "all");
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

// ===== NÚT ĐẶT LỊCH KHÁM =====
function initBookingButtons() {
  const bookButtons = document.querySelectorAll('.btn-book-home');
  bookButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const doctor = btn.getAttribute('data-doctor') || 'Bác sĩ';
      const specialty = btn.getAttribute('data-specialty') || '';
      const hospital = btn.getAttribute('data-hospital') || '';
      
      showToast(`Đã chọn: ${doctor} - ${specialty}. Vui lòng đăng nhập để đặt lịch.`);
    });
  });
}

// ===== SLIDER CHO TIN TỨC - CHỈ CHẠY TRÊN DESKTOP =====
function initNewsSlider() {
  const newsViewport = document.querySelector('.news-slider-viewport');
  const newsGrid = document.querySelector('.news-grid');
  const newsDots = document.getElementById('news-dots');
  
  if (!newsGrid || !newsDots || !newsViewport) return;
  
  const newsItems = Array.from(document.querySelectorAll('.news-card'));
  if (newsItems.length === 0) return;
  
  function isDesktop() {
    return window.innerWidth >= 861;
  }
  
  if (!isDesktop()) return;
  
  const itemsPerPage = 2;
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);
  let currentPage = 0;
  let autoInterval;
  const AUTO_DELAY = 4000;
  
  // Tính khoảng cách cần trượt = chiều rộng viewport (hiển thị đúng 2 card)
  function getScrollDistance() {
    return newsViewport.offsetWidth + 24; // width + gap
  }
  
  // Tạo dots
  function createDots() {
    newsDots.innerHTML = '';
    newsDots.style.display = 'flex';
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('span');
      dot.className = 'news-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', (function(idx) {
        return function() { goToPage(idx); };
      })(i));
      newsDots.appendChild(dot);
    }
  }
  
  function updateDots() {
    document.querySelectorAll('.news-dot').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentPage);
    });
  }
  
  function showPage(page) {
    currentPage = Math.min(Math.max(0, page), totalPages - 1);
    const offset = currentPage * getScrollDistance();
    newsGrid.style.transform = `translateX(-${offset}px)`;
    updateDots();
  }
  
  function goToPage(page) {
    showPage(page);
    resetAutoPlay();
  }
  
  function nextPage() {
    showPage(currentPage + 1 >= totalPages ? 0 : currentPage + 1);
  }
  
  function resetAutoPlay() {
    clearInterval(autoInterval);
    autoInterval = setInterval(nextPage, AUTO_DELAY);
  }
  
  function stopAutoPlay() {
    clearInterval(autoInterval);
  }
  
  const newsSection = document.querySelector('.news-section');
  if (newsSection) {
    newsSection.addEventListener('mouseenter', stopAutoPlay);
    newsSection.addEventListener('mouseleave', resetAutoPlay);
  }
  
  createDots();
  setTimeout(() => {
    showPage(0);
    resetAutoPlay();
  }, 100);
  
  // Recalculate on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (isDesktop()) {
        newsGrid.style.transition = 'none';
        showPage(currentPage);
        setTimeout(() => { newsGrid.style.transition = 'transform 0.5s ease'; }, 50);
      }
    }, 100);
  });
}

// ===== TESTIMONIALS - CHẠY NGANG TỰ ĐỘNG =====
function initTestimonialsSlider() {
  const track = document.getElementById('testimonialsTrack');
  if (!track) return;
  
  const allCards = document.querySelectorAll('.testimonial-card');
  const originalCount = Math.ceil(allCards.length / 2);
  
  if (originalCount <= 1) return;
  
  let currentIndex = 0;
  let autoScrollInterval;
  const AUTO_DELAY = 5000;
  
  function getCardWidth() {
    const card = document.querySelector('.testimonial-card');
    if (!card) return 364;
    const width = card.offsetWidth;
    const gap = 24;
    return width + gap;
  }
  
  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= originalCount) index = originalCount - 1;
    currentIndex = index;
    
    const cardWidth = getCardWidth();
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }
  
  function nextSlide() {
    if (currentIndex >= originalCount - 1) {
      currentIndex = -1;
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(currentIndex + 1);
    }
  }
  
  function startAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(nextSlide, AUTO_DELAY);
  }
  
  function stopAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
  }
  
  const wrapper = document.querySelector('.testimonials-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAutoScroll);
    wrapper.addEventListener('mouseleave', startAutoScroll);
  }
  
  startAutoScroll();
  
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      track.style.transition = 'none';
      track.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
      setTimeout(() => {
        track.style.transition = 'transform 0.5s ease';
      }, 50);
    }, 100);
  });
}

// ===== TÌM KIẾM =====
function initSearch() {
  const searchForm = document.querySelector('.ym-search');
  const searchInput = document.querySelector('.ym-searchInput');
  
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const keyword = searchInput?.value.trim();
      if (keyword) {
        showToast(`Đang tìm kiếm: "${keyword}"`);
      } else {
        showToast('Vui lòng nhập từ khóa tìm kiếm');
      }
    });
  }
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
  initNotificationsPage();
  initNewsSlider();
  initTestimonialsSlider();
  initBookingButtons();
  initSearch();
});