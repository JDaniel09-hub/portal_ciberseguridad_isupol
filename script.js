const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const navLinks = Array.from(document.querySelectorAll('.nav-link'));

function setActiveLink() {
  const sections = navLinks
    .map((link) => document.getElementById(link.getAttribute('href').replace('#', '')))
    .filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', active);
      });
    });
  }, { rootMargin: '-10% 0px -80% 0px', threshold: 0.2 });

  sections.forEach((section) => observer.observe(section));
}

if (navLinks.length > 0) {
  setActiveLink();
}

const animatedItems = Array.from(document.querySelectorAll('[data-animate]'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  animatedItems.forEach((item) => observer.observe(item));
} else {
  animatedItems.forEach((item) => item.classList.add('visible'));
}

const toggleButtons = Array.from(document.querySelectorAll('.toggle-details'));

toggleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const details = button.nextElementSibling;
    if (!details) return;

    details.classList.toggle('active');

    if (details.classList.contains('active')) {
      button.querySelector('span').textContent = 'Ocultar detalle';
    } else {
      button.querySelector('span').textContent = 'Ver detalle';
    }
  });
});

const scanButton = document.querySelector('.js-scan');

if (scanButton) {
  scanButton.addEventListener('click', () => {
    const heroVisual = document.querySelector('.security-panel');
    if (!heroVisual) return;

    heroVisual.animate([
      { transform: 'scale(1)', boxShadow: '0 0 0 rgba(105, 210, 255, 0)' },
      { transform: 'scale(1.025)', boxShadow: '0 0 30px rgba(105, 210, 255, 0.4)' },
      { transform: 'scale(1)', boxShadow: '0 0 0 rgba(105, 210, 255, 0)' }
    ], { duration: 700, iterations: 1, easing: 'ease-out' });
  });
}
