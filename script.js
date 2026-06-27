/* ═══════════════════════════════════════════
   PREMIUM USED POWER BANKS — Pro JS
   ═══════════════════════════════════════════ */

// ─── Scroll reveal ───
document.querySelectorAll('[data-reveal]').forEach(el => {
  const o = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { e.target.classList.add('visible'); o.unobserve(e.target) }
  }, { threshold: .15 })
  o.observe(el)
})

// ─── Animated counters ───
document.querySelectorAll('[data-count]').forEach(el => {
  const target = parseInt(el.dataset.count)
  if (isNaN(target)) return
  const o = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return
    const dur = 1800, start = performance.now()
    const step = t => {
      const p = Math.min((t - start) / dur, 1)
      el.textContent = target > 999
        ? Math.round(p * target).toLocaleString() + '+'
        : Math.round(p * target) + '%'
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
    o.unobserve(el)
  }, { threshold: .4 })
  o.observe(el)
})

// ─── Hero parallax ───
const heroBg = document.querySelector('.hero__bg')
addEventListener('scroll', () => {
  const y = window.scrollY
  if (heroBg) heroBg.style.transform = `translateY(${y * 0.35}px) scale(1.15)`
})

console.log('⚡ Premium Power Banks — Pro loaded')
