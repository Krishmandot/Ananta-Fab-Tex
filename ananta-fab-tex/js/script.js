// ===== ANANTA FAB TEX — site script =====

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
    // close menu when a link is tapped
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Highlight active nav link ---- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---- Animated counters ---- */
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const isDecimal = target % 1 !== 0;
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = (isDecimal ? value.toFixed(1) : Math.floor(value)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
    }
    requestAnimationFrame(tick);
  };
  if (counters.length && 'IntersectionObserver' in window) {
    const cIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(el => cIo.observe(el));
  }

  /* ---- Product card expand ---- */
  document.querySelectorAll('.product-card').forEach(card => {
    const trigger = card.querySelector('.link-more');
    if (!trigger) return;
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const wasOpen = card.classList.contains('expanded');
      document.querySelectorAll('.product-card.expanded').forEach(c => c !== card && c.classList.remove('expanded'));
      card.classList.toggle('expanded', !wasOpen);
      trigger.textContent = !wasOpen ? 'Show less −' : 'View details →';
    });
  });

  /* ---- Enquiry form (static site — no backend) ---- */
  const form = document.querySelector('.enquiry-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = form.querySelector('.form-msg');
      const name = form.querySelector('[name="name"]').value.trim();
      const phone = form.querySelector('[name="phone"]').value.trim();
      const product = form.querySelector('[name="product"]') ? form.querySelector('[name="product"]').value : '';
      const message = form.querySelector('[name="message"]') ? form.querySelector('[name="message"]').value : '';

      // Build a mailto so the enquiry reaches the inbox without a backend.
      const subject = encodeURIComponent(`Enquiry from ${name} — ${product || 'Ananta Fab Tex website'}`);
      const body = encodeURIComponent(
        `Name: ${name}\nPhone: ${phone}\nProduct interest: ${product}\n\nMessage:\n${message}`
      );
      window.location.href = `mailto:manishmandot369@gmail.com?subject=${subject}&body=${body}`;

      if (msg) {
        msg.textContent = 'Thanks! Your email app is opening with this enquiry — hit send to reach us. You can also call or WhatsApp us directly.';
        msg.classList.add('show', 'ok');
      }
      form.reset();
    });
  }

  /* ---- Set current year in footer ---- */
  document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});
