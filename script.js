// ═══ Hero parallax ═══
const heroBg = document.querySelector('.hero__bg')
addEventListener('scroll', () => {
  if (heroBg) heroBg.style.transform = `translateY(${window.scrollY * 0.35}px) scale(1.15)`
})
