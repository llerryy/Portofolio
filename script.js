/* =========================================================
   Portfolio — Vincencius Ferly Cristiawan
   Interaksi: active-state nav saat scroll + reveal on-scroll
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- 1. Tandai link nav aktif sesuai section yang sedang dilihat ---- */
  const navLinks = document.querySelectorAll('.tb-nav a');
  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActiveLink = () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120; // offset untuk nav sticky

    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${currentId}`;
      link.style.color = isActive ? 'var(--cyan)' : '';
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ---- 2. Reveal halus saat elemen masuk viewport ---- */
  const revealTargets = document.querySelectorAll(
    '.frame, .about-grid-v2 > *, .feature-card, .skill-groups > *, .contact-title, .contact-sub'
  );

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    revealTargets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => observer.observe(el));
  }

  /* ---- 3. Koordinat di hero, sekadar detail kecil bergaya "live" ---- */
  const coordEl = document.querySelector('.coord');
  if (coordEl) {
    const baseText = coordEl.textContent;
    coordEl.setAttribute('title', 'Lokasi berbasis kota domisili');
    coordEl.textContent = baseText;
  }

});
