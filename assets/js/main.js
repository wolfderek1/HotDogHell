/* ============================================================
   HOT DOG HELL — Main JavaScript
   ============================================================ */

'use strict';

// ── NAVBAR SCROLL ──────────────────────────────────────────
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

// ── SET ACTIVE NAV LINK ────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ── MOBILE NAV ─────────────────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── FLAME PARTICLES ────────────────────────────────────────
function createFlameParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const colors = ['rgba(232,93,4,', 'rgba(204,17,0,', 'rgba(244,115,26,', 'rgba(244,166,35,'];

  for (let i = 0; i < 18; i++) {
    const particle = document.createElement('div');
    particle.className = 'flame-particle';

    const size = Math.random() * 40 + 10;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const opacity = Math.random() * 0.3 + 0.1;
    const left = Math.random() * 100;
    const duration = Math.random() * 6 + 5;
    const delay = Math.random() * 5;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size * 1.4}px;
      background: ${color}${opacity});
      left: ${left}%;
      bottom: -${size * 2}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      filter: blur(${size * 0.3}px);
    `;

    hero.querySelector('.hero-bg').appendChild(particle);
  }
}

// ── INTERSECTION OBSERVER (fade-up animations) ─────────────
const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up, .stagger-children').forEach(el => {
  observer.observe(el);
});

// ── MODAL ──────────────────────────────────────────────────
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
    if (mobileNav && mobileNav.classList.contains('open')) {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
});

// Expose for inline onclick
window.openModal = openModal;
window.closeModal = closeModal;

// ── HEAT METER ─────────────────────────────────────────────
// Used in menu cards; data-heat="1-5"
document.querySelectorAll('[data-heat]').forEach(el => {
  const heat = parseInt(el.dataset.heat, 10);
  const total = 5;
  let html = '';
  for (let i = 1; i <= total; i++) {
    if (i <= heat && heat === 5 && i >= 4) {
      html += `<div class="heat-pip max"></div>`;
    } else if (i <= heat) {
      html += `<div class="heat-pip lit"></div>`;
    } else {
      html += `<div class="heat-pip"></div>`;
    }
  }
  el.innerHTML = html;
});

// ── COUNTDOWN (challenge page) ─────────────────────────────
function updateCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;

  // Next Saturday at noon as a placeholder
  const now = new Date();
  const nextSat = new Date(now);
  nextSat.setDate(now.getDate() + (6 - now.getDay() + 7) % 7 || 7);
  nextSat.setHours(11, 0, 0, 0);
  const diff = nextSat - now;

  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  el.innerHTML = `
    <span class="countdown-unit"><strong>${Math.floor(h/24)}</strong><em>DAYS</em></span>
    <span class="countdown-sep">:</span>
    <span class="countdown-unit"><strong>${h % 24}</strong><em>HRS</em></span>
    <span class="countdown-sep">:</span>
    <span class="countdown-unit"><strong>${String(m).padStart(2,'0')}</strong><em>MIN</em></span>
    <span class="countdown-sep">:</span>
    <span class="countdown-unit"><strong>${String(s).padStart(2,'0')}</strong><em>SEC</em></span>
  `;
}

if (document.getElementById('countdown')) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ── SMOOTH SCROLL on anchor links ─────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── INIT ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  createFlameParticles();

  // Trigger any hero content that's immediately visible
  setTimeout(() => {
    document.querySelectorAll('.fade-up, .stagger-children').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  }, 100);
});
