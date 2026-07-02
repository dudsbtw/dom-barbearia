/* ================================================
   DOM BARBEARIA — main.js
   ================================================
   1. Nav: scroll + mobile
   2. Scroll reveal
   3. Active link
   4. Lightbox com navegação
   5. Formulário ilustrativo
   6. Botões ilustrativos (mobile)
   ================================================ */


/* ─── 1. NAV ──────────────────────────────────── */

const nav       = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

const overlay = document.createElement('div');
overlay.classList.add('nav__overlay');
document.body.appendChild(overlay);

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

nav.classList.toggle('scrolled', window.scrollY > 60);

function openMenu() {
  navToggle.classList.add('open');
  navLinks.classList.add('open');
  overlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
  navToggle.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  navToggle.classList.remove('open');
  navLinks.classList.remove('open');
  overlay.classList.remove('visible');
  document.body.style.overflow = '';
  navToggle.setAttribute('aria-expanded', 'false');
}

navToggle.addEventListener('click', () => {
  navLinks.classList.contains('open') ? closeMenu() : openMenu();
});

navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
overlay.addEventListener('click', closeMenu);
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); closeLightbox(); } });


/* ─── 2. SCROLL REVEAL ────────────────────────── */

const revealObserver = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  }),
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ─── 3. ACTIVE LINK ──────────────────────────── */

const sections    = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav__links a[href^="#"]');

new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      allNavLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  }),
  { threshold: 0.4 }
).observe && sections.forEach(s => {
  new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        allNavLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    }),
    { threshold: 0.4 }
  ).observe(s);
});


/* ─── 4. LIGHTBOX ─────────────────────────────── */

const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

// Coleta todos os itens de galeria em ordem
const galeriaItems = Array.from(document.querySelectorAll('.galeria__item[data-src]'));
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const item = galeriaItems[currentIndex];
  lightboxImg.src = item.dataset.src;
  lightboxImg.alt = item.dataset.alt || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galeriaItems.length) % galeriaItems.length;
  lightboxImg.style.opacity = '0';
  setTimeout(() => {
    lightboxImg.src = galeriaItems[currentIndex].dataset.src;
    lightboxImg.alt = galeriaItems[currentIndex].dataset.alt || '';
    lightboxImg.style.opacity = '1';
  }, 150);
}

function showNext() {
  currentIndex = (currentIndex + 1) % galeriaItems.length;
  lightboxImg.style.opacity = '0';
  setTimeout(() => {
    lightboxImg.src = galeriaItems[currentIndex].dataset.src;
    lightboxImg.alt = galeriaItems[currentIndex].dataset.alt || '';
    lightboxImg.style.opacity = '1';
  }, 150);
}

// Abre ao clicar nos itens
galeriaItems.forEach((item, index) => {
  item.addEventListener('click', () => openLightbox(index));
});

// Controles do lightbox
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);

// Fecha ao clicar no fundo (fora da imagem)
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

// Navegação por teclado
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'ArrowLeft')  showPrev();
  if (e.key === 'ArrowRight') showNext();
});


/* ─── 5. FORMULÁRIO ILUSTRATIVO ───────────────── */

const form     = document.getElementById('agendamentoForm');
const feedback = document.getElementById('formFeedback');

if (form && feedback) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    feedback.textContent = '⚠ Formulário meramente ilustrativo — os dados não são enviados.';
  });
}


/* ─── 6. TOOLTIP NO CLIQUE (botões ilustrativos) ─ */

let tipTimer = null;

document.querySelectorAll('.ilustrativo-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ilustrativo-btn.tip-on').forEach(b => b.classList.remove('tip-on'));
    clearTimeout(tipTimer);
    btn.classList.add('tip-on');
    tipTimer = setTimeout(() => btn.classList.remove('tip-on'), 2500);
  });
});