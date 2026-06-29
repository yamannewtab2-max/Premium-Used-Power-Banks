// ═══ HERO PARALLAX ═══
const heroBg = document.querySelector('.hero__bg')
addEventListener('scroll', () => {
  if (heroBg) {
    const scrolled = window.scrollY
    const maxScroll = window.innerHeight
    // Scale effect - image subtly enlarges as you scroll down
    const scale = 1.1 + (scrolled / maxScroll) * 0.15
    heroBg.style.transform = `scale(${Math.min(scale, 1.4)})`
  }
})

// ═══ SCROLL REVEAL ANIMATIONS ═══
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed')
      revealObserver.unobserve(entry.target) // only animate once
    }
  })
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
})

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el))

// ═══ COUNTER ANIMATION ═══
function animateCounter(el, target, duration = 2000) {
  const start = performance.now()
  const suffix = el.dataset.suffix || ''
  
  function formatNum(n) {
    return n.toLocaleString('en-US')
  }
  
  function update(now) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = Math.round(eased * target)
    
    el.textContent = formatNum(current) + suffix
    
    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      el.textContent = formatNum(target) + suffix
    }
  }
  requestAnimationFrame(update)
}

// Observe stats for counter animation
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target
      const target = parseInt(el.dataset.target)
      if (!isNaN(target)) {
        animateCounter(el, target)
      }
      statObserver.unobserve(el)
    }
  })
}, { threshold: 0.5 })

document.querySelectorAll('.about__stat-num:not([data-no-count])').forEach(el => {
  // Store original text as target value
  const text = el.textContent.trim()
  // Parse numeric value (handle K, +, % etc)
  const cleaned = text.replace(/[^0-9.]/g, '')
  const target = parseFloat(cleaned)
  if (!isNaN(target)) {
    // Store suffix (everything after the number, e.g. "+", "%", "K+")
    const suffix = text.replace(/[0-9.,]/g, '')
    el.dataset.target = target
    el.dataset.suffix = suffix
    // Start from 0
    el.textContent = '0' + suffix
    statObserver.observe(el)
  }
})

// ═══ COMING SOON MODAL ═══
function openComingSoon() {
  document.getElementById('comingSoonModal').classList.add('active')
  document.body.style.overflow = 'hidden'
}
function closeComingSoon(e) {
  if (e && e.target !== e.currentTarget) return // only close when clicking overlay or close btn directly
  document.getElementById('comingSoonModal').classList.remove('active')
  document.body.style.overflow = ''
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('comingSoonModal')
    if (modal.classList.contains('active')) {
      modal.classList.remove('active')
      document.body.style.overflow = ''
    }
  }
})


