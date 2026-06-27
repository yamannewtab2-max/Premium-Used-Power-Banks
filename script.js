/* ═══════════════════════════════════════════
   PREMIUM USED POWER BANKS — 2-Step
   ═══════════════════════════════════════════ */

// ─── Hero parallax ───
const heroBg = document.querySelector('.hero__bg')
addEventListener('scroll', () => {
  const y = window.scrollY
  if (heroBg) heroBg.style.transform = `translateY(${y * 0.35}px) scale(1.15)`
})

console.log('⚡ Premium Power Banks — 2-step loaded')
