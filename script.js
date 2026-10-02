// Header scroll state
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.style.display === 'flex';
    nav.style.display = isOpen ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '72px';
    nav.style.right = '4%';
    nav.style.background = 'var(--white)';
    nav.style.padding = '1.2rem';
    nav.style.borderRadius = '12px';
    nav.style.boxShadow = 'var(--shadow-hover)';
    nav.style.gap = '1rem';
  });
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

let gallery = [];
let currentIndex = 0;

function collectImages() {
  gallery = [];
  const heroImg = document.querySelector('.hero-photo img');
  if (heroImg) {
    gallery.push({ src: heroImg.src, alt: heroImg.alt || '' });
  }
  document.querySelectorAll('.img-wrap img').forEach(img => {
    gallery.push({ src: img.src, alt: img.alt || '' });
  });
}

function openLightbox(index) {
  collectImages();
  currentIndex = index;
  lightboxImg.src = gallery[currentIndex].src;
  lightboxImg.alt = gallery[currentIndex].alt;
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
  lightboxImg.src = gallery[currentIndex].src;
  lightboxImg.alt = gallery[currentIndex].alt;
}

function showNext() {
  currentIndex = (currentIndex + 1) % gallery.length;
  lightboxImg.src = gallery[currentIndex].src;
  lightboxImg.alt = gallery[currentIndex].alt;
}

// Click on work images
document.querySelectorAll('.img-wrap').forEach((wrap, i) => {
  wrap.addEventListener('click', () => {
    const heroExists = document.querySelector('.hero-photo img') ? 1 : 0;
    openLightbox(i + heroExists);
  });
});

// Click on hero photo
const heroPhoto = document.querySelector('.hero-photo');
if (heroPhoto) {
  heroPhoto.addEventListener('click', () => {
    openLightbox(0);
  });
}

closeBtn.addEventListener('click', closeLightbox);

prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  showPrev();
});

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  showNext();
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
});
