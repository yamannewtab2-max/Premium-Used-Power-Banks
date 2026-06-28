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
  
  function update(now) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = Math.round(eased * target)
    
    if (target >= 1000) {
      // Format with K suffix for large numbers
      el.textContent = (current >= 1000 ? (current / 1000).toFixed(1) : current.toString()) + suffix
    } else {
      el.textContent = current + suffix
    }
    
    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      if (target >= 1000) {
        el.textContent = (target / 1000).toFixed(1) + suffix
      } else {
        el.textContent = target + suffix
      }
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

document.querySelectorAll('.about__stat-num').forEach(el => {
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

// ═══ SMOOTH MOUSE PARALLAX ON HERO (desktop only) ═══
if (window.innerWidth > 768) {
  const hero = document.querySelector('.hero')
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = hero.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5
      
      const content = hero.querySelector('.hero__content')
      if (content) {
        content.style.transform = `translate(${x * 20}px, ${y * 20}px)`
      }
    })
    
    hero.addEventListener('mouseleave', () => {
      const content = hero.querySelector('.hero__content')
      if (content) {
        content.style.transform = 'translate(0, 0)'
        content.style.transition = 'transform 0.5s ease'
        setTimeout(() => { content.style.transition = '' }, 500)
      }
    })
  }
}
