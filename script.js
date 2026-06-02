/* ============================================================
   script.js — Personal Site Interactions
   ============================================================ */
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});
(function () {
  'use strict';

  /* ── Elements ── */
  const sidebar    = document.getElementById('sidebar');
  const hamburger  = document.getElementById('hamburger');
  const overlay    = document.getElementById('overlay');
  const navLinks   = document.querySelectorAll('.nav-link[href^="#"]');
  const sections   = document.querySelectorAll('main .section');

  /* ============================================================
     1. HAMBURGER — open / close sidebar on mobile
     ============================================================ */
  function openSidebar() {
    sidebar.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  function toggleSidebar() {
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleSidebar);
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

  /* ============================================================
     2. CLOSE SIDEBAR on nav click (mobile only)
     ============================================================ */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 767) {
        closeSidebar();
      }
    });
  });

  /* ============================================================
     3. ACTIVE NAV LINK — scroll spy
     ============================================================ */

 function setActiveLink(id) {
  if (!id) return;

  navLinks.forEach(link => link.classList.remove('active'));

  const target = document.querySelector(`.nav-link[href="#${id}"]`);
  if (target) target.classList.add('active');
}

function getActiveSection() {
  let bestSection = null;
  let bestScore = Infinity;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();

    // distance from top of viewport (0 is ideal)
    const score = Math.abs(rect.top);

    if (score < bestScore) {
      bestScore = score;
      bestSection = section;
    }
  });

  return bestSection;
}

/* Throttle via rAF to prevent stepping through all sections */
let ticking = false;

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const active = getActiveSection();
      if (active) setActiveLink(active.id);
      ticking = false;
    });

    ticking = true;
  }
}

window.addEventListener('scroll', onScroll);

/* init */
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  setActiveLink('home');
});

  /* ============================================================
     4. RESIZE — reset sidebar on desktop
     ============================================================ */
  let resizeTimer;

  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 767) {
        sidebar.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        overlay.classList.remove('visible');
        document.body.style.overflow = '';
      }
    }, 100);
  });

})();

/* ============================================================
   5. CUSTOM CURSOR
   ============================================================ */

const cursor = document.querySelector('.cursor');

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  currentX += (mouseX - currentX) * 0.12;
  currentY += (mouseY - currentY) * 0.12;

  cursor.style.left = `${currentX}px`;
  cursor.style.top = `${currentY}px`;

  requestAnimationFrame(animateCursor);
}

animateCursor();