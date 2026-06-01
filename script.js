/* ============================================================
   script.js — Personal Site Interactions
   ============================================================ */

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
    document.body.style.overflow = 'hidden'; // prevent background scroll
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

  /* Close sidebar when pressing Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

  /* ============================================================
     2. CLOSE SIDEBAR when a nav link is tapped (mobile)
     ============================================================ */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      // Only close if the sidebar is in drawer mode (mobile)
      if (window.innerWidth <= 767) {
        closeSidebar();
      }
    });
  });

  /* ============================================================
     3. ACTIVE NAV LINK — highlights as user scrolls
     ============================================================ */
  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + id) {
        link.classList.add('active');
      }
    });
  }

  /* Use IntersectionObserver for scroll tracking */
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      // Fire when the top 30% of a section enters the viewport
      rootMargin: '0px 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ============================================================
     4. RESIZE — reset sidebar state when resizing to desktop
     ============================================================ */
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 767) {
        // Ensure sidebar is visible and body scroll is restored
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