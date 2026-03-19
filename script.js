/* =========================================
   MADRAS DRIVEN — script.js CRAZY EDITION
   ========================================= */

// ---- SPLIT SCREEN LOADER ----
const splitLoader = document.createElement('div');
splitLoader.className = 'split-loader';
splitLoader.innerHTML = `
  <div class="split-top"></div>
  <div class="split-bottom"></div>
  <div class="split-loader-line"></div>
  <div class="split-loader-logo">MADRAS<span>DRIVEN</span></div>
`;
document.body.prepend(splitLoader);
document.body.style.overflow = 'hidden';
setTimeout(() => splitLoader.classList.add('open'), 600);
setTimeout(() => {
  document.body.style.overflow = '';
  splitLoader.style.pointerEvents = 'none';
  setTimeout(() => splitLoader.remove(), 500);
}, 1800);

// ---- GLITCH LOGO ----
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
  navLogo.setAttribute('data-text', navLogo.textContent);
  setInterval(() => {
    navLogo.classList.add('auto-glitch');
    setTimeout(() => navLogo.classList.remove('auto-glitch'), 600);
  }, 5000);
}

// ---- FIRE CURSOR TRAIL ----
const fireColors = ['#ff2200','#ff5500','#ff8800','#ffaa00','#ffcc00','#fff200','#ff4400','#e8190a'];
let lastX = 0, lastY = 0;

document.addEventListener('mousemove', (e) => {
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  const speed = Math.sqrt(dx * dx + dy * dy);
  lastX = e.clientX;
  lastY = e.clientY;
  if (speed < 2) return;
  const count = Math.min(4, Math.floor(speed / 8) + 1);
  for (let i = 0; i < count; i++) spawnFire(e.clientX, e.clientY);
});

function spawnFire(x, y) {
  const p = document.createElement('div');
  p.className = 'fire-particle';
  const size  = Math.random() * 14 + 6;
  const color = fireColors[Math.floor(Math.random() * fireColors.length)];
  const dur   = Math.random() * 400 + 300;
  const spread = (Math.random() - 0.5) * 20;
  p.style.cssText = `
    left:${x + spread}px; top:${y + spread}px;
    width:${size}px; height:${size}px;
    background:radial-gradient(circle,${color} 0%,transparent 70%);
    animation-duration:${dur}ms;
    filter:blur(${Math.random() * 3 + 1}px);
  `;
  document.body.appendChild(p);
  setTimeout(() => p.remove(), dur);
}

// ---- CUSTOM CURSOR ----
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

if (cursor && cursorRing) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });
  function lerpCursor() {
    ringX += (mouseX - ringX
