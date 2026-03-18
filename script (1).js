/* =========================================
   MADRAS DRIVEN — script.js
   ========================================= */

// ---- CUSTOM CURSOR ----
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

if (cursor && cursorRing) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    setTimeout(() => {
      cursorRing.style.left = e.clientX + 'px';
      cursorRing.style.top  = e.clientY + 'px';
    }, 60);
  });

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
const heroVideo    = document.getElementById('heroVideo');
const videoToggle  = document.getElementById('videoToggle');
const iconMuted    = document.getElementById('iconMuted');
const iconUnmuted  = document.getElementById('iconUnmuted');

if (videoToggle && heroVideo) {
  videoToggle.addEventListener('click', () => {
    heroVideo.muted = !heroVideo.muted;
    iconMuted.style.display   = heroVideo.muted ? 'block' : 'none';
    iconUnmuted.style.display = heroVideo.muted ? 'none'  : 'block';
  });
}

// ---- SCROLL REVEAL ----
document.querySelectorAll('section, .event-card, .exp-item, .community-card, .pillar, .merch-inner, #numbers, .gallery-item')
  .forEach(el => el.classList.add('reveal'));

new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' })
.observe = (() => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  return obs.observe.bind(obs);
})();

// ---- COUNT-UP NUMBERS ----
function animateCountUp(el, target, duration = 1600) {
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
const galleryItems  = Array.from(document.querySelectorAll('.gallery-item:not(.no-img)'));
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev  = document.getElementById('lightboxPrev');
const lightboxNext  = document.getElementById('lightboxNext');
let currentIndex    = 0;

function getImages() {
  // Only items that have loaded images
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

// Attach click to each gallery item
galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => {
    // Find index among only loaded images
    const imgs = getImages();
    const img  = item.querySelector('img');
    const idx  = imgs.indexOf(img);
    if (idx >= 0) openLightbox(idx);
  });
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxPrev)  lightboxPrev.addEventListener('click',  showPrev);
if (lightboxNext)  lightboxNext.addEventListener('click',  showNext);

// Close on backdrop click
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox || !lightbox.classList.contains('active')) return;
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
    msg.style.color = '#ff5500';
    return;
  }
  // 👉 Replace this block with Formspree / Netlify Forms / EmailJS in production
  msg.textContent = '✔ You\'re in! Welcome to the Madras Driven family.';
  msg.style.color = '#e8190a';
  input.value = '';
  setTimeout(() => { msg.textContent = 'No spam. Just car culture. Unsubscribe anytime.'; msg.style.color = ''; }, 4000);
}

document.getElementById('emailInput')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') subscribeNewsletter();
});

// ---- ACTIVE NAV HIGHLIGHT ----
const allSections  = document.querySelectorAll('section[id]');
const allNavLinks  = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  allSections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  allNavLinks.forEach(a => { a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--white)' : ''; });
}, { passive: true });

// ---- HERO GRID PARALLAX ----
const heroGrid = document.querySelector('.hero-grid');
window.addEventListener('scroll', () => {
  if (heroGrid && window.scrollY < window.innerHeight)
    heroGrid.style.transform = `translateY(${window.scrollY * 0.25}px)`;
}, { passive: true });
