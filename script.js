/* =========================================
   MADRAS DRIVEN — script.js
   Cinematic Premium Edition
   ========================================= */

// ---- PAGE LOADER ----
const loader = document.createElement('div');
loader.className = 'page-loader';
loader.innerHTML = `
  <div class="loader-logo">MADRAS<span>DRIVEN</span></div>
  <div class="loader-bar-wrap"><div class="loader-bar"></div></div>
`;
document.body.prepend(loader);

window.addEventListener('load', () => {
  setTimeout(() => loader.classList.add('hide'), 1500);
});

// ---- CUSTOM CURSOR ----
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

if (cursor && cursorRing) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Smooth ring follow with lerp
  function lerpCursor() {
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(lerpCursor);
  }
  lerpCursor();

  document.querySelectorAll('a, button, .event-card, .merch-item, .pillar, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('active'); cursorRing.classList.add('active'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('active'); cursorRing.classList.remove('active'); });
  });
}

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ---- MOBILE NAV ----
const hamburger = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobileNav');
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

// ---- HERO VIDEO MUTE TOGGLE ----
const heroVideo   = document.getElementById('heroVideo');
const videoToggle = document.getElementById('videoToggle');
const iconMuted   = document.getElementById('iconMuted');
const iconUnmuted = document.getElementById('iconUnmuted');
if (videoToggle && heroVideo) {
  videoToggle.addEventListener('click', () => {
    heroVideo.muted = !heroVideo.muted;
    iconMuted.style.display   = heroVideo.muted ? 'block' : 'none';
    iconUnmuted.style.display = heroVideo.muted ? 'none'  : 'block';
  });
}

// ---- UNIVERSAL SCROLL REVEAL ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger, .reveal-line, .section-label'
).forEach(el => revealObserver.observe(el));

// Add reveal classes automatically to key elements
document.querySelectorAll('.event-card').forEach((el, i) => {
  el.classList.add('reveal-scale');
  el.style.transitionDelay = `${i * 0.1}s`;
  revealObserver.observe(el);
});
document.querySelectorAll('.exp-item').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.08}s`;
  revealObserver.observe(el);
});
document.querySelectorAll('.community-card').forEach((el, i) => {
  el.classList.add('reveal-scale');
  el.style.transitionDelay = `${i * 0.12}s`;
  revealObserver.observe(el);
});
document.querySelectorAll('.gallery-item').forEach((el, i) => {
  el.classList.add('reveal-scale');
  el.style.transitionDelay = `${i * 0.06}s`;
  revealObserver.observe(el);
});
document.querySelectorAll('.pillar').forEach((el, i) => {
  el.classList.add('reveal-left');
  el.style.transitionDelay = `${i * 0.1}s`;
  revealObserver.observe(el);
});
document.querySelectorAll('.about-left').forEach(el => {
  el.classList.add('reveal-left');
  revealObserver.observe(el);
});
document.querySelectorAll('.about-right').forEach(el => {
  el.classList.add('reveal-right');
  revealObserver.observe(el);
});
document.querySelectorAll('.merch-inner').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});
document.querySelectorAll('section').forEach(el => {
  revealObserver.observe(el);
});

// ---- COUNT-UP NUMBERS ----
function animateCountUp(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target.toLocaleString(); clearInterval(timer); }
    else el.textContent = Math.floor(start).toLocaleString();
  }, 16);
}

let numbersAnimated = false;
const numbersSection = document.getElementById('numbers');
if (numbersSection) {
  new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !numbersAnimated) {
      numbersAnimated = true;
      document.querySelectorAll('.number-val[data-target]').forEach(el => {
        animateCountUp(el, parseInt(el.dataset.target, 10));
      });
    }
  }, { threshold: 0.3 }).observe(numbersSection);
}

// ---- GALLERY LIGHTBOX ----
const galleryItems  = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev  = document.getElementById('lightboxPrev');
const lightboxNext  = document.getElementById('lightboxNext');
let currentIndex    = 0;

function getImages() {
  return galleryItems
    .map(item => item.querySelector('img'))
    .filter(img => img && img.naturalWidth > 0);
}
function openLightbox(index) {
  const imgs = getImages();
  if (!imgs.length) return;
  currentIndex = index;
  lightboxImg.src = imgs[currentIndex].src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}
function showPrev() {
  const imgs = getImages();
  currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
  lightboxImg.src = imgs[currentIndex].src;
}
function showNext() {
  const imgs = getImages();
  currentIndex = (currentIndex + 1) % imgs.length;
  lightboxImg.src = imgs[currentIndex].src;
}
galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => {
    const imgs = getImages();
    const img  = item.querySelector('img');
    const idx  = imgs.indexOf(img);
    if (idx >= 0) openLightbox(idx);
  });
});
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxPrev)  lightboxPrev.addEventListener('click', showPrev);
if (lightboxNext)  lightboxNext.addEventListener('click', showNext);
if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if (!lightbox?.classList.contains('active')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  showPrev();
  if (e.key === 'ArrowRight') showNext();
});

// ---- NEWSLETTER ----
function subscribeNewsletter() {
  const input = document.getElementById('emailInput');
  const msg   = document.getElementById('newsletterMsg');
  const email = input.value.trim();
  if (!email || !email.includes('@') || !email.includes('.')) {
    msg.textContent = '⚠ Please enter a valid email address.';
    msg.style.color = '#ff5500'; return;
  }
  msg.textContent = "✔ You're in! Welcome to the Madras Driven family.";
  msg.style.color = '#e8190a';
  input.value = '';
  setTimeout(() => { msg.textContent = 'No spam. Just car culture. Unsubscribe anytime.'; msg.style.color = ''; }, 4000);
}
document.getElementById('emailInput')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') subscribeNewsletter();
});

// ---- ACTIVE NAV HIGHLIGHT ----
const allSections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  allSections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  allNavLinks.forEach(a => { a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--white)' : ''; });
}, { passive: true });

// ---- CINEMATIC HERO PARALLAX ----
const heroGrid    = document.querySelector('.hero-grid');
const heroContent = document.querySelector('.hero-content');
const heroVid     = document.querySelector('.hero-video-wrap');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight) {
    if (heroGrid)    heroGrid.style.transform    = `translateY(${y * 0.2}px)`;
    if (heroVid)     heroVid.style.transform     = `translateY(${y * 0.15}px)`;
    if (heroContent) heroContent.style.transform = `translateY(${y * 0.08}px)`;
  }
}, { passive: true });

// ---- MAGNETIC BUTTON EFFECT ----
document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});
