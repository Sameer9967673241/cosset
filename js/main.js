/* ============================================================
   COSSET — MAIN JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* =====================================================
     1. NAVBAR — scroll behavior + hamburger
  ===================================================== */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.cssText = 'transform: rotate(45deg) translate(5px, 5px)';
      spans[1].style.cssText = 'opacity: 0';
      spans[2].style.cssText = 'transform: rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => s.style.cssText = '');
    }
  });

  // Close nav on link click (mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => s.style.cssText = '');
    });
  });


  /* =====================================================
     2. FLOATING PARTICLES
  ===================================================== */
  const particlesContainer = document.getElementById('particles');
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${40 + Math.random() * 50}%;
      --dur: ${4 + Math.random() * 6}s;
      --delay: ${Math.random() * 6}s;
      width: ${1 + Math.random() * 3}px;
      height: ${1 + Math.random() * 3}px;
      opacity: ${0.3 + Math.random() * 0.5};
    `;
    particlesContainer.appendChild(p);
  }


  /* =====================================================
     3. INTERSECTION OBSERVER — fade-up animations
  ===================================================== */
  const fadeEls = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => observer.observe(el));


  /* =====================================================
     4. COUNTER ANIMATION (stats)
  ===================================================== */
  const statValues = document.querySelectorAll('.stat-value');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const start = performance.now();

        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(animate);
          else el.textContent = target;
        };

        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(el => counterObserver.observe(el));


  /* =====================================================
     5. HERO SEARCH TABS
  ===================================================== */
  const tabs = document.querySelectorAll('.search-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // Search button — just a UI demo interaction
  document.getElementById('search-btn').addEventListener('click', () => {
    const from = document.getElementById('search-from').value;
    const to = document.getElementById('search-to').value;
    if (!from || !to) {
      // Shake animation on empty fields
      ['search-from', 'search-to'].forEach(id => {
        const el = document.getElementById(id);
        if (!el.value) {
          el.style.animation = 'none';
          el.offsetHeight; // reflow
          el.style.animation = 'shake 0.4s ease';
          el.placeholder = id === 'search-from' ? 'Please enter departure' : 'Please enter destination';
        }
      });
    } else {
      // Scroll to contact
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
  });


  /* =====================================================
     6. CONTACT FORM
  ===================================================== */
  const form = document.getElementById('contact-form');
  const formWrap = document.querySelector('.contact-form-wrap');
  const formSuccess = document.getElementById('form-success');
  const submitBtn = document.getElementById('form-submit');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('field-name').value.trim();
    const email = document.getElementById('field-email').value.trim();
    const company = document.getElementById('field-company').value.trim();

    if (!name || !email || !company) {
      // Highlight empty required fields
      [
        { id: 'field-name', val: name },
        { id: 'field-email', val: email },
        { id: 'field-company', val: company }
      ].forEach(({ id, val }) => {
        if (!val) {
          const el = document.getElementById(id);
          el.style.borderColor = '#f87171';
          el.addEventListener('input', () => {
            el.style.borderColor = '';
          }, { once: true });
        }
      });
      return;
    }

    // Simulate submission
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');
    btnText.textContent = 'Sending...';
    btnIcon.textContent = '⏳';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      formSuccess.classList.add('visible');
    }, 1800);
  });


  /* =====================================================
     7. SMOOTH ACTIVE NAV on scroll
  ===================================================== */
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          link.style.color = '';
          link.style.fontWeight = '';
        });
        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (activeLink) {
          activeLink.style.color = 'var(--text-primary)';
        }
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));


  /* =====================================================
     8. CARD TILT EFFECT on service cards
  ===================================================== */
  document.querySelectorAll('.service-card, .testimonial-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
      card.style.transform = `translateY(-6px) rotateX(${y}deg) rotateY(${x}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* =====================================================
     9. PARALLAX HERO IMAGE on scroll
  ===================================================== */
  const heroImg = document.querySelector('.hero-img');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroImg.style.transform = `translateY(${scrollY * 0.25}px)`;
    }
  }, { passive: true });


  /* =====================================================
     10. SHAKE keyframe (injected)
  ===================================================== */
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-6px); }
      40% { transform: translateX(6px); }
      60% { transform: translateX(-4px); }
      80% { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(shakeStyle);


  /* =====================================================
     11. Set default date on search bar
  ===================================================== */
  const dateInput = document.getElementById('search-date');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
    dateInput.min = new Date().toISOString().split('T')[0];
  }

});
