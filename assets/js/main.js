document.addEventListener('DOMContentLoaded', () => {
    console.log('Precision Lab | PcWeb Initialized');

    // --- 0. INJECT SHARED COMPONENTS ---
    if (typeof injectSharedComponents === 'function') {
        injectSharedComponents();
    }

    // --- 1. CORE UI ELEMENTS (Defined after injection) ---
    const themeToggles = document.querySelectorAll('#theme-toggle, .theme-toggle-btn');
    const htmlElement = document.documentElement;
    const megaMenu = document.getElementById('mega-menu');
    const menuTrigger = document.getElementById('menu-trigger');
    const accountTrigger = document.getElementById('account-trigger');
    const userMenu = document.getElementById('user-menu');
    const userMenuContent = document.getElementById('user-menu-content');
    const searchInput = document.querySelector('.search-input');

    // Path Context (Handle root vs /pages/ directory)
    const isInsidePages = window.location.pathname.includes('/pages/');
    const prefix = isInsidePages ? '' : 'pages/';

    // --- 2. THEME LOGIC ---
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') htmlElement.classList.add('dark');

    themeToggles.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                htmlElement.classList.toggle('dark');
                localStorage.setItem('theme', htmlElement.classList.contains('dark') ? 'dark' : 'light');
            });
        }
    });

    // --- 3. AUTH & USER MENU LOGIC ---
    function updateAccountMenu() {
        if (typeof getSession !== 'function' || !userMenuContent) return;
        const session = getSession();

        if (session) {
            const safeUsername = sanitizeHTML(session.username || 'Admin');
            userMenuContent.innerHTML = `
                <div class="px-4 py-3 border-b border-slate-50 dark:border-slate-800/50 mb-2">
                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">${t('signed_in_as')}</p>
                    <p class="text-xs font-bold text-primary dark:text-blue-400 truncate">${safeUsername}</p>
                </div>
                ${session.role === 'admin' ? `
                    <a href="${prefix}admin-dashboard.html" class="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-colors">
                        <span class="material-symbols-outlined text-lg">dashboard</span> ${t('menu_dashboard')}
                    </a>
                ` : ''}
                <button onclick="logout()" class="w-full text-left flex items-center gap-3 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <span class="material-symbols-outlined text-lg">logout</span> ${t('menu_logout')}
                </button>
            `;
        } else {
            userMenuContent.innerHTML = `
                <a href="${prefix}login.html" class="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-colors">
                    <span class="material-symbols-outlined text-lg">login</span> ${t('menu_login')}
                </a>
                <a href="${prefix}registration.html" class="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-colors">
                    <span class="material-symbols-outlined text-lg">person_add</span> ${t('menu_register')}
                </a>
            `;
        }
    }

    // Toggle Handlers
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            if (typeof toggleLanguage === 'function') toggleLanguage();
        });
    }

    if (menuTrigger && megaMenu) {
        menuTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            megaMenu.classList.toggle('hidden');
            if (userMenu) userMenu.classList.add('hidden');
        });
    }

    if (accountTrigger && userMenu) {
        accountTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            updateAccountMenu();
            userMenu.classList.toggle('hidden');
            if (megaMenu) megaMenu.classList.add('hidden');
        });
    }

    // Click Outside to Close All
    document.addEventListener('click', (e) => {
        if (megaMenu && !megaMenu.contains(e.target) && !menuTrigger.contains(e.target)) {
            megaMenu.classList.add('hidden');
        }
        if (userMenu && !userMenu.contains(e.target) && !accountTrigger.contains(e.target)) {
            userMenu.classList.add('hidden');
        }
    });

    // --- 4. PRODUCT FILTERING & SEARCH ---
    const grid = document.getElementById('product-grid');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const priceRange = document.getElementById('price-range');
    const priceDisplay = document.getElementById('price-display');

    // MỚI: Lấy data từ localStorage do Admin thay đổi, fallback về PRODUCTS gốc
    let displayProducts = [];
    if (typeof PRODUCTS !== 'undefined') {
        const savedProducts = localStorage.getItem('pcweb_products');
        displayProducts = savedProducts ? JSON.parse(savedProducts) : [...PRODUCTS];
    }

    if (grid && displayProducts.length > 0) {
        grid.innerHTML = displayProducts.map(p => {
            const displayName = (currentLang === LANGUAGES.VI && p.name_vi) ? p.name_vi : p.name;
            const displayDesc = (currentLang === LANGUAGES.VI && p.desc_vi) ? p.desc_vi : p.desc;

            return `
                <div class="product-card group bg-white dark:bg-slate-900 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-100 dark:border-slate-800" data-category="${p.category}" data-price="${p.msrp}">
                    <div class="relative aspect-[4/3] overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                        <img alt="${displayName}" onerror="this.src='https://via.placeholder.com/300x200?text=NA'" class="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110" src="${p.image}"/>
                    </div>
                    <div class="p-6 flex-grow flex flex-col">
                        <div class="flex justify-between items-start mb-4">
                            <span class="text-[10px] font-black tracking-widest text-slate-400 uppercase">${p.brand || 'UNKNOWN'}</span>
                            <span class="material-symbols-outlined text-primary text-lg">memory</span>
                        </div>
                        <h3 class="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">${displayName}</h3>
                        <p class="text-sm text-slate-500 dark:text-slate-400 font-body mb-6 flex-grow">${displayDesc || 'No precise details provided.'}</p>
                        <div class="border-t border-slate-100 dark:border-slate-800 pt-6 mt-auto flex justify-between items-center">
                            <span class="text-lg font-black text-primary">$${p.msrp || 0}</span>
                            <a href="${prefix}product-detail.html?id=${p.id}" class="px-6 py-2 bg-slate-900 dark:bg-primary text-white text-[10px] font-black uppercase tracking-widest transition-all hover:opacity-80 active:scale-95 text-center">
                                ${t('btn_detail')}
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // URL Parameter Filtering
        const categoryParam = new URLSearchParams(window.location.search).get('cat');
        if (categoryParam) {
            const target = Array.from(categoryFilters).find(cb => cb.value.toLowerCase() === categoryParam.toLowerCase());
            if (target) { target.checked = true; updateFilters(); }
        }
    }

    function updateFilters() {
        const productCards = document.querySelectorAll('.product-card');
        const checkedCategories = Array.from(categoryFilters).filter(cb => cb.checked).map(cb => cb.value);
        const maxPrice = priceRange ? parseInt(priceRange.value) : Infinity;
        if (priceDisplay) priceDisplay.textContent = `Max: $${maxPrice}`;

        productCards.forEach(card => {
            const matchesCategory = checkedCategories.length === 0 || checkedCategories.includes(card.getAttribute('data-category'));
            const matchesPrice = (parseInt(card.getAttribute('data-price')) || 0) <= maxPrice;
            card.style.display = (matchesCategory && matchesPrice) ? 'flex' : 'none';
        });
    }

    if (categoryFilters.length) categoryFilters.forEach(f => f.addEventListener('change', updateFilters));
    if (priceRange) priceRange.addEventListener('input', updateFilters);
    updateFilters();

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            document.querySelectorAll('.product-card').forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(term) ? 'flex' : 'none';
            });
        });
    }

    // --- 5. INITIALIZE SWIPER (Hero Banner) ---
    if (typeof Swiper !== 'undefined' && document.querySelector('.hero-swiper')) {
        new Swiper('.hero-swiper', {
            loop: true,
            speed: 800,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'slide',
        });
    }
});
