/**
 * Precision Lab | Shared Components Manager
 * Dynamically injects Header and Footer to reduce code duplication.
 */

function injectSharedComponents() {
    const isInsidePages = window.location.pathname.includes('/pages/');
    const rootPath = isInsidePages ? '../' : './';
    const pagesPath = isInsidePages ? '' : 'pages/';

    // --- 1. HEADER (NAVBAR) ---
    const headerPlaceholder = document.getElementById('navbar-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = `
        <header class="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
            <div class="flex justify-between items-center px-8 h-12 w-full max-w-7xl mx-auto">
                <a href="${rootPath}index.html" class="text-xl font-black tracking-tighter text-blue-800 dark:text-blue-200 font-headline uppercase shrink-0">
                    PRECISION LAB
                </a>

                <nav class="hidden md:flex gap-8 items-center">
                    <a data-i18n="nav_home" class="font-headline text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors" href="${rootPath}index.html">Home</a>
                    <a data-i18n="nav_products" class="font-headline text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors" href="${rootPath}${pagesPath}products.html">Products</a>
                    <a data-i18n="nav_compare" class="font-headline text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors" href="${rootPath}${pagesPath}compare.html">Compare</a>
                    <a data-i18n="nav_theory" class="font-headline text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors" href="${rootPath}${pagesPath}theory.html">Theory</a>
                </nav>

                <div class="flex items-center gap-2">
                    <div class="relative hidden lg:block mr-2">
                        <input class="search-input bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-xs px-4 py-1.5 w-48 outline-none transition-all focus:ring-2 focus:ring-primary/20" data-i18n="search_placeholder" data-i18n-attr="placeholder" placeholder="Search..." type="text" />
                        <span class="material-symbols-outlined absolute right-2 top-1.5 text-slate-400 scale-75">search</span>
                    </div>

                    <button id="lang-toggle" class="flex items-center gap-1 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all group">
                        <span class="material-symbols-outlined text-sm text-slate-500">language</span>
                        <span id="lang-toggle-text" class="text-[10px] font-black text-slate-700 dark:text-slate-300">VI</span>
                    </button>

                    <button id="theme-toggle" class="material-symbols-outlined text-slate-600 dark:text-slate-400 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all">dark_mode</button>
                    
                    <div class="relative">
                        <button id="account-trigger" class="material-symbols-outlined text-slate-600 dark:text-slate-400 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all">account_circle</button>
                        <div id="user-menu" class="hidden absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-900 shadow-2xl z-50 border border-slate-100 dark:border-slate-800 rounded-xl animate-in fade-in zoom-in duration-200">
                            <div id="user-menu-content" class="py-2"></div>
                        </div>
                    </div>

                    <button id="menu-trigger" class="material-symbols-outlined text-slate-600 dark:text-slate-400 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all">menu</button>
                </div>
            </div>

            <!-- Mega Menu -->
            <div id="mega-menu" class="hidden absolute top-full right-8 w-[520px] bg-white dark:bg-slate-900 shadow-2xl z-40 border border-slate-100 dark:border-slate-800 rounded-xl animate-in fade-in slide-in-from-top-1 duration-200">
                <div class="py-5 px-6">
                    <div class="pb-4 mb-4 border-b border-slate-50 dark:border-slate-800/50 flex justify-between items-center">
                        <h3 data-i18n="cat_title" class="text-[10px] font-black uppercase tracking-[0.2em] text-primary dark:text-blue-400">Hardware Categories</h3>
                        <span data-i18n="cat_count" class="text-[9px] font-bold text-slate-400 uppercase">Interactive Directory</span>
                    </div>
                    <ul class="grid grid-cols-2 gap-x-8 gap-y-1">
                        <li><a href="${rootPath}${pagesPath}products.html?cat=processors" class="flex items-center gap-3 p-2 rounded-lg group hover:bg-primary/5 transition-all">
                            <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform"><span class="material-symbols-outlined text-xl">developer_board</span></div>
                            <div class="flex flex-col"><span class="text-[11px] font-bold text-slate-700 dark:text-slate-200 group-hover:text-primary">Processors</span><span class="text-[9px] text-slate-400 font-medium">Intel & AMD CPUs</span></div>
                        </a></li>
                        <li><a href="${rootPath}${pagesPath}products.html?cat=graphics" class="flex items-center gap-3 p-2 rounded-lg group hover:bg-blue-500/5 transition-all">
                            <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform"><span class="material-symbols-outlined text-xl">videocard</span></div>
                            <div class="flex flex-col"><span class="text-[11px] font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600">Graphics Cards</span><span class="text-[9px] text-slate-400 font-medium">NVIDIA & Radeon</span></div>
                        </a></li>
                        <li><a href="${rootPath}${pagesPath}products.html?cat=motherboards" class="flex items-center gap-3 p-2 rounded-lg group hover:bg-purple-500/5 transition-all">
                            <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-105 transition-transform"><span class="material-symbols-outlined text-xl">circuit</span></div>
                            <div class="flex flex-col"><span class="text-[11px] font-bold text-slate-700 dark:text-slate-200 group-hover:text-purple-600">Motherboards</span><span class="text-[9px] text-slate-400 font-medium">Z890 & X870E</span></div>
                        </a></li>
                        <li><a href="${rootPath}${pagesPath}products.html?cat=memory" class="flex items-center gap-3 p-2 rounded-lg group hover:bg-emerald-500/5 transition-all">
                            <div class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform"><span class="material-symbols-outlined text-xl">memory</span></div>
                            <div class="flex flex-col"><span class="text-[11px] font-bold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600">Memory</span><span class="text-[9px] text-slate-400 font-medium">DDR5 & DDR4 Kits</span></div>
                        </a></li>
                        <li><a href="${rootPath}${pagesPath}products.html?cat=storage" class="flex items-center gap-3 p-2 rounded-lg group hover:bg-orange-500/5 transition-all">
                            <div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-105 transition-transform"><span class="material-symbols-outlined text-xl">database</span></div>
                            <div class="flex flex-col"><span class="text-[11px] font-bold text-slate-700 dark:text-slate-200 group-hover:text-orange-600">Storage</span><span class="text-[9px] text-slate-400 font-medium">NVMe SSDs</span></div>
                        </a></li>
                        <li><a href="${rootPath}${pagesPath}products.html?cat=psu" class="flex items-center gap-3 p-2 rounded-lg group hover:bg-red-500/5 transition-all">
                            <div class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 group-hover:scale-105 transition-transform"><span class="material-symbols-outlined text-xl">power</span></div>
                            <div class="flex flex-col"><span class="text-[11px] font-bold text-slate-700 dark:text-slate-200 group-hover:text-red-600">Power Supply</span><span class="text-[9px] text-slate-400 font-medium">80+ Gold/Platinum</span></div>
                        </a></li>
                        <li><a href="${rootPath}${pagesPath}products.html?cat=cases" class="flex items-center gap-3 p-2 rounded-lg group hover:bg-slate-500/5 transition-all">
                            <div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:scale-105 transition-transform"><span class="material-symbols-outlined text-xl">dock</span></div>
                            <div class="flex flex-col"><span class="text-[11px] font-bold text-slate-700 dark:text-slate-200 group-hover:text-slate-600">Cases</span><span class="text-[9px] text-slate-400 font-medium">Mid/Full Towers</span></div>
                        </a></li>
                        <li><a href="${rootPath}${pagesPath}products.html?cat=cooling" class="flex items-center gap-3 p-2 rounded-lg group hover:bg-cyan-500/5 transition-all">
                            <div class="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-600 group-hover:scale-105 transition-transform"><span class="material-symbols-outlined text-xl">ac_unit</span></div>
                            <div class="flex flex-col"><span class="text-[11px] font-bold text-slate-700 dark:text-slate-200 group-hover:text-cyan-600">Cooling</span><span class="text-[9px] text-slate-400 font-medium">AIO & Air Coolers</span></div>
                        </a></li>
                    </ul>
                    <div class="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800/50">
                        <a href="${rootPath}${pagesPath}products.html" class="flex items-center justify-center gap-2 group bg-slate-50 dark:bg-slate-800/50 py-2.5 rounded-lg hover:bg-primary hover:text-white transition-all">
                            <span class="text-[10px] font-black uppercase tracking-widest">Explore Full Directory</span>
                            <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </a>
                    </div>
                </div>
            </div>
        </header>
        `;
    }

    // --- 2. FOOTER ---
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
        <footer class="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
            <div class="max-w-7xl mx-auto px-8">
                <!-- 4 Columns Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    
                    <!-- Column 1: Intro -->
                    <div class="space-y-6">
                        <div class="text-2xl font-black tracking-tighter text-blue-800 dark:text-blue-200 font-headline uppercase">
                            PRECISION LAB
                        </div>
                        <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                            Precision Lab – So sánh chính xác từng linh kiện. Nền tảng phân tích phần cứng hàng đầu cho cộng đồng đam mê công nghệ.
                        </p>
                        <div class="flex gap-4">
                            <a href="#" class="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all shadow-sm">
                                <span class="material-symbols-outlined text-xl">facebook</span>
                            </a>
                            <a href="#" class="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all shadow-sm">
                                <span class="material-symbols-outlined text-xl">play_circle</span>
                            </a>
                            <a href="#" class="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all shadow-sm">
                                <span class="material-symbols-outlined text-xl">groups</span>
                            </a>
                        </div>
                    </div>

                    <!-- Column 2: Quick Links -->
                    <div>
                        <h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">Quick Links</h4>
                        <ul class="space-y-4">
                            <li><a href="#" class="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium">Về chúng tôi</a></li>
                            <li><a href="#" class="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium">Chính sách bảo mật</a></li>
                            <li><a href="#" class="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium">Điều khoản sử dụng</a></li>
                            <li><a href="#" class="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium">Liên hệ</a></li>
                        </ul>
                    </div>

                    <!-- Column 3: Categories -->
                    <div>
                        <h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">Categories</h4>
                        <div class="grid grid-cols-2 gap-4">
                            <ul class="space-y-4">
                                <li><a href="${rootPath}${pagesPath}products.html?cat=processors" class="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium">CPU</a></li>
                                <li><a href="${rootPath}${pagesPath}products.html?cat=graphics" class="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium">GPU</a></li>
                                <li><a href="${rootPath}${pagesPath}products.html?cat=motherboards" class="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium">Mainboard</a></li>
                                <li><a href="${rootPath}${pagesPath}products.html?cat=memory" class="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium">RAM</a></li>
                            </ul>
                            <ul class="space-y-4">
                                <li><a href="${rootPath}${pagesPath}products.html?cat=storage" class="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium">SSD</a></li>
                                <li><a href="${rootPath}${pagesPath}products.html?cat=psu" class="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium">PSU</a></li>
                                <li><a href="${rootPath}${pagesPath}products.html?cat=cooling" class="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium">Cooler</a></li>
                                <li><a href="#" class="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors font-medium">Monitor</a></li>
                            </ul>
                        </div>
                    </div>

                    <!-- Column 4: Newsletter -->
                    <div class="space-y-6">
                        <h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Newsletter</h4>
                        <p class="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                            Đăng ký nhận bản tin về hiệu năng và bài đánh giá hot nhất.
                        </p>
                        <form class="flex gap-2">
                            <input type="email" placeholder="Email Address" class="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 text-xs focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                            <button type="button" class="bg-primary text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg active:scale-95">
                                ĐĂNG KÝ
                            </button>
                        </form>
                    </div>
                </div>

                <!-- Bottom Bar -->
                <div class="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div class="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        © 2024 PcWeb - Precision Lab. All rights reserved.
                    </div>
                    <div class="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Thực hiện bởi: <span class="text-primary font-bold">Đại Đoàn</span>
                    </div>
                </div>
            </div>
        </footer>
        `;
    }

    // Now that HTML is injected, we need to re-run i18n to translate the new elements
    if (typeof updateContent === 'function') {
        updateContent();
    }
}
