/**
 * Security Utility: Sanitizes HTML strings to prevent XSS
 */
function sanitizeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Precision Lab | Authentication Module
 * Handles multi-user registration, login, and sessions using localStorage.
 */

const AUTH_KEY = 'pcweb_auth_session';
const USERS_KEY = 'pcweb_registered_users';
const ADMIN_EMAIL = 'admin@precision.lab';
const ADMIN_PASSWORD = 'admin123';

/**
 * Register a new user
 */
function register(username, email, password) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    // Check if email already exists (Case-insensitive check for reliability)
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase()) || email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
        return { success: false, message: t('msg_email_taken') };
    }

    const newUser = {
        username: sanitizeHTML(username), // Sanitize on intake
        email: email.trim(),
        password: password, // In a real app, this would be hashed
        registerDate: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { success: true, message: t('msg_reg_success') };
}

/**
 * Authenticate user or admin
 */
function login(email, password) {
    // 1. Check Admin Credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const session = {
            email: email,
            role: 'admin',
            loginTime: new Date().toISOString()
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(session));
        return { success: true, role: 'admin' };
    } 

    // 2. Check Registered Users
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        const session = {
            username: user.username,
            email: user.email,
            role: 'user',
            loginTime: new Date().toISOString()
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(session));
        return { success: true, role: 'user' };
    }

    return { success: false, message: t('msg_login_fail') };
}

function logout() {
    localStorage.removeItem(AUTH_KEY);
    // Determine path based on current location
    const isInsidePages = window.location.pathname.includes('/pages/');
    window.location.href = isInsidePages ? '../index.html' : 'index.html';
}

function getSession() {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
}

function isAdmin() {
    const session = getSession();
    return session && session.role === 'admin';
}

function isLoggedIn() {
    return getSession() !== null;
}

// Global Auth Guard
(function() {
    const path = window.location.pathname;
    const session = getSession();

    // Protect Admin pages
    if (path.includes('admin-')) {
        if (!session || session.role !== 'admin') {
            console.warn('Unauthorized access. Redirecting in 2s...');
            setTimeout(() => {
                const redirectPath = path.includes('/pages/') ? 'login.html' : 'pages/login.html';
                window.location.href = redirectPath;
            }, 500);
        }
    }
})();
