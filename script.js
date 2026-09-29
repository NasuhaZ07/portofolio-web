/**
 * Developer Portfolio - Main Interactive Script
 * Author: Alex Pratama
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize All Modules
  initThemeToggle();
  initTypingEffect();
  initNavbarScroll();
  initMobileMenu();
  initScrollProgress();
  initAnimatedCounters();
  renderSkills();
  renderProjects();
  initProjectFiltering();
  initSkillFiltering();
  initContactForm();
  initModals();
  initScrollTop();
  setCurrentYear();
});

/* ==========================================================================
   1. DATA DEFINITIONS
   ========================================================================== */

const skillsData = [
  // Frontend
  { name: 'ReactJS', category: 'frontend', percent: 90, icon: 'fa-brands fa-react', color: '#61dafb' },
  { name: 'JavaScript (ES6+)', category: 'frontend', percent: 92, icon: 'fa-brands fa-js', color: '#f7df1e' },
  { name: 'HTML5 & CSS3/SCSS', category: 'frontend', percent: 95, icon: 'fa-brands fa-html5', color: '#e34f26' },
  { name: 'TypeScript', category: 'frontend', percent: 82, icon: 'fa-solid fa-code', color: '#3178c6' },
  { name: 'Tailwind CSS', category: 'frontend', percent: 88, icon: 'fa-solid fa-wind', color: '#06b6d4' },
  
  // Backend & DB
  { name: 'Node.js & Express', category: 'backend', percent: 85, icon: 'fa-brands fa-node-js', color: '#68a063' },
  { name: 'RESTful APIs', category: 'backend', percent: 90, icon: 'fa-solid fa-network-wired', color: '#38bdf8' },
  { name: 'MongoDB / Mongoose', category: 'backend', percent: 80, icon: 'fa-solid fa-database', color: '#47a248' },
  { name: 'MySQL / PostgreSQL', category: 'backend', percent: 78, icon: 'fa-solid fa-server', color: '#336791' },
  
  // Tools & Others
  { name: 'Git & GitHub', category: 'tools', percent: 90, icon: 'fa-brands fa-github', color: '#ffffff' },
  { name: 'Figma (UI/UX)', category: 'tools', percent: 84, icon: 'fa-brands fa-figma', color: '#f24e1e' },
  { name: 'Docker', category: 'tools', percent: 70, icon: 'fa-brands fa-docker', color: '#2496ed' },
  { name: 'Vite & Webpack', category: 'tools', percent: 85, icon: 'fa-solid fa-bolt', color: '#ffc107' }
];

const projectsData = [
  {
    id: 1,
    title: 'PulseAnalytics - SaaS AI Dashboard',
    category: 'webapp',
    categoryName: 'Web App',
    tags: ['ReactJS', 'Node.js', 'Chart.js', 'Tailwind'],
    desc: 'Platform analitik data bisnis berbasis AI dengan visualisasi grafik real-time, manajemen tim, dan proteksi otentikasi JWT.',
    icon: 'fa-chart-line',
    gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    longDesc: 'PulseAnalytics dirancang untuk membantu perusahaan memantau metrik performa secara real-time. Dilengkapi dengan widget dashboard modular, ekspor laporan otomatis dalam PDF/CSV, dan integrasi webhook backend.',
    features: ['Real-time Data Streaming', 'Dark & Light Mode Dashboard', 'Export PDF/Excel Reports', 'Multi-tenant User Roles'],
    liveUrl: 'https://example.com/demo1',
    githubUrl: 'https://github.com/example/pulse-analytics'
  },
  {
    id: 2,
    title: 'ShopZen - Modern E-Commerce Platform',
    category: 'webapp',
    categoryName: 'Web App',
    tags: ['JavaScript', 'Express', 'MongoDB', 'Stripe API'],
    desc: 'Toko online interaktif dengan keranjang belanja animasi, integrasi payment gateway Midtrans & Stripe, serta panel admin barang.',
    icon: 'fa-bag-shopping',
    gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
    longDesc: 'ShopZen memberikan pengalaman berbelanja serasa aplikasi native dengan waktu muat sangat singkat. Mendukung fitur filter produk dinamis, pencarian berbasis AI sederhana, dan checkout cepat.',
    features: ['Simulasi Payment Gateway', 'Guest & User Checkout', 'Wishlist & Product Filter', 'Admin Inventory Manager'],
    liveUrl: 'https://example.com/demo2',
    githubUrl: 'https://github.com/example/shopzen'
  },
  {
    id: 3,
    title: 'FinFlow - Personal Finance Mobile UI/UX',
    category: 'uiux',
    categoryName: 'UI/UX Design',
    tags: ['Figma', 'Prototyping', 'Design System'],
    desc: 'Rancangan antarmuka aplikasi manajemen keuangan pribadi dengan pendekatan minimalis, micro-interactions, dan aksesiibilitas tinggi.',
    icon: 'fa-wallet',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    longDesc: 'Konsep desain FinFlow dibuat berdasarkan pengujian pengguna (user testing) untuk mengurangi hambatan pencatatan pengeluaran harian. Menggunakan sistem grid 8pt dan panduan warna inklusif.',
    features: ['High-Fidelity Interactive Prototype', 'Design Token Library', 'Dark Mode UI Variants', 'Usability Test Report'],
    liveUrl: 'https://figma.com/file/example',
    githubUrl: 'https://github.com/example/finflow-ui'
  },
  {
    id: 4,
    title: 'Nexus API Gateway & Auth Microservice',
    category: 'api',
    categoryName: 'API & Backend',
    tags: ['Node.js', 'Express', 'Redis', 'Docker'],
    desc: 'Layanan mikro backend untuk otentikasi terpusat (OAuth2/JWT), rate limiting, dan manajemen session terdistribusi berbasis Redis.',
    icon: 'fa-server',
    gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    longDesc: 'Nexus API menyediakan arsitektur tangguh yang siap menangani ribuan permintaan per detik dengan penanganan kesalahan yang rapi dan logging terpusat.',
    features: ['Rate Limiting Middleware', 'JWT Refresh Token Rotation', 'Comprehensive OpenAPI/Swagger Docs', 'Dockerized Setup'],
    liveUrl: 'https://example.com/api-docs',
    githubUrl: 'https://github.com/example/nexus-api'
  },
  {
    id: 5,
    title: 'TaskVerse - Collaborative Kanban Board',
    category: 'webapp',
    categoryName: 'Web App',
    tags: ['React', 'Drag & Drop API', 'Firebase'],
    desc: 'Aplikasi manajemen tugas tim dengan fitur drag-and-drop papan Kanban, sinkronisasi real-time, dan pengingat tenggat waktu.',
    icon: 'fa-list-check',
    gradient: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
    longDesc: 'TaskVerse memungkinkan tim berkolaborasi secara langsung tanpa lag. Menggunakan HTML5 Drag and Drop API native dan WebSocket untuk pembaruan kartu secara real-time.',
    features: ['Drag & Drop Task Reordering', 'Real-time Activity Feed', 'Custom Labels & Priority Levels', 'Responsive Touch Support'],
    liveUrl: 'https://example.com/taskverse',
    githubUrl: 'https://github.com/example/taskverse'
  },
  {
    id: 6,
    title: 'DevSphere - Developer Portfolio Theme',
    category: 'uiux',
    categoryName: 'UI/UX Design',
    tags: ['HTML5', 'CSS Glassmorphism', 'Vanilla JS'],
    desc: 'Template portofolio futuristik dengan efek glassmorphism, mode gelap/terang, dan performa skor 100 di Google Lighthouse.',
    icon: 'fa-laptop-code',
    gradient: 'linear-gradient(135deg, #0ea5e9, #2563eb)',
    longDesc: 'Portofolio interaktif yang dibangun khusus untuk developer. Ringan, tanpa ketergantungan library berat, dan siap dideploy ke Vercel atau Netlify.',
    features: ['Zero External Heavy Libraries', '100 Google Lighthouse Score', 'Smooth Scroll Animations', 'Easy Customization Config'],
    liveUrl: '#home',
    githubUrl: 'https://github.com/example/devsphere'
  }
];

/* ==========================================================================
   2. MODULE IMPLEMENTATIONS
   ========================================================================== */

// Theme Toggle
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
  
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio_theme', newTheme);
    showToast(`Mode ${newTheme === 'dark' ? 'Gelap' : 'Terang'} Diaktifkan!`);
  });
}

// Typing Animation Effect
function initTypingEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const roles = [
    'Full Stack Web Developer',
    'UI/UX Design Specialist',
    'Frontend Craftsman',
    'Problem Solver & Creator'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// Navbar Scroll Effect & Active Link Highlight
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active link update
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

// Mobile Hamburger Menu
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// Scroll Progress Bar
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

// Animated Stat Counters
function initAnimatedCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          let count = 0;
          const increment = Math.ceil(target / 40);
          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              stat.textContent = target + '+';
              clearInterval(timer);
            } else {
              stat.textContent = count;
            }
          }, 40);
        });
      }
    });
  }, { threshold: 0.5 });

  const aboutSection = document.getElementById('about');
  if (aboutSection) observer.observe(aboutSection);
}

// Render Skills Cards
function renderSkills(categoryFilter = 'all') {
  const skillsGrid = document.getElementById('skillsGrid');
  if (!skillsGrid) return;

  skillsGrid.innerHTML = '';
  const filtered = categoryFilter === 'all' 
    ? skillsData 
    : skillsData.filter(s => s.category === categoryFilter);

  filtered.forEach(skill => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.innerHTML = `
      <div class="skill-header">
        <div class="skill-info">
          <div class="skill-icon">
            <i class="${skill.icon}" style="color: ${skill.color}"></i>
          </div>
          <span class="skill-name">${skill.name}</span>
        </div>
        <span class="skill-percent">${skill.percent}%</span>
      </div>
      <div class="skill-progress-bar">
        <div class="skill-progress-fill" style="width: 0%;" data-target="${skill.percent}"></div>
      </div>
    `;
    skillsGrid.appendChild(card);
  });

  // Animate skill bars
  setTimeout(() => {
    document.querySelectorAll('.skill-progress-fill').forEach(fill => {
      const target = fill.getAttribute('data-target');
      fill.style.width = `${target}%`;
    });
  }, 100);
}

function initSkillFiltering() {
  const skillTabs = document.querySelectorAll('.skill-tab');
  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderSkills(tab.getAttribute('data-category'));
    });
  });
}

// Render Project Cards
function renderProjects(filter = 'all') {
  const projectsGrid = document.getElementById('projectsGrid');
  if (!projectsGrid) return;

  projectsGrid.innerHTML = '';
  const filtered = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  filtered.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const tagsHtml = project.tags.map(t => `<span class="tag">${t}</span>`).join('');

    card.innerHTML = `
      <div class="project-preview">
        <div class="project-banner" style="background: ${project.gradient}">
          <i class="fa-solid ${project.icon}" style="font-size: 3.5rem; color: rgba(255,255,255,0.85);"></i>
        </div>
        <div class="project-overlay">
          <button class="overlay-btn" onclick="openProjectModal(${project.id})" title="Detail Proyek">
            <i class="fa-solid fa-eye"></i>
          </button>
          <a href="${project.githubUrl}" target="_blank" rel="noopener" class="overlay-btn" title="Source Code">
            <i class="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
      <div class="project-details">
        <div class="project-tags">${tagsHtml}</div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.desc}</p>
        <div class="project-footer">
          <button class="btn-detail" onclick="openProjectModal(${project.id})">
            <span>Pelajari Detail</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;
    projectsGrid.appendChild(card);
  });
}

function initProjectFiltering() {
  const projectTabs = document.querySelectorAll('.project-tab');
  projectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      projectTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderProjects(tab.getAttribute('data-filter'));
    });
  });
}

// Contact Form Handler
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Mengirim...</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();
      showToast('Pesan Anda berhasil terkirim! Saya akan merespon secepatnya. 🚀');
    }, 1200);
  });
}

// Modals Setup
function initModals() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const cvModal = document.getElementById('cvModal');
  const cvCloseBtn = document.getElementById('cvModalCloseBtn');
  const downloadCvBtn = document.getElementById('downloadCvBtn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  if (downloadCvBtn && cvModal) {
    downloadCvBtn.addEventListener('click', () => cvModal.classList.add('active'));
  }

  if (cvCloseBtn && cvModal) {
    cvCloseBtn.addEventListener('click', () => cvModal.classList.remove('active'));
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) cvModal.classList.remove('active');
    });
  }
}

function openProjectModal(id) {
  const project = projectsData.find(p => p.id === id);
  if (!project) return;

  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');

  const tagsHtml = project.tags.map(t => `<span class="tag">${t}</span>`).join('');
  const featuresHtml = project.features.map(f => `<li><i class="fa-solid fa-check" style="color: var(--accent-primary);"></i> ${f}</li>`).join('');

  modalBody.innerHTML = `
    <div style="background: ${project.gradient}; padding: 2.5rem; border-radius: var(--radius-md); text-align: center; margin-bottom: 1.5rem;">
      <i class="fa-solid ${project.icon}" style="font-size: 4rem; color: #ffffff;"></i>
    </div>
    <div class="project-tags" style="margin-bottom: 1rem;">${tagsHtml}</div>
    <h2 style="font-size: 1.6rem; color: var(--text-primary); margin-bottom: 0.8rem;">${project.title}</h2>
    <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">${project.longDesc}</p>
    
    <div style="background: var(--bg-card); padding: 1.2rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; border: 1px solid var(--border-color);">
      <h4 style="font-size: 0.95rem; color: var(--accent-primary); margin-bottom: 0.8rem;">Fitur Utama:</h4>
      <ul style="display: flex; flex-direction: column; gap: 0.5rem;">${featuresHtml}</ul>
    </div>

    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <a href="${project.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary">
        <i class="fa-solid fa-arrow-up-right-from-square"></i> Demo Langsung
      </a>
      <a href="${project.githubUrl}" target="_blank" rel="noopener" class="btn btn-secondary">
        <i class="fa-brands fa-github"></i> Repository GitHub
      </a>
    </div>
  `;

  modal.classList.add('active');
}

function triggerCvDownload() {
  const cvModal = document.getElementById('cvModal');
  cvModal.classList.remove('active');
  
  showToast('Mengunduh CV Alex Pratama (PDF)...');
  
  // Simulate download file
  const element = document.createElement('a');
  const fileContent = "CURRICULUM VITAE - ALEX PRATAMA\n\nFull Stack Web Developer & UI/UX Specialist\nEmail: alex.pratama.dev@example.com\nWebsite: https://alex-pratama.dev\n\nExperience:\n- Senior Frontend Developer at PT Tech Innovate Indonesia (2023 - Present)\n- Full Stack Web Developer at Digital Agency Nusantara (2021 - 2023)\n\nEducation:\n- S1 Teknik Informatika, Universitas Bina Nusantara (2018 - 2022)";
  const file = new Blob([fileContent], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = "CV_Alex_Pratama.txt";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// Scroll Top Button
function initScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Copy Email Utility
function copyEmail(email) {
  navigator.clipboard.writeText(email).then(() => {
    showToast(`Email ${email} berhasil disalin! 📋`);
  }).catch(() => {
    showToast('Gagal menyalin email.');
  });
}

// Toast Helper
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.innerHTML = `<i class="fa-solid fa-circle-info" style="color: var(--accent-primary);"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Set Current Year in Footer
function setCurrentYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
