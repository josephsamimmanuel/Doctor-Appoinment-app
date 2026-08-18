/* ================================================
   Shared App JS - MediCare+ Doctor Appointment System
   ================================================ */

/* ── ── ── THEME ── ── ── */
const ThemeManager = (() => {
  const KEY = 'medicare-theme';

  function init() {
    const saved = localStorage.getItem(KEY) || 'light';
    apply(saved);
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(KEY, theme);
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.innerHTML = theme === 'dark' ? SvgIcons.sun() : SvgIcons.moon();
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  function toggle() {
    const current = localStorage.getItem(KEY) || 'light';
    apply(current === 'dark' ? 'light' : 'dark');
  }

  function current() { return localStorage.getItem(KEY) || 'light'; }

  return { init, apply, toggle, current };
})();

/* ── ── ── SVG ICONS ── ── ── */
const SvgIcons = {
  moon: () => `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  sun:  () => `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  close: () => `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  check: () => `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
  info:  () => `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  warn:  () => `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  error: () => `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  star:  (filled) => filled
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="var(--color-warning-600)" stroke="var(--color-warning-600)" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-gray-300)" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  bell:  () => `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  menu:  () => `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  chevronLeft:  () => `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>`,
  chevronRight: () => `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`,
  calendar: () => `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  upload: () => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>`,
  search: () => `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  mapPin: () => `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  clock:  () => `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  user:   () => `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
};

/* ── ── ── TOAST NOTIFICATIONS ── ── ── */
const Toast = (() => {
  let container;

  function getContainer() {
    if (!container) {
      container = document.getElementById('toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
      }
    }
    return container;
  }

  const iconMap = {
    success: { svg: SvgIcons.check(), color: 'var(--color-success-500)' },
    warning: { svg: SvgIcons.warn(),  color: 'var(--color-warning-500)' },
    error:   { svg: SvgIcons.error(), color: 'var(--color-error-500)' },
    info:    { svg: SvgIcons.info(),  color: 'var(--color-primary-500)' },
  };

  function show({ title = '', message = '', type = 'info', duration = 4000 } = {}) {
    const ctr = getContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const { svg, color } = iconMap[type] || iconMap.info;

    toast.innerHTML = `
      <div class="toast-icon" style="color: ${color}">${svg}</div>
      <div class="toast-content">
        ${title ? `<div class="toast-title">${title}</div>` : ''}
        ${message ? `<div class="toast-message">${message}</div>` : ''}
      </div>
      <button class="toast-close" aria-label="Close">${SvgIcons.close()}</button>
    `;

    toast.querySelector('.toast-close').addEventListener('click', () => remove(toast));
    ctr.appendChild(toast);

    if (duration > 0) {
      setTimeout(() => remove(toast), duration);
    }
    return toast;
  }

  function remove(toast) {
    toast.classList.add('removing');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    setTimeout(() => toast.remove(), 500);
  }

  return {
    show,
    success: (msg, title = 'Success')  => show({ title, message: msg, type: 'success' }),
    error:   (msg, title = 'Error')    => show({ title, message: msg, type: 'error' }),
    warning: (msg, title = 'Warning')  => show({ title, message: msg, type: 'warning' }),
    info:    (msg, title = 'Info')     => show({ title, message: msg, type: 'info' }),
  };
})();

/* ── ── ── MODAL ── ── ── */
const Modal = (() => {
  function open(modalId) {
    const overlay = document.getElementById(modalId);
    if (!overlay) return;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close(modalId);
    }, { once: true });
  }

  function close(modalId) {
    const overlay = document.getElementById(modalId);
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function closeAll() {
    document.querySelectorAll('.modal-overlay.active').forEach(el => {
      el.classList.remove('active');
    });
    document.body.style.overflow = '';
  }

  function init() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAll();
    });
    document.querySelectorAll('[data-modal-open]').forEach(btn => {
      btn.addEventListener('click', () => open(btn.dataset.modalOpen));
    });
    document.querySelectorAll('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', () => close(btn.dataset.modalClose));
    });
  }

  return { open, close, closeAll, init };
})();

/* ── ── ── TABS ── ── ── */
const Tabs = (() => {
  function init(container) {
    const el = typeof container === 'string' ? document.querySelector(container) : container;
    if (!el) return;

    const buttons = el.querySelectorAll('.tab-btn');
    const panels  = el.querySelectorAll('.tab-panel');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = el.querySelector(`[data-tab-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  }

  function initAll() {
    document.querySelectorAll('.tabs').forEach(init);
  }

  return { init, initAll };
})();

/* ── ── ── MOBILE MENU ── ── ── */
const MobileMenu = (() => {
  let hamburger, mobileMenu, isOpen = false;

  function init() {
    hamburger  = document.querySelector('.hamburger');
    mobileMenu = document.querySelector('.mobile-menu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', toggle);

    document.addEventListener('click', (e) => {
      if (isOpen && !hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        close();
      }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', close);
    });
  }

  function toggle() {
    isOpen ? close() : open();
  }
  function open() {
    isOpen = true;
    hamburger?.classList.add('active');
    mobileMenu?.classList.add('active');
  }
  function close() {
    isOpen = false;
    hamburger?.classList.remove('active');
    mobileMenu?.classList.remove('active');
  }

  return { init, toggle, open, close };
})();

/* ── ── ── SIDEBAR (Admin) ── ── ── */
const Sidebar = (() => {
  let sidebar, overlay, isCollapsed = false, isOpen = false;

  function init() {
    sidebar = document.querySelector('.sidebar');
    overlay = document.querySelector('.sidebar-overlay');
    if (!sidebar) return;

    const toggleBtn = document.querySelector('.sidebar-toggle-btn');
    if (toggleBtn) toggleBtn.addEventListener('click', toggleCollapse);

    const menuBtn = document.querySelector('[data-sidebar-toggle]');
    if (menuBtn) menuBtn.addEventListener('click', toggleOpen);

    if (overlay) {
      overlay.addEventListener('click', closeMobile);
    }

    const mainEl = document.querySelector('.layout-main');
    const saved  = localStorage.getItem('sidebar-collapsed');
    if (saved === 'true' && mainEl) {
      isCollapsed = true;
      sidebar.classList.add('collapsed');
      mainEl.classList.add('sidebar-collapsed');
    }
  }

  function toggleCollapse() {
    const mainEl = document.querySelector('.layout-main');
    isCollapsed = !isCollapsed;
    sidebar?.classList.toggle('collapsed', isCollapsed);
    mainEl?.classList.toggle('sidebar-collapsed', isCollapsed);
    localStorage.setItem('sidebar-collapsed', isCollapsed);
  }

  function toggleOpen() {
    isOpen ? closeMobile() : openMobile();
  }
  function openMobile() {
    isOpen = true;
    sidebar?.classList.add('open');
  }
  function closeMobile() {
    isOpen = false;
    sidebar?.classList.remove('open');
  }

  function setActiveLink(path) {
    const links = document.querySelectorAll('.sidebar-nav-link');
    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === path);
    });
  }

  return { init, toggleCollapse, toggleOpen, closeMobile, setActiveLink };
})();

/* ── ── ── PAGE CHROME HELPERS ── ── ── */
function ensurePatientShell() {
  const path = window.location.pathname.replace(/\\/g, '/');
  if (!path.includes('/mock-ui/patient/')) return;

  const fileName = path.split('/').pop() || 'index.html';
  const pageName = fileName.replace('.html', '');
  const excludedPages = new Set([
    'index',
    'login',
    'register',
    'forgot-password',
    'reset-password',
    'verify-otp',
    'video-consultation',
  ]);

  if (excludedPages.has(pageName)) return;

  if (!document.querySelector('.navbar')) {
    const nav = document.createElement('nav');
    nav.className = 'navbar';
    nav.innerHTML = `
      <div class="navbar-inner">
        <a class="navbar-brand" href="index.html">
          <div class="navbar-brand-icon">+</div>
          <span class="navbar-brand-text">MediCare<span>+</span></span>
        </a>
        <ul class="navbar-nav">
          <li><a class="navbar-nav-link ${pageName === 'index' ? 'active' : ''}" href="index.html">Home</a></li>
          <li><a class="navbar-nav-link ${['search-doctors', 'doctor-profile', 'booking', 'booking-confirmation'].includes(pageName) ? 'active' : ''}" href="search-doctors.html">Find Doctors</a></li>
          <li><a class="navbar-nav-link ${['appointments', 'appointment-detail', 'video-consultation'].includes(pageName) ? 'active' : ''}" href="appointments.html">Appointments</a></li>
          <li><a class="navbar-nav-link ${['medical-records', 'prescriptions', 'payments'].includes(pageName) ? 'active' : ''}" href="medical-records.html">Records</a></li>
          <li><a class="navbar-nav-link ${['profile', 'notifications', 'help', 'login', 'register', 'forgot-password', 'reset-password', 'verify-otp'].includes(pageName) ? 'active' : ''}" href="profile.html">Profile</a></li>
        </ul>
        <div class="navbar-actions">
          <a class="btn btn-outline btn-sm hide-sm" href="help.html">Support</a>
          <a class="btn btn-primary btn-sm hide-sm" href="login.html">Login / Sign Up</a>
          <button class="theme-toggle" aria-label="Toggle theme"></button>
          <button class="hamburger" aria-label="Toggle menu">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
        </div>
      </div>
    `;
    document.body.insertBefore(nav, document.body.firstChild);

    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
      <a class="navbar-nav-link" href="index.html">Home</a>
      <a class="navbar-nav-link" href="search-doctors.html">Find Doctors</a>
      <a class="navbar-nav-link" href="appointments.html">Appointments</a>
      <a class="navbar-nav-link" href="medical-records.html">Records</a>
      <a class="navbar-nav-link" href="profile.html">Profile</a>
      <a class="navbar-nav-link" href="help.html">Support</a>
    `;
    document.body.insertBefore(mobileMenu, nav.nextSibling);
  }

  if (!document.querySelector('.footer')) {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = `
      <div class="footer-grid">
        <div>
          <div class="footer-brand-text">MediCare+</div>
          <p class="footer-desc">Trusted multi-specialty care with instant booking, secure payments, and digital health records.</p>
        </div>
        <div>
          <div class="footer-heading">Quick Links</div>
          <div class="footer-links">
            <a class="footer-link" href="search-doctors.html">Find Doctors</a>
            <a class="footer-link" href="appointments.html">My Appointments</a>
            <a class="footer-link" href="medical-records.html">Medical Records</a>
          </div>
        </div>
        <div>
          <div class="footer-heading">Support</div>
          <div class="footer-links">
            <a class="footer-link" href="help.html">Help Center</a>
            <a class="footer-link" href="profile.html">Profile Settings</a>
            <span class="footer-link">care@medicareplus.in</span>
          </div>
        </div>
        <div>
          <div class="footer-heading">Contact</div>
          <div class="footer-links">
            <span class="footer-link">+91 44 6789 0123</span>
            <span class="footer-link">MediCare+ Multi-Specialty Hospital</span>
            <span class="footer-link">Open 24/7</span>
          </div>
        </div>
      </div>
      <div class="footer-bottom">© 2026 MediCare+ All rights reserved.</div>
    `;
    document.body.appendChild(footer);
  }
}

function ensureAdminSidebarNav() {
  const path = window.location.pathname.replace(/\\/g, '/');
  if (!path.includes('/mock-ui/admin/')) return;

  document.body.classList.add('admin-theme');

  const nav = document.querySelector('.sidebar-nav');
  if (!nav) return;

  const items = [
    ['dashboard.html', 'Dashboard', '📊'],
    ['appointments.html', 'Appointments', '📅'],
    ['doctors.html', 'Doctors', '🩺'],
    ['patients.html', 'Patients', '🧑'],
    ['departments.html', 'Departments', '🏥'],
    ['schedules.html', 'Schedules', '🗓'],
    ['communication.html', 'Messages', '💬'],
    ['notifications.html', 'Notifications', '🔔'],
    ['finance.html', 'Payments', '💳'],
    ['finance.html', 'Transactions', '💱'],
    ['finance.html', 'Invoices', '🧾'],
    ['reports.html', 'Reports', '📈'],
    ['audit-logs.html', 'Audit Logs', '🧷'],
    ['users-roles.html', 'Users & Roles', '👥'],
    ['settings.html', 'Settings', '⚙'],
  ];

  const currentPath = path.split('/').pop() || 'dashboard.html';
  nav.innerHTML = items.map(([href, label, icon]) => `
    <a class="sidebar-nav-link ${currentPath === href ? 'active' : ''}" href="${href}">
      <span class="sidebar-nav-icon">${icon}</span>
      <span class="sidebar-nav-text">${label}</span>
    </a>
  `).join('');
}

/* ── ── ── HASH ROUTER ── ── ── */
const Router = (() => {
  const routes = new Map();
  let notFoundHandler = null;

  function on(path, handler) {
    routes.set(path, handler);
    return { on };
  }

  function notFound(handler) {
    notFoundHandler = handler;
  }

  function resolve(hash) {
    const path = hash.replace('#', '') || '/';
    const handler = routes.get(path);
    if (handler) {
      handler(path);
    } else {
      for (const [pattern, h] of routes) {
        const regex = new RegExp('^' + pattern.replace(/:[^/]+/g, '([^/]+)') + '$');
        const match = path.match(regex);
        if (match) {
          const keys   = [...pattern.matchAll(/:([^/]+)/g)].map(m => m[1]);
          const params = {};
          keys.forEach((key, i) => { params[key] = match[i + 1]; });
          h(path, params);
          return;
        }
      }
      notFoundHandler?.(path);
    }
  }

  function navigate(path) {
    window.location.hash = path;
  }

  function init() {
    window.addEventListener('hashchange', () => resolve(window.location.hash));
    resolve(window.location.hash);
  }

  function getCurrentPath() {
    return window.location.hash.replace('#', '') || '/';
  }

  return { on, notFound, navigate, init, getCurrentPath };
})();

/* ── ── ── FORM VALIDATION ── ── ── */
const FormValidator = (() => {
  const rules = {
    required: (val) => val.trim() !== '' || 'This field is required',
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Enter a valid email address',
    phone: (val) => /^[6-9]\d{9}$/.test(val.replace(/\D/g, '')) || 'Enter a valid 10-digit Indian mobile number',
    minLength: (n) => (val) => val.length >= n || `Minimum ${n} characters required`,
    maxLength: (n) => (val) => val.length <= n || `Maximum ${n} characters allowed`,
    numeric: (val) => /^\d+$/.test(val) || 'Only numbers allowed',
    min: (n) => (val) => +val >= n || `Minimum value is ${n}`,
    max: (n) => (val) => +val <= n || `Maximum value is ${n}`,
  };

  function validate(input, fieldRules = []) {
    const value = input.value;
    for (const rule of fieldRules) {
      const result = typeof rule === 'function' ? rule(value) : rules[rule]?.(value);
      if (result !== true) {
        setError(input, result || 'Invalid value');
        return false;
      }
    }
    clearError(input);
    return true;
  }

  function setError(input, message) {
    input.classList.add('error');
    input.classList.remove('success');
    let errorEl = input.parentElement.querySelector('.form-error');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'form-error';
      input.parentElement.appendChild(errorEl);
    }
    errorEl.textContent = message;
  }

  function clearError(input) {
    input.classList.remove('error');
    input.classList.add('success');
    const errorEl = input.parentElement.querySelector('.form-error');
    if (errorEl) errorEl.remove();
  }

  function validateForm(form, schema) {
    let valid = true;
    Object.entries(schema).forEach(([name, fieldRules]) => {
      const input = form.querySelector(`[name="${name}"]`);
      if (input && !validate(input, fieldRules)) valid = false;
    });
    return valid;
  }

  return { validate, setError, clearError, validateForm, rules };
})();

/* ── ── ── SEARCH & FILTER ── ── ── */
const Search = (() => {
  function filterDoctors(query = '', filters = {}) {
    const { specialties: MockDataLocal } = window.MockData || {};
    if (!window.MockData) return [];

    let results = [...MockData.doctors];

    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.qualification.toLowerCase().includes(q) ||
        d.bio.toLowerCase().includes(q)
      );
    }

    if (filters.specialty) {
      results = results.filter(d => d.specialty === filters.specialty);
    }
    if (filters.gender) {
      results = results.filter(d => d.gender === filters.gender);
    }
    if (filters.available !== undefined) {
      results = results.filter(d => d.available === filters.available);
    }
    if (filters.maxFee) {
      results = results.filter(d => d.fee <= +filters.maxFee);
    }
    if (filters.minRating) {
      results = results.filter(d => d.rating >= +filters.minRating);
    }
    if (filters.consultationType) {
      results = results.filter(d => d.consultationType.includes(filters.consultationType));
    }

    if (filters.sort) {
      switch (filters.sort) {
        case 'fee_asc':        results.sort((a, b) => a.fee - b.fee); break;
        case 'fee_desc':       results.sort((a, b) => b.fee - a.fee); break;
        case 'rating_desc':    results.sort((a, b) => b.rating - a.rating); break;
        case 'experience_desc':results.sort((a, b) => b.experience - a.experience); break;
        case 'name_asc':       results.sort((a, b) => a.name.localeCompare(b.name)); break;
      }
    }

    return results;
  }

  function filterAppointments(appointments, filters = {}) {
    let results = [...appointments];
    if (filters.status)    results = results.filter(a => a.status === filters.status);
    if (filters.doctorId)  results = results.filter(a => a.doctorId === filters.doctorId);
    if (filters.dateFrom)  results = results.filter(a => a.date >= filters.dateFrom);
    if (filters.dateTo)    results = results.filter(a => a.date <= filters.dateTo);
    return results;
  }

  return { filterDoctors, filterAppointments };
})();

/* ── ── ── CALENDAR ── ── ── */
const Calendar = (() => {
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const DAYS   = ['Su','Mo','Tu','We','Th','Fr','Sa'];

  function render(containerId, { selectedDate, bookedDates = [], onSelect, minDate } = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let current = selectedDate ? new Date(selectedDate) : new Date();
    let year = current.getFullYear();
    let month = current.getMonth();
    let selected = selectedDate || null;

    function draw() {
      const today  = new Date();
      const minDt  = minDate ? new Date(minDate) : null;
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const prevDays = new Date(year, month, 0).getDate();

      let daysHtml = '';
      for (let i = firstDay - 1; i >= 0; i--) {
        daysHtml += `<div class="calendar-day other-month">${prevDays - i}</div>`;
      }
      for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const isToday    = today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
        const isSelected = selected === dateStr;
        const hasAppt    = bookedDates.includes(dateStr);
        const isPast     = minDt && new Date(dateStr) < minDt;
        let cls = 'calendar-day';
        if (isToday)    cls += ' today';
        if (isSelected) cls += ' selected';
        if (hasAppt)    cls += ' has-appointment';
        if (isPast)     cls += ' disabled';
        daysHtml += `<div class="${cls}" data-date="${dateStr}">${d}</div>`;
      }
      const remaining = 42 - firstDay - daysInMonth;
      for (let d = 1; d <= remaining; d++) {
        daysHtml += `<div class="calendar-day other-month">${d}</div>`;
      }

      container.innerHTML = `
        <div class="calendar">
          <div class="calendar-header">
            <button class="calendar-nav-btn" id="cal-prev-${containerId}">${SvgIcons.chevronLeft()}</button>
            <div class="calendar-title">${MONTHS[month]} ${year}</div>
            <button class="calendar-nav-btn" id="cal-next-${containerId}">${SvgIcons.chevronRight()}</button>
          </div>
          <div class="calendar-grid">
            <div class="calendar-weekdays">${DAYS.map(d => `<div class="calendar-weekday">${d}</div>`).join('')}</div>
            <div class="calendar-days">${daysHtml}</div>
          </div>
        </div>
      `;

      container.querySelector(`#cal-prev-${containerId}`)?.addEventListener('click', () => {
        month--;
        if (month < 0) { month = 11; year--; }
        draw();
      });
      container.querySelector(`#cal-next-${containerId}`)?.addEventListener('click', () => {
        month++;
        if (month > 11) { month = 0; year++; }
        draw();
      });
      container.querySelectorAll('.calendar-day:not(.other-month):not(.disabled)').forEach(day => {
        day.addEventListener('click', () => {
          selected = day.dataset.date;
          onSelect?.(selected);
          draw();
        });
      });
    }

    draw();
  }

  return { render };
})();

/* ── ── ── STAR RATING ── ── ── */
const StarRating = (() => {
  function render(rating, max = 5, size = '') {
    let html = `<div class="star-rating ${size}">`;
    for (let i = 1; i <= max; i++) {
      html += `<span class="star ${i <= Math.floor(rating) ? 'filled' : i - 0.5 <= rating ? 'partial' : ''}">${SvgIcons.star(i <= rating)}</span>`;
    }
    html += `</div>`;
    return html;
  }

  function renderInput(containerId, { initial = 0, onChange } = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    let current = initial;

    function draw() {
      container.innerHTML = `<div class="star-rating-input">` +
        [1,2,3,4,5].map(i => `<span class="star ${i <= current ? 'active' : ''}" data-val="${i}">${SvgIcons.star(i <= current)}</span>`).join('') +
        `</div>`;
      container.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', () => {
          current = +star.dataset.val;
          onChange?.(current);
          draw();
        });
        star.addEventListener('mouseenter', () => {
          container.querySelectorAll('.star').forEach((s, idx) => {
            s.style.color = idx < +star.dataset.val ? 'var(--color-warning-600)' : '';
          });
        });
      });
      container.querySelector('.star-rating-input')?.addEventListener('mouseleave', () => {
        container.querySelectorAll('.star').forEach(s => s.style.color = '');
      });
    }

    draw();
    return { getValue: () => current };
  }

  return { render, renderInput };
})();

/* ── ── ── UTILITY FUNCTIONS ── ── ── */
const Utils = (() => {
  function formatDate(dateStr, options = {}) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const defaults = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-IN', { ...defaults, ...options });
  }

  function formatDateShort(dateStr) {
    return formatDate(dateStr, { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function formatTime(timeStr) {
    if (!timeStr) return '';
    const [h, m] = timeStr.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12  = h % 12 || 12;
    return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function formatRelativeTime(dateStr) {
    const now  = new Date();
    const then = new Date(dateStr);
    const diff = Math.floor((now - then) / 1000);
    if (diff < 60)   return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400)return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return formatDateShort(dateStr);
  }

  function generateId(prefix = 'ID') {
    return `${prefix}${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
  }

  function debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  }

  function getStatusBadgeClass(status) {
    const map = {
      confirmed: 'badge-success',
      completed: 'badge-gray',
      pending:   'badge-warning',
      cancelled: 'badge-error',
      paid:      'badge-success',
      refunded:  'badge-primary',
      failed:    'badge-error',
      success:   'badge-success',
      active:    'badge-success',
      inactive:  'badge-gray',
    };
    return map[status?.toLowerCase()] || 'badge-gray';
  }

  function getInitials(name) {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  function createElement(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'className') el.className = v;
      else if (k === 'innerHTML') el.innerHTML = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), v);
      else el.setAttribute(k, v);
    });
    children.forEach(child => {
      el.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    });
    return el;
  }

  return {
    formatDate, formatDateShort, formatTime, formatCurrency,
    formatRelativeTime, generateId, debounce, capitalize,
    getStatusBadgeClass, getInitials, createElement,
  };
})();

/* ── ── ── DOCTOR CARD RENDERER ── ── ── */
const DoctorCard = (() => {
  function render(doctor) {
    const stars = StarRating.render(doctor.rating, 5, 'star-rating-sm');
    return `
      <div class="doctor-card" data-doctor-id="${doctor.id}">
        <div class="doctor-card-banner"></div>
        <div class="doctor-card-avatar">
          <div class="avatar avatar-xl" style="background: linear-gradient(135deg, var(--ig-purple), var(--ig-blue));">
            <span>${doctor.initials}</span>
          </div>
        </div>
        <div class="doctor-card-body">
          <div class="doctor-card-name">${doctor.name}</div>
          <div class="doctor-card-specialty">${doctor.specialty}</div>
          <div class="doctor-card-meta">
            <div class="doctor-card-meta-item">
              ${SvgIcons.clock()} ${doctor.experience} yrs exp
            </div>
            <div class="doctor-card-meta-item">
              ${SvgIcons.user()} ${doctor.reviewCount} reviews
            </div>
            <div class="doctor-card-meta-item">
              ${stars} ${doctor.rating}
            </div>
          </div>
          <div style="font-size: var(--text-xs); color: var(--color-text-tertiary); margin-bottom: var(--space-3);">
            ${doctor.qualification}
          </div>
          <div class="doctor-card-fee">
            <div>
              <div class="doctor-card-fee-label">Consultation Fee</div>
              <div class="doctor-card-fee-amount">${Utils.formatCurrency(doctor.fee)}</div>
            </div>
            <button class="btn btn-primary btn-sm" onclick="bookAppointment('${doctor.id}')">
              Book Now
            </button>
          </div>
        </div>
      </div>`;
  }

  return { render };
})();

/* ── ── ── APPOINTMENT CARD RENDERER ── ── ── */
const AppointmentCard = (() => {
  function render(appt) {
    const doctor  = window.MockData?.getDoctorById(appt.doctorId);
    const patient = window.MockData?.getPatientById(appt.patientId);

    return `
      <div class="appointment-card status-${appt.status}" data-appt-id="${appt.id}">
        <div class="appointment-card-header">
          <div class="appointment-card-doctor">
            <div class="avatar avatar-md">
              <span>${doctor?.initials || '?'}</span>
            </div>
            <div class="appointment-card-doctor-info">
              <div class="appointment-card-doctor-name">${doctor?.name || 'Unknown Doctor'}</div>
              <div class="appointment-card-specialty">${doctor?.specialty || ''}</div>
            </div>
          </div>
          <span class="badge badge-dot ${Utils.getStatusBadgeClass(appt.status)}">
            ${Utils.capitalize(appt.status)}
          </span>
        </div>
        <div class="appointment-card-details">
          <div class="appointment-card-detail-item">
            <span class="appointment-card-detail-label">Date</span>
            <span class="appointment-card-detail-value">${Utils.formatDateShort(appt.date)}</span>
          </div>
          <div class="appointment-card-detail-item">
            <span class="appointment-card-detail-label">Time</span>
            <span class="appointment-card-detail-value">${Utils.formatTime(appt.time)}</span>
          </div>
          <div class="appointment-card-detail-item">
            <span class="appointment-card-detail-label">Type</span>
            <span class="appointment-card-detail-value">${appt.type}</span>
          </div>
          <div class="appointment-card-detail-item">
            <span class="appointment-card-detail-label">Token</span>
            <span class="appointment-card-detail-value">${appt.tokenNumber}</span>
          </div>
          <div class="appointment-card-detail-item">
            <span class="appointment-card-detail-label">Fee</span>
            <span class="appointment-card-detail-value">${Utils.formatCurrency(appt.fee)}</span>
          </div>
          <div class="appointment-card-detail-item">
            <span class="appointment-card-detail-label">Payment</span>
            <span class="badge ${Utils.getStatusBadgeClass(appt.paymentStatus)} badge-xs">
              ${Utils.capitalize(appt.paymentStatus)}
            </span>
          </div>
        </div>
        ${appt.reason ? `<div style="font-size: var(--text-sm); color: var(--color-text-secondary); padding-top: var(--space-2); border-top: 1px solid var(--color-border);">
          <strong>Reason:</strong> ${appt.reason}
        </div>` : ''}
        <div class="appointment-card-actions">
          ${appt.status === 'confirmed' ? `
            <button class="btn btn-outline btn-sm" onclick="rescheduleAppointment('${appt.id}')">Reschedule</button>
            <button class="btn btn-ghost btn-sm" onclick="cancelAppointment('${appt.id}')">Cancel</button>
          ` : ''}
          ${appt.status === 'completed' ? `
            <button class="btn btn-primary btn-sm" onclick="bookAgain('${appt.doctorId}')">Book Again</button>
            ${appt.prescription ? `<button class="btn btn-outline btn-sm" onclick="viewPrescription('${appt.prescription}')">View Rx</button>` : ''}
            <button class="btn btn-ghost btn-sm" onclick="leaveReview('${appt.id}')">Leave Review</button>
          ` : ''}
          ${appt.status === 'pending' ? `
            <button class="btn btn-danger btn-sm" onclick="cancelAppointment('${appt.id}')">Cancel</button>
          ` : ''}
        </div>
      </div>`;
  }

  return { render };
})();

/* ── ── ── GLOBAL ACTION STUBS ── ── ── */
function bookAppointment(doctorId) {
  Toast.info(`Redirecting to book with Dr. ${MockData?.getDoctorById(doctorId)?.name || doctorId}...`);
  setTimeout(() => Router.navigate('/book/' + doctorId), 800);
}
function cancelAppointment(id) {
  Toast.warning('Appointment cancellation requested.', 'Confirm Cancellation');
}
function rescheduleAppointment(id) {
  Toast.info('Opening reschedule options...', 'Reschedule');
}
function bookAgain(doctorId) {
  bookAppointment(doctorId);
}
function viewPrescription(id) {
  Toast.info('Opening prescription...', 'Prescription');
}
function leaveReview(apptId) {
  Toast.info('Opening review form...', 'Write a Review');
}

/* ── ── ── INIT ── ── ── */
document.addEventListener('DOMContentLoaded', () => {
  ensurePatientShell();
  ensureAdminSidebarNav();
  ThemeManager.init();
  Modal.init();
  Tabs.initAll();
  MobileMenu.init();
  Sidebar.init();

  /* Theme toggle buttons */
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', ThemeManager.toggle);
  });

  /* Notification bell toggles */
  document.querySelectorAll('.notification-bell').forEach(bell => {
    bell.addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = bell.nextElementSibling;
      if (dropdown?.classList.contains('notification-dropdown')) {
        dropdown.classList.toggle('open');
      }
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.notification-dropdown.open').forEach(d => d.classList.remove('open'));
  });

  /* Dropdown menus */
  document.querySelectorAll('[data-dropdown]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const menu = trigger.nextElementSibling;
      if (menu?.classList.contains('dropdown-menu')) {
        document.querySelectorAll('.dropdown-menu.open').forEach(m => {
          if (m !== menu) m.classList.remove('open');
        });
        menu.classList.toggle('open');
      }
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
  });

  /* File upload areas */
  document.querySelectorAll('.file-upload-area').forEach(area => {
    area.addEventListener('dragover', (e) => { e.preventDefault(); area.classList.add('dragover'); });
    area.addEventListener('dragleave', () => area.classList.remove('dragover'));
    area.addEventListener('drop', (e) => {
      e.preventDefault();
      area.classList.remove('dragover');
      const files = [...e.dataTransfer.files];
      Toast.success(`${files.length} file(s) ready to upload.`, 'Files Selected');
    });
  });

  /* Smooth active link highlighting for navbar */
  const currentPath = window.location.pathname.split('/').pop();
  document.querySelectorAll('.navbar-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || href.endsWith('/' + currentPath))) {
      link.classList.add('active');
    }
  });
});
