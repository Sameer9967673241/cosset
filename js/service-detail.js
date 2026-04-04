/* ============================================================
   SERVICE DETAIL PAGES — JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Floating Particles ---- */
  const particlesContainer = document.getElementById('sd-particles');
  if (particlesContainer) {
    const count = 20;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'sd-particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${30 + Math.random() * 60}%;
        --dur: ${4 + Math.random() * 6}s;
        --delay: ${Math.random() * 6}s;
        width: ${1 + Math.random() * 3}px;
        height: ${1 + Math.random() * 3}px;
        opacity: ${0.3 + Math.random() * 0.5};
      `;
      particlesContainer.appendChild(p);
    }
  }

  /* ---- Scroll-triggered fade-in for feature cards & stat cards ---- */
  const animateCards = document.querySelectorAll('.sd-feature-card, .sd-stat-card, .sd-process-step, .sd-cta-card');

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Stagger animation
        const siblings = Array.from(entry.target.parentElement.children).filter(
          c => c.classList.contains(entry.target.className.split(' ')[0])
        );
        const index = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  animateCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s cubic-bezier(0, 0, 0.2, 1), transform 0.6s cubic-bezier(0, 0, 0.2, 1)';
    cardObserver.observe(card);
  });

  /* ---- Card hover tilt effect ---- */
  document.querySelectorAll('.sd-feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
      card.style.transform = `translateY(-6px) rotateX(${y}deg) rotateY(${x}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});
