/**
 * Precision Lab | Comparison Engine
 * Handles dynamic UI updates and hardware data comparison (1-4 devices)
 */

let comparedIds = JSON.parse(localStorage.getItem('pcweb_compare_ids') || '["rtx-5090", "rx-7900-xtx"]'); // Load from storage or defaults

document.addEventListener('DOMContentLoaded', () => {
    const comparisonGrid = document.getElementById('comparison-grid');
    if (comparisonGrid) {
        initDynamicComparison();
    }

    // Still support Side-by-Side page if it exists
    if (document.getElementById('sbs-select-1')) {
        initSideBySidePage();
    }
});

/**
 * Initializes the dynamic comparison engine
 */
function initDynamicComparison() {
    renderComparison();
}

/**
 * Main render function for the comparison page
 */
function renderComparison() {
    renderComparisonGrid();
    renderComparisonTable();
    
    // Trigger i18n update if available
    if (window.i18n && typeof window.i18n.updateUI === 'function') {
        window.i18n.updateUI();
    }
}

/**
 * Renders the top product selection cards
 */
function renderComparisonGrid() {
    const grid = document.getElementById('comparison-grid');
    if (!grid) return;

    grid.innerHTML = '';

    comparedIds.forEach((id, index) => {
        const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
        const isBaseline = index === 0;
        const displayName = (typeof currentLang !== 'undefined' && currentLang === 'vi' && product.name_vi) ? product.name_vi : product.name;

        const card = document.createElement('div');
        card.className = "relative group rounded-xl bg-white dark:bg-slate-900 p-8 border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center shadow-sm transition-all hover:shadow-md";
        
        card.innerHTML = `
            ${!isBaseline ? `
                <button onclick="removeDevice(${index})" class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-all z-10">
                    <span class="material-symbols-outlined text-sm">close</span>
                </button>
            ` : ''}
            <div class="w-full mb-6">
                <label class="block text-[10px] font-black uppercase tracking-widest ${isBaseline ? 'text-primary' : 'text-tertiary'} mb-2">
                    ${isBaseline ? (typeof currentLang !== 'undefined' && currentLang === 'vi' ? 'Mục tiêu chính' : 'Primary Target') : (typeof currentLang !== 'undefined' && currentLang === 'vi' ? 'Đơn vị so sánh' : 'Comparison Unit')}
                </label>
                <select onchange="updateDeviceId(${index}, this.value)" class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm font-bold px-4 py-3 focus:ring-2 ${isBaseline ? 'focus:ring-primary/20' : 'focus:ring-tertiary/20'} transition-all cursor-pointer">
                    ${PRODUCTS.map(p => `<option value="${p.id}" ${p.id === id ? 'selected' : ''}>${(typeof currentLang !== 'undefined' && currentLang === 'vi' && p.name_vi) ? p.name_vi : p.name}</option>`).join('')}
                </select>
            </div>
            <img class="w-48 h-48 object-contain mb-6 transition-transform group-hover:scale-105" src="${product.image}">
            <h2 class="text-2xl font-headline font-bold mb-2 h-16 flex items-center justify-center">${displayName}</h2>
            <p class="text-sm text-slate-400 font-medium uppercase tracking-tight">${product.architecture} • ${product.memory}${product.memory_type.replace('GDDR', 'G')}</p>
        `;
        grid.appendChild(card);
    });

    // Add "+" button if less than 4 items
    if (comparedIds.length < 4) {
        const addBtn = document.createElement('button');
        addBtn.onclick = addDevice;
        addBtn.className = "group border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center gap-4 hover:border-primary hover:bg-primary/5 transition-all min-h-[400px]";
        addBtn.innerHTML = `
            <div class="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all scale-110">
                <span class="material-symbols-outlined text-3xl">add</span>
            </div>
            <span class="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary transition-all">
                ${typeof currentLang !== 'undefined' && currentLang === 'vi' ? 'Thêm thiết bị' : 'Add Device'}
            </span>
        `;
        grid.appendChild(addBtn);
    }
}

/**
 * Renders the comparison spec table rows
 */
function renderComparisonTable() {
    const grid = document.getElementById('specs-grid');
    if (!grid) return;

    const baseline = PRODUCTS.find(p => p.id === comparedIds[0]);
    const others = comparedIds.map(id => PRODUCTS.find(p => p.id === id));

    // Define table structure
    const metrics = [
        { label: 'Compute Cores', label_vi: 'Lõi tính toán', key: 'cores', suffix: (p) => p.core_type, compare: true, higherIsBetter: true },
        { label: 'Memory Config', label_vi: 'Cấu hình bộ nhớ', key: 'memory', suffix: (p) => `GB ${p.memory_type}`, compare: true, higherIsBetter: true },
        { label: 'Thermal Power', label_vi: 'Công suất nhiệt', key: 'tdp', suffix: () => 'W', compare: true, higherIsBetter: false },
        { label: 'Launch MSRP', label_vi: 'Giá khởi điểm', key: 'msrp', prefix: () => '$', compare: true, higherIsBetter: false }
    ];

    // Build Grid CSS
    grid.className = `grid grid-cols-1 md:grid-cols-[200px_repeat(${comparedIds.length},1fr)] border-collapse`;
    grid.innerHTML = '';

    // Render Side Labels (Desktop)
    const labelCol = document.createElement('div');
    labelCol.className = "bg-slate-50 dark:bg-slate-950 p-6 hidden md:flex flex-col gap-16 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-100 dark:border-slate-800";
    metrics.forEach(m => {
        const label = (typeof currentLang !== 'undefined' && currentLang === 'vi' && m.label_vi) ? m.label_vi : m.label;
        labelCol.innerHTML += `<div class="h-12 flex items-center">${label}</div>`;
    });
    grid.appendChild(labelCol);

    // Render Product Columns
    others.forEach((p, index) => {
        const isBaseline = index === 0;
        const col = document.createElement('div');
        col.className = `p-6 ${index < others.length - 1 ? 'md:border-r' : ''} border-slate-100 dark:border-slate-800 space-y-16 animate-in fade-in slide-in-from-bottom-2 duration-300`;
        
        metrics.forEach(m => {
            const val = p[m.key];
            const displayVal = `${m.prefix ? m.prefix(p) : ''}${val.toLocaleString()}${m.suffix ? ' ' + m.suffix(p) : ''}`;
            const label = (typeof currentLang !== 'undefined' && currentLang === 'vi' && m.label_vi) ? m.label_vi : m.label;

            let deltaHtml = '';
            if (!isBaseline && m.compare) {
                const diff = val - baseline[m.key];
                const percent = ((diff / baseline[m.key]) * 100).toFixed(1);
                
                let colorClass = "text-slate-400";
                let icon = "remove";
                let sign = "";

                if (diff > 0) {
                    colorClass = m.higherIsBetter ? "text-emerald-500" : "text-rose-500";
                    icon = m.higherIsBetter ? "trending_up" : "trending_down";
                    sign = "+";
                } else if (diff < 0) {
                    colorClass = m.higherIsBetter ? "text-rose-500" : "text-emerald-500";
                    icon = m.higherIsBetter ? "trending_down" : "trending_up";
                }
                deltaHtml = `<div class="flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter ${colorClass}"><span class="material-symbols-outlined text-xs">${icon}</span> ${sign}${percent}%</div>`;
            }

            col.innerHTML += `
                <div class="h-12 flex flex-col justify-center">
                    <span class="md:hidden text-[10px] font-bold uppercase text-slate-400 mb-1">${label}</span>
                    <div class="flex items-baseline gap-2">
                        <div class="text-base font-bold text-slate-900 dark:text-white">${displayVal}</div>
                        ${deltaHtml}
                    </div>
                </div>
            `;
        });
        grid.appendChild(col);
    });
}

/**
 * Global helpers for the dynamic system
 */
window.updateDeviceId = (index, newId) => {
    comparedIds[index] = newId;
    localStorage.setItem('pcweb_compare_ids', JSON.stringify(comparedIds));
    renderComparison();
};

window.addDevice = () => {
    if (comparedIds.length < 4) {
        // Add a default different from the baseline
        const nextId = PRODUCTS.find(p => !comparedIds.includes(p.id))?.id || PRODUCTS[comparedIds.length].id;
        comparedIds.push(nextId);
        localStorage.setItem('pcweb_compare_ids', JSON.stringify(comparedIds));
        renderComparison();
    }
};

window.removeDevice = (index) => {
    if (comparedIds.length > 1) {
        comparedIds.splice(index, 1);
        localStorage.setItem('pcweb_compare_ids', JSON.stringify(comparedIds));
        renderComparison();
    }
};

/**
 * Initializes the Side-by-Side page (3-way comparison)
 */
function initSideBySidePage() {
    const s1 = document.getElementById('sbs-select-1');
    const s2 = document.getElementById('sbs-select-2');
    const s3 = document.getElementById('sbs-select-3');

    populateDropdown(s1, "rtx-4090");
    populateDropdown(s2, "rx-7900-xtx");
    populateDropdown(s3, "rtx-4080");

    [s1, s2, s3].forEach(s => {
        if (s) s.addEventListener('change', () => updateSideBySideUI());
    });

    updateSideBySideUI();
}

/**
 * Updates the 3-column table on side-by-side.html
 */
function updateSideBySideUI() {
    const ids = [
        document.getElementById('sbs-select-1').value,
        document.getElementById('sbs-select-2').value,
        document.getElementById('sbs-select-3').value
    ];

    const selectedProducts = ids.map(id => PRODUCTS.find(p => p.id === id));

    // Update Headers
    selectedProducts.forEach((p, i) => {
        updateElement(`h-name-${i+1}`, p ? p.name : '--');
    });

    // Update Images
    selectedProducts.forEach((p, i) => {
        const img = document.getElementById(`h-img-${i+1}`);
        if (img && p) img.src = p.image;
    });

    // Update Rows
    const metrics = ['cores', 'memory', 'tdp', 'msrp'];
    metrics.forEach(metric => {
        selectedProducts.forEach((p, i) => {
            const val = p ? (metric === 'msrp' ? `$${p[metric]}` : (metric === 'memory' ? `${p[metric]}GB` : p[metric])) : '--';
            updateElement(`val-${metric}-${i+1}`, val);
        });
    });
}
