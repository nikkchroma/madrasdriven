/* =========================================
   MADRAS DRIVEN — script.js
   ========================================= */

// ---- CUSTOM CURSOR ----
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

if (cursor && cursorRing) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';

    // Slightly delayed ring
    setTimeout(() => {
      cursorRing.style.left = e.clientX + 'px';
      cursorRing.style.top  = e.clientY + 'px';
    }, 60);
  });

  // Grow cursor on interactive elements
  const interactives = document.querySelectorAll('a, button, .event-card, .merch-item, .pillar');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
      cursorRing.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
      cursorRing.classList.remove('active');
    });
  });
}

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ---- MOBILE NAV ----
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

function closeMobileNav() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

// ---- SCROLL REVEAL ----
const revealElements = document.querySelectorAll(
  'section, .event-card, .exp-item, .community-card, .pillar, .merch-inner, #numbers'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ---- COUNT-UP NUMBERS ----
function animateCountUp(el, target, duration = 1600) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start).toLocaleString();
    }
  }, 16);
}

const numberEls = document.querySelectorAll('.number-val[data-target]');
let numbersAnimated = false;

const numberObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !numbersAnimated) {
    numbersAnimated = true;
    numberEls.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      animateCountUp(el, target);
    });
  }
}, { threshold: 0.3 });

const numbersSection = document.getElementById('numbers');
if (numbersSection) numberObserver.observe(numbersSection);

// ---- NEWSLETTER SUBSCRIBE ----
function subscribeNewsletter() {
  const input = document.getElementById('emailInput');
  const msg = document.getElementById('newsletterMsg');
  const email = input.value.trim();

  if (!email || !email.includes('@') || !email.includes('.')) {
    msg.textContent = '⚠ Please enter a valid email address.';
    msg.style.color = '#ff5500';
    return;
  }

  // In production: replace with your form endpoint (Formspree, Netlify, etc.)
  msg.textContent = '✔ You\'re in! Welcome to the Madras Driven community.';
  msg.style.color = '#e8190a';
  input.value = '';

  setTimeout(() => {
    msg.textContent = 'No spam. Just car culture. Unsubscribe anytime.';
    msg.style.color = '';
  }, 4000);
}

// Allow Enter key on newsletter input
const emailInput = document.getElementById('emailInput');
if (emailInput) {
  emailInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') subscribeNewsletter();
  });
}

// ---- SMOOTH ACTIVE NAV HIGHLIGHTING ----
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinksAll.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--white)';
    }
  });
}, { passive: true });

// ---- HERO PARALLAX (subtle) ----
const heroGrid = document.querySelector('.hero-grid');
window.addEventListener('scroll', () => {
  if (heroGrid && window.scrollY < window.innerHeight) {
    heroGrid.style.transform = `translateY(calc(${window.scrollY * 0.3}px))`;
  }
}, { passive: true });
