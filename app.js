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
    return "home";
  })();

  links.forEach(a => {
    const active = a.dataset.page === pageFromFile;
    a.classList.toggle("active", active);
    a.setAttribute("aria-current", active ? "page" : "false");
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

document.addEventListener("DOMContentLoaded", () => {
  initTopNavActive();
  initNotificationsPage();
  initFeaturedSliderAuto(); // gọi slider tự động
});