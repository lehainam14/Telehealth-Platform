// Router and Navigation
const pages = {
    home: renderHomePage,
    appointments: renderAppointmentsPage,
    'create-record': renderCreateRecordPage,
    notifications: renderNotificationsPage,
    profile: renderProfilePage,
    functions: renderFunctionsPage
};

let currentStep = 1;
let currentTab = 'completed';
let currentNotifTab = 'all';

// User session data
let userSession = {
    isLoggedIn: false,
    username: '039****634',
    fullname: 'Nguyễn Văn A',
    phone: '0987654321',
    email: 'nguyenvana@example.com',
    dob: '1990-01-15',
    gender: 'male',
    avatar: 'NVA'
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Setup modal listeners
    setupModalListeners();
    
    // Setup header login button
    setupHeaderLoginButton();
    
    // Update header display based on login state
    updateHeaderDisplay();
    
    // Setup profile menu only if logged in
    if (userSession.isLoggedIn) {
        setupProfileMenu();
    }
    
    // Handle navigation
    window.addEventListener('hashchange', handleRoute);
    
    // Handle initial route
    handleRoute();
    
    // Setup nav item clicks
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
});

// Modal Functions
function setupModalListeners() {
    // Close button listeners
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modalId = btn.getAttribute('data-modal');
            closeModal(modalId);
        });
    });
    
    // Overlay click to close
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = loginForm.querySelectorAll('input');
            const username = inputs[0].value;
            const password = inputs[1].value;
            
            if (username && password) {
                userSession.isLoggedIn = true;
                userSession.username = username;
                closeModal('login-modal');
                updateHeaderDisplay();
                setupProfileMenu();
                alert('Đăng nhập thành công!');
                handleRoute();
            }
        });
    }
    
    // Edit profile form
    const editForm = document.getElementById('edit-profile-form');
    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullname = document.getElementById('edit-fullname').value;
            const phone = document.getElementById('edit-phone').value;
            const email = document.getElementById('edit-email').value;
            const dob = document.getElementById('edit-dob').value;
            const gender = document.getElementById('edit-gender').value;
            
            if (fullname && phone && email && dob && gender) {
                userSession.fullname = fullname;
                userSession.phone = phone;
                userSession.email = email;
                userSession.dob = dob;
                userSession.gender = gender;
                closeModal('edit-profile-modal');
                alert('Thông tin đã được cập nhật thành công!');
                // Refresh profile page if currently viewing it
                if (window.location.hash === '#profile') {
                    handleRoute();
                }
            }
        });
    }
    
    // Sign up form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = signupForm.querySelectorAll('input');
            const username = inputs[0].value;
            const phone = inputs[1].value;
            const password = inputs[2].value;
            const confirmPassword = inputs[3].value;
            
            if (username && phone && password && confirmPassword) {
                if (password === confirmPassword) {
                    userSession.isLoggedIn = true;
                    userSession.username = username;
                    userSession.phone = phone;
                    closeModal('signup-modal');
                    updateHeaderDisplay();
                    setupProfileMenu();
                    alert('Đăng ký thành công! Chào mừng bạn đến với Telehealth Platform');
                    handleRoute();
                } else {
                    alert('Mật khẩu xác nhận không khớp!');
                }
            }
        });
    }
    
    // Switch between login and signup modals
    const signupLink = document.getElementById('signup-link');
    const loginLink = document.getElementById('login-link');
    
    if (signupLink) {
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal('login-modal');
            openModal('signup-modal');
        });
    }
    
    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal('signup-modal');
            openModal('login-modal');
        });
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Header Display Functions
function updateHeaderDisplay() {
    const headerLoginBtn = document.getElementById('header-login-btn');
    const profileSection = document.getElementById('profile-section');
    const profileNavItem = document.getElementById('profile-nav-item');
    
    if (userSession.isLoggedIn) {
        headerLoginBtn.style.display = 'none';
        profileSection.style.display = 'block';
        if (profileNavItem) profileNavItem.style.display = 'flex';
    } else {
        headerLoginBtn.style.display = 'block';
        profileSection.style.display = 'none';
        if (profileNavItem) profileNavItem.style.display = 'none';
    }
}

function setupHeaderLoginButton() {
    const headerLoginBtn = document.getElementById('header-login-btn');
    if (headerLoginBtn) {
        headerLoginBtn.addEventListener('click', () => {
            openModal('login-modal');
        });
    }
}
function setupProfileMenu() {
    const profileBtn = document.getElementById('profile-menu-btn');
    const profileMenu = document.getElementById('profile-menu');
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Toggle menu
    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profileMenu.classList.toggle('hidden');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
            profileMenu.classList.add('hidden');
        }
    });
    
    // Edit profile
    editProfileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        profileMenu.classList.add('hidden');
        populateEditForm();
        openModal('edit-profile-modal');
    });
    
    // Logout
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        profileMenu.classList.add('hidden');
        if (confirm('Bạn có chắc muốn đăng xuất?')) {
            userSession.isLoggedIn = false;
            alert('Đã đăng xuất thành công');
            updateHeaderDisplay();
            window.location.hash = '#home';
            handleRoute();
        }
    });
}

function updateProfileAvatar() {
    const avatarText = document.getElementById('profile-avatar-text');
    if (avatarText && userSession.username) {
        avatarText.textContent = userSession.username;
    }
}

function populateEditForm() {
    document.getElementById('edit-fullname').value = userSession.fullname;
    document.getElementById('edit-phone').value = userSession.phone;
    document.getElementById('edit-email').value = userSession.email;
    document.getElementById('edit-dob').value = userSession.dob;
    document.getElementById('edit-gender').value = userSession.gender;
}

function handleRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    const page = hash.split('/')[0];
    
    if (pages[page]) {
        document.getElementById('page-content').innerHTML = pages[page]();
        updateActiveNav(page);
        attachEventListeners();
    }
}

function updateActiveNav(page) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === page) {
            item.classList.add('active');
        }
    });
}

// Page Renderers
function renderHomePage() {
    return `
        <div class="container" style="max-width: 1200px;">
            <!-- Hero Section -->
            <div class="card">
                <div class="hero">
                    <div class="hero-content">
                        <h2>Chào mừng đến với Telehealth Platform</h2>
                        <p>Nền tảng khám bệnh trực tuyến hiện đại, giúp bạn dễ dàng đặt lịch khám, quản lý hồ sơ sức khỏe và theo dõi kết quả khám bệnh mọi lúc, mọi nơi.</p>
                        <a href="#create-record" class="btn btn-primary">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            Đặt khám ngay
                        </a>
                    </div>
                    <div>
                        <img src="https://images.unsplash.com/photo-1769147555720-71fc71bfc216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJ1aWxkaW5nJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzc1MDUyNzY5fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Hospital" class="hero-image">
                    </div>
                </div>
            </div>

            <!-- Features -->
            <div class="card">
                <h3 class="card-title">Chức năng khác</h3>
                <div class="features-grid">
                    ${generateFeatures()}
                </div>
            </div>

            <!-- News Section -->
            <div class="card">
                <div class="news-header">
                    <h3>Tin tức nổi bật</h3>
                    <a href="#functions" class="btn btn-secondary" style="text-decoration: none;">Xem thêm</a>
                </div>
                <div class="news-grid">
                    <div class="news-card">
                        <img src="https://images.unsplash.com/photo-1619590530358-d4f0c3f8bbec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaW5zdXJhbmNlJTIwY2FyZHxlbnwxfHx8fDE3NzUwNTI3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="News">
                        <div class="news-card-content">
                            <h4>Xác nhận bảo hiểm y tế ngay khi đặt khám trên UMC Care - Giảm thời gian chờ tại bệnh viện</h4>
                        </div>
                    </div>
                    <div class="news-card">
                        <img src="https://images.unsplash.com/photo-1651789824174-1ebaa14ad7ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcHJvbW90aW9uJTIwYmFubmVyfGVufDF8fHx8MTc3NTA1Mjc3MHww&ixlib=rb-4.1.0&q=80&w=1080" alt="News">
                        <div class="news-card-content">
                            <h4>Chương trình sinh hoạt Câu lạc bộ Người bệnh "Bảo vệ thận - Giữ gìn môi trường: chặn nguy cơ bệnh thận mạn"</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderAppointmentsPage() {
    return `
        <div class="container" style="max-width: 1200px;">
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                    <h2 class="card-title" style="margin-bottom: 0;">Phiếu khám</h2>
                    <button class="btn btn-secondary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                        </svg>
                        Lọc
                    </button>
                </div>

                <div class="search-box">
                    <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input type="text" placeholder="Số định danh...">
                </div>

                <div class="tabs">
                    <button class="tab-btn ${currentTab === 'completed' ? 'active' : ''}" data-tab="completed">Đã thanh toán</button>
                    <button class="tab-btn ${currentTab === 'confirmed' ? 'active' : ''}" data-tab="confirmed">Đã tiếp nhận</button>
                    <button class="tab-btn ${currentTab === 'examined' ? 'active' : ''}" data-tab="examined">Đã khám</button>
                    <button class="tab-btn ${currentTab === 'cancelled' ? 'active' : ''}" data-tab="cancelled">Đã hủy</button>
                </div>

                <div class="empty-state">
                    <img src="https://images.unsplash.com/photo-1651760680066-db9d32bd0357?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXB0eSUyMGNsaXBib2FyZCUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NzUwNTQ2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Empty state">
                    <h3>Không có dữ liệu!</h3>
                    <p>Các phiếu khám sẽ được hiển thị ở đây, bạn quay lại sau nhé.</p>
                </div>
            </div>
        </div>
    `;
}

function renderCreateRecordPage() {
    return `
        <div class="container" style="max-width: 900px;">
            <div class="card">
                <h2 class="card-title">Tạo hồ sơ khám bệnh</h2>

                <!-- Steps -->
                <div class="steps">
                    <div class="step ${currentStep === 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}">
                        <div class="step-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                        </div>
                        <span class="step-label">Địa chỉ</span>
                    </div>
                    ${currentStep > 1 ? '<div class="step-line completed"></div>' : '<div class="step-line"></div>'}
                    <div class="step ${currentStep === 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}">
                        <div class="step-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                        </div>
                        <span class="step-label">Thông tin liên lạc</span>
                    </div>
                    ${currentStep > 2 ? '<div class="step-line completed"></div>' : '<div class="step-line"></div>'}
                    <div class="step ${currentStep === 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}">
                        <div class="step-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                        </div>
                        <span class="step-label">Giấy tờ định danh</span>
                    </div>
                    ${currentStep > 3 ? '<div class="step-line completed"></div>' : '<div class="step-line"></div>'}
                    <div class="step ${currentStep === 4 ? 'active' : ''} ${currentStep > 4 ? 'completed' : ''}">
                        <div class="step-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <span class="step-label">Thông tin cá nhân</span>
                    </div>
                </div>

                <form id="record-form">
                    ${renderStepContent(currentStep)}

                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" id="prev-btn" ${currentStep === 1 ? 'disabled' : ''}>
                            Quay lại
                        </button>
                        <button type="submit" class="btn btn-primary" id="next-btn">
                            ${currentStep === 4 ? 'TẠO HỒ SƠ KHÁM BỆNH' : 'Tiếp tục'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function renderStepContent(step) {
    switch(step) {
        case 1:
            return `
                <div class="form-group">
                    <label class="form-label">Quốc gia <span class="required">*</span></label>
                    <select class="form-select">
                        <option>Việt Nam</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Tỉnh thành <span class="required">*</span></label>
                    <select class="form-select">
                        <option value="">Chọn tỉnh thành...</option>
                        <option value="hcm">TP. Hồ Chí Minh</option>
                        <option value="hanoi">Hà Nội</option>
                        <option value="danang">Đà Nẵng</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Quận huyện</label>
                    <select class="form-select">
                        <option value="">Chọn...</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Phường xã <span class="required">*</span></label>
                    <select class="form-select">
                        <option value="">Chọn...</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Số nhà/ Đường/ Khu phố/ Ấp <span class="required">*</span></label>
                    <input type="text" class="form-input" placeholder="Số nhà, tên đường...">
                </div>
            `;
        case 2:
            return `
                <div class="form-group">
                    <label class="form-label">Số điện thoại <span class="required">*</span></label>
                    <input type="tel" class="form-input" placeholder="Số điện thoại...">
                </div>
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-input" placeholder="Email (không bắt buộc)...">
                </div>
            `;
        case 3:
            return `
                <div class="form-group">
                    <label class="form-label">Số CCCD</label>
                    <input type="text" class="form-input" placeholder="Nhập số CCCD...">
                    <p class="form-hint">(Nếu chưa có CCCD, vui lòng nhập Số định danh cá nhân hoặc Hộ chiếu)</p>
                </div>
                <div class="form-group">
                    <label class="form-label">Số Hộ chiếu</label>
                    <input type="text" class="form-input" placeholder="Hộ chiếu...">
                </div>
                <div class="form-group">
                    <label class="form-label">Số định danh cá nhân</label>
                    <input type="text" class="form-input" placeholder="Số định danh...">
                </div>
            `;
        case 4:
            return `
                <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                    <p style="font-size: 14px; color: #374151; margin-bottom: 8px;">
                        <strong>Nhập liệu nhanh</strong> - Sử dụng CCCD để tự động điền thông tin
                    </p>
                    <button type="button" class="btn btn-primary">QUÉT MÃ</button>
                </div>
                <div class="form-group">
                    <label class="form-label">
                        Họ và chữ lót <span class="required">*</span>
                        <span style="font-weight: normal; color: #6B7280;"> (KHÔNG ghi họ hoặc chữ lót)</span>
                    </label>
                    <p class="form-hint">(theo CCCD/Hộ chiếu/Giấy khai sinh)</p>
                    <input type="text" class="form-input" placeholder="VD: Nguyễn Văn...">
                </div>
                <div class="form-group">
                    <label class="form-label">
                        Tên người bệnh <span class="required">*</span>
                        <span style="font-weight: normal; color: #6B7280;"> (KHÔNG ghi họ hoặc chữ lót)</span>
                    </label>
                    <p class="form-hint">(theo CCCD/Hộ chiếu/Giấy khai sinh)</p>
                    <input type="text" class="form-input" placeholder="VD: An...">
                </div>
                <div class="form-group">
                    <label class="form-label">Ngày sinh <span class="required">*</span></label>
                    <input type="date" class="form-input">
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                    <div class="form-group">
                        <label class="form-label">Dân tộc <span class="required">*</span></label>
                        <select class="form-select">
                            <option value="">Chọn...</option>
                            <option value="kinh">Kinh</option>
                            <option value="tay">Tày</option>
                            <option value="thai">Thái</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Giới tính <span class="required">*</span></label>
                        <div class="form-radio-group">
                            <label class="form-radio-label">
                                <input type="radio" name="gender" value="male">
                                <span>Nam</span>
                            </label>
                            <label class="form-radio-label">
                                <input type="radio" name="gender" value="female">
                                <span>Nữ</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Nghề nghiệp <span class="required">*</span></label>
                    <select class="form-select">
                        <option value="">Chọn...</option>
                        <option value="student">Sinh viên</option>
                        <option value="employee">Nhân viên</option>
                        <option value="teacher">Giáo viên</option>
                    </select>
                </div>
            `;
    }
}

function renderNotificationsPage() {
    return `
        <div class="container" style="max-width: 900px;">
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                    <h2 class="card-title" style="margin-bottom: 0;">Thông báo</h2>
                    <button class="btn btn-secondary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Đọc tất cả
                    </button>
                </div>

                <div style="display: flex; gap: 16px; margin-bottom: 32px; border-bottom: 1px solid #E5E7EB;">
                    <button class="tab-btn ${currentNotifTab === 'all' ? 'active' : ''}" data-notif-tab="all" style="border-radius: 0; border-bottom: 2px solid ${currentNotifTab === 'all' ? '#2563EB' : 'transparent'};">Tất cả</button>
                    <button class="tab-btn ${currentNotifTab === 'unread' ? 'active' : ''}" data-notif-tab="unread" style="border-radius: 0; border-bottom: 2px solid ${currentNotifTab === 'unread' ? '#2563EB' : 'transparent'};">Chưa đọc</button>
                </div>

                <div class="empty-state">
                    <div style="width: 128px; height: 128px; border-radius: 50%; background: #F3F4F6; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                    </div>
                    <h3>Không có thông báo</h3>
                    <p>Các thông báo mới của bạn sẽ được hiển thị ở đây.</p>
                </div>
            </div>
        </div>
    `;
}

function renderProfilePage() {
    return `
        <div class="container" style="max-width: 900px;">
            <div class="card">
                <div class="profile-header">
                    <div class="profile-avatar-large">${userSession.avatar}</div>
                    <h2>${userSession.fullname}</h2>
                    <p style="color: #6B7280; margin: 8px 0 0;">${userSession.username}</p>
                </div>

                <div class="profile-section">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <h3 style="margin: 0;">Thông tin cá nhân</h3>
                        <button id="profile-view-details-btn" class="btn btn-primary" style="padding: 8px 16px; font-size: 14px;">
                            Xem chi tiết
                        </button>
                    </div>
                    <div id="personal-info-details" style="padding: 16px; background: #F9FAFB; border-radius: 8px; display: none;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                            <span style="color: #6B7280;">Số điện thoại:</span>
                            <span style="font-weight: 500;">${userSession.phone}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                            <span style="color: #6B7280;">Email:</span>
                            <span style="font-weight: 500;">${userSession.email}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                            <span style="color: #6B7280;">Ngày sinh:</span>
                            <span style="font-weight: 500;">${new Date(userSession.dob).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: #6B7280;">Giới tính:</span>
                            <span style="font-weight: 500;">${userSession.gender === 'male' ? 'Nam' : userSession.gender === 'female' ? 'Nữ' : 'Khác'}</span>
                        </div>
                    </div>
                </div>

                <div class="profile-section">
                    <h3>Tài khoản</h3>
                    <div class="profile-list">
                        <a href="#" id="edit-profile-header-btn" class="profile-item">
                            <div class="profile-item-left">
                                <div class="profile-item-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                </div>
                                <span class="profile-item-label">Chỉnh sửa thông tin cá nhân</span>
                            </div>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </a>
                        <a href="#" class="profile-item">
                            <div class="profile-item-left">
                                <div class="profile-item-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                </div>
                                <span class="profile-item-label">Thay đổi mật khẩu</span>
                            </div>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </a>
                    </div>
                </div>

                <div class="profile-section">
                    <h3>Cài đặt</h3>
                    <div class="profile-list">
                        <div class="profile-item">
                            <div class="profile-item-left">
                                <div class="profile-item-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                    </svg>
                                </div>
                                <span class="profile-item-label">Nhận thông báo</span>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" checked>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="profile-section">
                    <h3>Thông tin pháp lý</h3>
                    <div class="profile-list">
                        <a href="#" class="profile-item">
                            <div class="profile-item-left">
                                <div class="profile-item-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                        <polyline points="14 2 14 8 20 8"></polyline>
                                        <line x1="16" y1="13" x2="8" y2="13"></line>
                                        <line x1="16" y1="17" x2="8" y2="17"></line>
                                        <polyline points="10 9 9 9 8 9"></polyline>
                                    </svg>
                                </div>
                                <span class="profile-item-label">Điều khoản dịch vụ</span>
                            </div>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </a>
                        <a href="#" class="profile-item">
                            <div class="profile-item-left">
                                <div class="profile-item-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                </div>
                                <span class="profile-item-label">Chính sách bảo mật</span>
                            </div>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </a>
                        <a href="#" class="profile-item">
                            <div class="profile-item-left">
                                <div class="profile-item-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                    </svg>
                                </div>
                                <span class="profile-item-label">Quy định sử dụng</span>
                            </div>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderFunctionsPage() {
    const features = [
        { label: 'Đặt khám', desc: 'Đặt lịch khám bệnh trực tuyến', color: '#DBEAFE', icon: 'calendar' },
        { label: 'Lịch sử đặt khám', desc: 'Xem lịch sử các lần khám', color: '#D1FAE5', icon: 'file-text' },
        { label: 'Thanh toán viện phí', desc: 'Thanh toán các khoản viện phí', color: '#E9D5FF', icon: 'credit-card' },
        { label: 'Hoá đơn', desc: 'Quản lý hoá đơn thanh toán', color: '#FED7AA', icon: 'receipt' },
        { label: 'Hồ sơ sức khỏe', desc: 'Theo dõi hồ sơ sức khỏe', color: '#FECACA', icon: 'heart' },
        { label: 'Kết quả cận lâm sàng', desc: 'Xem kết quả xét nghiệm', color: '#CCFBF1', icon: 'flask' },
        { label: 'Đăng ký nhập viện', desc: 'Đăng ký thủ tục nhập viện', color: '#C7D2FE', icon: 'hospital' },
        { label: 'Lắng nghe khách hàng', desc: 'Gửi phản hồi và ý kiến', color: '#FBCFE8', icon: 'headphones' },
        { label: 'Hỗ trợ', desc: 'Trung tâm hỗ trợ khách hàng', color: '#BAE6FD', icon: 'life-buoy' },
        { label: 'Theo dõi sức khỏe tại nhà', desc: 'Giám sát sức khỏe từ xa', color: '#A7F3D0', icon: 'activity' },
        { label: 'Tiêm chủng', desc: 'Đặt lịch tiêm chủng', color: '#DDD6FE', icon: 'syringe' },
        { label: 'Hỏi - đáp (Chatbot)', desc: 'Trợ lý ảo tư vấn sức khỏe', color: '#DBEAFE', icon: 'message' }
    ];

    return `
        <div class="container" style="max-width: 1200px;">
            <div class="card">
                <h2 class="card-title">Chức năng của hệ thống</h2>
                <div class="functions-grid">
                    ${features.map(f => `
                        <a href="#${f.label === 'Đặt khám' ? 'create-record' : f.label === 'Lịch sử đặt khám' ? 'appointments' : 'functions'}" class="function-card">
                            <div class="function-card-icon" style="background: ${f.color};">
                                ${getIcon(f.icon, f.color)}
                            </div>
                            <h3>${f.label}</h3>
                            <p>${f.desc}</p>
                        </a>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function generateFeatures() {
    const features = [
        { label: 'Đặt khám', icon: 'calendar', path: 'create-record' },
        { label: 'Lịch sử đặt khám', icon: 'file-text', path: 'appointments' },
        { label: 'Thanh toán viện phí', icon: 'credit-card', path: 'functions' },
        { label: 'Hoá đơn', icon: 'receipt', path: 'functions' },
        { label: 'Hồ sơ sức khỏe', icon: 'heart', path: 'functions' },
        { label: 'Kết quả cận lâm sàng', icon: 'flask', path: 'functions' },
        { label: 'Đăng ký nhập viện', icon: 'hospital', path: 'functions' },
        { label: 'Lắng nghe khách hàng', icon: 'headphones', path: 'functions' },
        { label: 'Hỗ trợ', icon: 'life-buoy', path: 'functions' },
        { label: 'Theo dõi sức khỏe tại nhà', icon: 'activity', path: 'functions' },
        { label: 'Tiêm chủng', icon: 'syringe', path: 'functions' },
        { label: 'Hỏi - đáp (Chatbot)', icon: 'message', path: 'functions' }
    ];

    return features.map(f => `
        <a href="#${f.path}" class="feature-item feature-item-link" data-feature-path="${f.path}">
            <div class="feature-icon">
                ${getIcon(f.icon, '#2563EB')}
            </div>
            <span class="feature-label">${f.label}</span>
        </a>
    `).join('');
}

function getIcon(name, color) {
    const strokeColor = color === '#2563EB' ? color : '#2563EB';
    const icons = {
        'calendar': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
        'file-text': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`,
        'credit-card': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>`,
        'receipt': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z"></path><line x1="16" y1="8" x2="8" y2="8"></line><line x1="16" y1="12" x2="8" y2="12"></line><line x1="16" y1="16" x2="8" y2="16"></line></svg>`,
        'heart': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>`,
        'flask': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2"><path d="M9 3h6v7l5 8a2 2 0 0 1-2 3H6a2 2 0 0 1-2-3l5-8V3z"></path><line x1="9" y1="3" x2="15" y2="3"></line></svg>`,
        'hospital': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2"><path d="M3 21h18"></path><path d="M5 21V7l8-4v18"></path><path d="M19 21V11l-6-4"></path><path d="M9 9v.01"></path><path d="M9 12v.01"></path><path d="M9 15v.01"></path><path d="M9 18v.01"></path></svg>`,
        'headphones': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>`,
        'life-buoy': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line><line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line></svg>`,
        'activity': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
        'syringe': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2"><path d="m18 2 4 4"></path><path d="m17 7 3-3"></path><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"></path><path d="m9 11 4 4"></path><path d="m5 19-3 3"></path><path d="m14 4 6 6"></path></svg>`,
        'message': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`
    };
    return icons[name] || '';
}

function attachEventListeners() {
    // Feature items - require login
    const featureItems = document.querySelectorAll('.feature-item-link');
    featureItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (!userSession.isLoggedIn) {
                e.preventDefault();
                openModal('login-modal');
            }
        });
    });

    // Tab buttons for appointments
    const tabBtns = document.querySelectorAll('.tab-btn[data-tab]');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentTab = btn.dataset.tab;
            handleRoute();
        });
    });

    // Notification tabs
    const notifTabs = document.querySelectorAll('[data-notif-tab]');
    notifTabs.forEach(btn => {
        btn.addEventListener('click', () => {
            currentNotifTab = btn.dataset.notifTab;
            handleRoute();
        });
    });

    // Edit profile button in profile page
    const editProfileHeaderBtn = document.getElementById('edit-profile-header-btn');
    if (editProfileHeaderBtn) {
        editProfileHeaderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            populateEditForm();
            openModal('edit-profile-modal');
        });
    }

    // Personal info view details button
    const viewDetailsBtn = document.getElementById('profile-view-details-btn');
    const personalInfoDetails = document.getElementById('personal-info-details');
    if (viewDetailsBtn && personalInfoDetails) {
        viewDetailsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (personalInfoDetails.style.display === 'none') {
                personalInfoDetails.style.display = 'block';
                viewDetailsBtn.textContent = 'Ẩn chi tiết';
            } else {
                personalInfoDetails.style.display = 'none';
                viewDetailsBtn.textContent = 'Xem chi tiết';
            }
        });
    }

    // Form navigation
    const recordForm = document.getElementById('record-form');
    if (recordForm) {
        recordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (currentStep < 4) {
                currentStep++;
                handleRoute();
            } else {
                alert('Tạo hồ sơ khám bệnh thành công!');
                currentStep = 1;
                window.location.hash = 'home';
            }
        });

        const prevBtn = document.getElementById('prev-btn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentStep > 1) {
                    currentStep--;
                    handleRoute();
                }
            });
        }
    }
}
