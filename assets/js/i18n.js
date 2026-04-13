/**
 * Precision Lab | Internationalization (i18n) Engine
 * Handles English and Vietnamese language switching.
 */

const LANGUAGES = {
    EN: 'en',
    VI: 'vi'
};

const TRANSLATIONS = {
    // --- Navigation & Headers ---
    nav_home: { en: "Home", vi: "Trang chủ" },
    nav_products: { en: "Products", vi: "Sản phẩm" },
    nav_compare: { en: "Compare", vi: "So sánh" },
    nav_theory: { en: "Theory", vi: "Lý thuyết" },
    nav_admin: { en: "Admin", vi: "Quản trị" },
    search_placeholder: { en: "Search components...", vi: "Tìm kiếm linh kiện..." },
    cat_title: { en: "Hardware Categories", vi: "Danh mục phần cứng" },
    cat_count: { en: "{n} CATEGORIES", vi: "{n} DANH MỤC" },

    // --- Product Grid & Filters ---
    filter_title: { en: "Category", vi: "Danh mục" },
    filter_price: { en: "Price Range", vi: "Khoảng giá" },
    filter_max: { en: "Max: ${n}", vi: "Tối đa: {n}$" },
    btn_detail: { en: "Detail", vi: "Chi tiết" },
    hardware_directory: { en: "Hardware Directory", vi: "Danh mục Phần cứng" },
    hardware_desc: { en: "Browse and filter our database of high-performance components.", vi: "Duyệt và lọc cơ sở dữ liệu linh kiện hiệu suất cao của chúng tôi." },

    // --- Product Detail ---
    back_to_products: { en: "BACK TO PRODUCTS", vi: "QUAY LẠI TRANG SẢN PHẨM" },
    msrp_label: { en: "Manufacturer MSRP", vi: "Giá đề xuất của NSX" },
    btn_compare: { en: "ADD TO COMPARE", vi: "THÊM VÀO SO SÁNH" },
    tech_data_sheet: { en: "TECHNICAL DATA SHEET", vi: "BẢNG THÔNG SỐ KỸ THUẬT" },
    spec_arch: { en: "Architecture", vi: "Kiến trúc" },
    spec_power: { en: "Compute Power", vi: "Sức mạnh tính toán" },
    spec_mem: { en: "Memory Size", vi: "Dung lượng bộ nhớ" },
    spec_tdp: { en: "Power Draw", vi: "Tiêu thụ điện năng" },

    // --- Auth & Account ---
    signed_in_as: { en: "Signed in as", vi: "Đã đăng nhập với" },
    menu_dashboard: { en: "Dashboard", vi: "Bảng điều khiển" },
    menu_logout: { en: "Logout", vi: "Đăng xuất" },
    menu_login: { en: "Login", vi: "Đăng nhập" },
    menu_register: { en: "Register", vi: "Đăng ký" },
    login_title: { en: "Login to Precision Lab", vi: "Đăng nhập vào Precision Lab" },
    login_subtitle: { en: "Access your hardware evaluation dashboard and saved comparisons.", vi: "Truy cập bảng điều khiển phần cứng và các so sánh đã lưu của bạn." },
    btn_login: { en: "Login", vi: "Đăng nhập" },
    no_account: { en: "No account?", vi: "Chưa có tài khoản?" },
    register_title: { en: "Create your Account", vi: "Tạo tài khoản mới" },
    reg_subtitle: { en: "Join the precision hardware community.", vi: "Tham gia cộng đồng đánh giá phần cứng chính xác." },
    btn_register: { en: "Register Now", vi: "Đăng ký ngay" },
    has_account: { en: "Already have an account?", vi: "Đã có tài khoản?" },
    email_label: { en: "Email Address", vi: "Địa chỉ Email" },
    password_label: { en: "Password", vi: "Mật khẩu" },
    username_label: { en: "User Name", vi: "Tên người dùng" },

    // --- Footer & Links ---
    privacy: { en: "Privacy Policy", vi: "Chính sách bảo mật" },
    terms: { en: "Terms", vi: "Điều khoản" },
    methodology: { en: "Methodology", vi: "Phương pháp" },
    contact: { en: "Contact", vi: "Liên hệ" },
    footer_tagline: { en: "LABORATORY ACCREDITED DATA", vi: "DỮ LIỆU ĐƯỢC CHỨNG NHẬN PHÒNG THÍ NGHIỆM" },
    footer_rights: { en: "© 2026 Precision Lab. ALL RIGHTS RESERVED.", vi: "© 2026 Precision Lab. BẢO LƯU MỌI QUYỀN." },

    // --- Compare Page ---
    compare_title: { en: "GPU Comparison Engine", vi: "Hệ thống So sánh GPU" },
    compare_desc: { en: "Direct technical analysis between industry-leading silicon architectures. Data calibrated for high-performance computing.", vi: "Phân tích kỹ thuật trực tiếp giữa các kiến trúc vi mạch hàng đầu trong ngành. Dữ liệu được hiệu chuẩn cho tính toán hiệu suất cao." },
    primary_target: { en: "Primary Target", vi: "Mục tiêu chính" },
    comparison_unit: { en: "Comparison Unit", vi: "Đơn vị so sánh" },
    tech_specs: { en: "Technical Specifications", vi: "Thông số kỹ thuật" },
    baseline: { en: "Baseline", vi: "Cơ sở" },
    target: { en: "Target", vi: "Mục tiêu" },
    compute_cores: { en: "Compute Cores", vi: "Lõi tính toán" },
    memory_config: { en: "Memory Config", vi: "Cấu hình bộ nhớ" },
    thermal_power: { en: "Thermal Power", vi: "Công suất nhiệt" },
    launch_msrp: { en: "Launch MSRP", vi: "Giá khởi điểm" },
    cores: { en: "Cores", vi: "Lõi" },
    memory: { en: "Memory", vi: "Bộ nhớ" },
    tdp: { en: "TDP", vi: "TDP" },
    price: { en: "Price", vi: "Giá" },

    // --- Theory Page ---
    theory_title: { en: "Hardware Theory & Methodology", vi: "Lý thuyết & Phương pháp Phần cứng" },
    theory_desc: { en: "Documentation on how we test, calibrate, and evaluate the latest PC components. Based on industry standards and peer-reviewed benchmarks.", vi: "Tài liệu về cách chúng tôi kiểm tra, hiệu chuẩn và đánh giá các linh kiện PC mới nhất. Dựa trên các tiêu chuẩn ngành và các bài kiểm tra được đánh giá bởi giới chuyên môn." },
    theory_kb: { en: "Knowledge Base", vi: "Cơ sở Kiến thức" },
    theory_gpu: { en: "01. GPU Benchmarking Protocol", vi: "01. Giao thức Đánh giá GPU" },
    theory_cpu: { en: "02. CPU Thermal Management", vi: "02. Quản lý Nhiệt CPU" },
    ref_materials: { en: "Reference Materials", vi: "Tài liệu Tham khảo" },
    latest_updates: { en: "Latest Updates", vi: "Cập nhật mới nhất" },

    // --- 404 Page ---
    error_404_title: { en: "ERROR 404: Component Not Found", vi: "LỖI 404: Không tìm thấy linh kiện" },
    error_404_desc: { en: "It seems the path you are looking for has been decommissioned or never existed in our database.", vi: "Có vẻ như đường dẫn bạn đang tìm kiếm đã bị gỡ bỏ hoặc chưa từng tồn tại trong hệ thống." },
    btn_back_home: { en: "Back to Homepage", vi: "Về trang chủ" },

    // --- Auth Messages (From auth.js) ---
    msg_email_taken: { en: "This email is already taken.", vi: "Email này đã được sử dụng." },
    msg_reg_success: { en: "Registration successful!", vi: "Đăng ký thành công!" },
    msg_login_fail: { en: "Invalid email or password.", vi: "Email hoặc mật khẩu không chính xác." }
};

let currentLang = localStorage.getItem('pcweb_lang') || LANGUAGES.VI;

/**
 * Translate a key into the current language
 */
function t(key, params = {}) {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    let text = entry[currentLang] || entry[LANGUAGES.EN];
    
    // Replace placeholders like {n}
    Object.keys(params).forEach(p => {
        text = text.replace(`{${p}}`, params[p]);
    });
    return text;
}

/**
 * Apply translations to all elements with data-i18n attribute
 */
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const attr = el.getAttribute('data-i18n-attr'); // Optional: translate attributes like placeholder
        
        if (attr) {
            el.setAttribute(attr, t(key));
        } else {
            el.textContent = t(key);
        }
    });

    // Update Language Toggle Button Text
    const langBtn = document.getElementById('lang-toggle-text');
    if (langBtn) {
        langBtn.textContent = currentLang.toUpperCase();
    }
}

/**
 * Toggle between EN and VI
 */
function toggleLanguage() {
    currentLang = currentLang === LANGUAGES.EN ? LANGUAGES.VI : LANGUAGES.EN;
    localStorage.setItem('pcweb_lang', currentLang);
    
    // Re-render components that are dynamically generated
    if (typeof updateAccountMenu === 'function') updateAccountMenu();
    if (typeof updateFilters === 'function') updateFilters();
    if (typeof renderComparison === 'function') renderComparison();
    
    // Some pages might need specific re-initialization
    // For now, simple reload or selective re-apply:
    applyTranslations();
    
    // Force reload for some deep dynamic structures if needed
    // window.location.reload(); 
}

// Initial application
document.addEventListener('DOMContentLoaded', applyTranslations);
