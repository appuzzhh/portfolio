const body = document.body;
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.setAttribute('aria-label', 'Toggle dark mode');

document.querySelector('.navbar').appendChild(themeToggle);

// Default theme = Dark
const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme === 'light') {
  body.classList.remove('dark');
  themeToggle.textContent = '☀';
} else {
  body.classList.add('dark');
  themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  themeToggle.textContent = isDark ? '🌙' : '☀';
  localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
});

const heroText = document.querySelector('.hero-content h1');
if (heroText) {
  const text = heroText.textContent;
  heroText.textContent = '';
  let index = 0;

  const typeWriter = () => {
    heroText.textContent = text.slice(0, index);
    index += 1;
    if (index <= text.length) {
      setTimeout(typeWriter, 70);
    }
  };

  setTimeout(typeWriter, 500);
}

const navLinks = document.querySelectorAll('.nav-links a');
const sections = Array.from(document.querySelectorAll('main section[id]'));

const setActiveLink = () => {
  const scrollPosition = window.scrollY + 120;

  sections.forEach((section) => {
    if (
      scrollPosition >= section.offsetTop &&
      scrollPosition < section.offsetTop + section.offsetHeight
    ) {
      navLinks.forEach((link) => {
        const isActive =
          link.getAttribute('href') === `#${section.id}` ||
          link.getAttribute('href') === `${section.id}.html`;
        link.classList.toggle('active', isActive);
      });
    }
  });
};

window.addEventListener('scroll', setActiveLink);
setActiveLink();

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      event.preventDefault();
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const revealItems = document.querySelectorAll(
  '.about-preview, .projects-preview, .stats, .cta, .hero-card'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => {
  item.classList.add('reveal');
  observer.observe(item);
});

const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.setAttribute('aria-label', 'Back to top');
backToTop.textContent = '↑';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 600);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const loader = document.createElement('div');
loader.className = 'page-loader';
loader.innerHTML = '<div class="loader-ring"></div>';
document.body.appendChild(loader);

window.addEventListener('load', () => {
  loader.classList.add('hidden');
  setTimeout(() => loader.remove(), 600);
});

const counters = document.querySelectorAll('[data-count]');

const animateCounters = () => {
  counters.forEach((counter) => {
    const target = Number(counter.getAttribute('data-count'));
    const duration = 1200;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = value;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    requestAnimationFrame(updateCounter);
  });
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.disconnect();
      }
    });
  },
  { threshold: 0.5 }
);

if (counters.length) {
  counterObserver.observe(document.querySelector('.stats'));
}