/* Personal Site Interactions */
(function () {
  'use strict';

  const sidebar = document.getElementById('sidebar');
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('overlay');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('main .section');
  const cursor = document.querySelector('.cursor');

  function openSidebar() {
    if (!sidebar || !hamburger || !overlay) return;
    sidebar.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (!sidebar || !hamburger || !overlay) return;
    sidebar.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  function toggleSidebar() {
    if (!sidebar) return;
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  }

  hamburger?.addEventListener('click', toggleSidebar);
  overlay?.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sidebar?.classList.contains('open')) {
      closeSidebar();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 767) closeSidebar();
    });
  });

  function setActiveLink(id) {
    if (!id) return;
    navLinks.forEach((link) => link.classList.remove('active'));
    document.querySelector(`.nav-link[href="#${id}"]`)?.classList.add('active');
  }

  function getActiveSection() {
    let activeSection = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    sections.forEach((section) => {
      const distance = Math.abs(section.getBoundingClientRect().top - 80);
      if (distance < closestDistance) {
        closestDistance = distance;
        activeSection = section;
      }
    });

    return activeSection;
  }

  let ticking = false;

  function onScroll() {
    if (ticking) return;
    window.requestAnimationFrame(() => {
      const active = getActiveSection();
      if (active) setActiveLink(active.id);
      ticking = false;
    });
    ticking = true;
  }

  window.addEventListener('scroll', onScroll);
  window.addEventListener('load', () => setActiveLink('home'));

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 767) closeSidebar();
    }, 100);
  });

  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    function animateCursor() {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      cursor.style.left = `${currentX}px`;
      cursor.style.top = `${currentY}px`;
      requestAnimationFrame(animateCursor);
    }

    animateCursor();
  }
})();
