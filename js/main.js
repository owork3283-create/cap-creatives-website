/* ===================================
   COPY ALL AND PRINT - SAFE MAIN JS
   =================================== */

/* ---------- PRELOADER ---------- */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => preloader.classList.add('hidden'), 600);
  }
});

/* ---------- NAVBAR SCROLL ---------- */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---------- INTERSECTION OBSERVER (SAFE) ---------- */
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animated');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

/* ---------- SMOOTH SCROLL ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---------- COUNTER ANIMATION ---------- */
function animateCounter(el) {
  if (!el) return;

  const target = parseInt(el.getAttribute('data-target'));
  if (isNaN(target)) return;

  const duration = 2000;
  const step = target / (duration / 16);

  let current = 0;

  const timer = setInterval(() => {
    current += step;

    if (current >= target) {
      el.textContent = target + (el.getAttribute('data-suffix') || '');
      clearInterval(timer);
    } else {
      el.textContent =
        Math.floor(current) + (el.getAttribute('data-suffix') || '');
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.classList.contains('counted')) {
      e.target.classList.add('counted');
      animateCounter(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => {
  counterObserver.observe(el);
});

/* ---------- PORTFOLIO FILTER ---------- */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b =>
      b.classList.remove('active')
    );

    this.classList.add('active');

    const filter = this.getAttribute('data-filter');

    document.querySelectorAll('.portfolio-item').forEach(item => {
      if (!item) return;

      const category = item.getAttribute('data-category');

      if (filter === 'all' || category === filter) {
        item.style.display = 'block';
        item.style.animation = 'fadeInUp 0.4s ease';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

/* ---------- ACTIVE NAV LINK ---------- */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');

  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ---------- MOBILE NAV CLOSE (SAFE BOOTSTRAP) ---------- */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navCollapse = document.getElementById('navbarNav');

    if (!navCollapse) return;

    if (navCollapse.classList.contains('show')) {
      if (window.bootstrap && bootstrap.Collapse) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    }
  });
});
