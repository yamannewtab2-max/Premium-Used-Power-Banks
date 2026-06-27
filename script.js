/* ==============================
   PREMIUM USED POWER BANKS — JS
   ============================== */

'use strict';

// ─── Scroll-triggered reveal (Intersection Observer) ───
const revealEls = document.querySelectorAll('[data-fade], [data-slide], [data-scale]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // don't unobserve so they stay visible once triggered
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px',
});

revealEls.forEach((el) => observer.observe(el));

// ─── Hero parallax on scroll ───
const heroBg = document.querySelector('.hero-bg');
const hero = document.querySelector('.hero');
const featuresBg = document.querySelector('.features-bg-parallax');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroH = hero?.offsetHeight || 1;

  // Hero background parallax (slow upward movement)
  if (heroBg) {
    const translateY = scrollY * 0.45;
    heroBg.style.transform = `translateY(${translateY}px) scale(1.1)`;
  }

  // Features background parallax
  if (featuresBg) {
    const featTop = featuresBg.parentElement?.offsetTop || 0;
    const relY = Math.max(0, scrollY - featTop);
    featuresBg.style.transform = `translateY(${relY * 0.3}px) scale(1.2)`;
  }

  // Hero content fade-out on deep scroll
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    const progress = Math.min(scrollY / heroH, 0.7);
    heroContent.style.opacity = 1 - progress;
    heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
  }
});

// ─── Animated counter (stat numbers) ───
const statEls = document.querySelectorAll('[data-count]');

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    if (isNaN(target)) return;

    let current = 0;
    const duration = 2000; // ms
    const step = Math.max(1, Math.floor(target / 80));
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.round(eased * target);
      if (target > 999) {
        el.textContent = current.toLocaleString() + '+';
      } else {
        el.textContent = current + '%';
      }
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target > 999
          ? target.toLocaleString() + '+'
          : target + '%';
      }
    }
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });

statEls.forEach((el) => countObserver.observe(el));

// ─── Smooth reveal by splitting hero title letters (optional) ───
// Just a nice touch — not splitting into spans, keeping it clean
// but adding a subtle entrance via the existing fade + a class on body

// ─── Mouse-tracking tilt on feature cards (desktop) ───
const cards = document.querySelectorAll('.feature-card, .product-card, .testimonial-card');

cards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ─── Parallax on mouse move in hero ───
if (hero && heroBg) {
  hero.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    heroBg.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
  });
}

console.log('✨ Premium Used Power Banks — loaded');
