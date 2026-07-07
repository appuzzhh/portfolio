const timelineItems = document.querySelectorAll('.timeline-item, .skill-pill, .achievement-card, .cta-section');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

timelineItems.forEach((item) => {
  item.classList.add('reveal-item');
  revealObserver.observe(item);
});

const cards = document.querySelectorAll('.timeline-card, .skill-pill, .achievement-card');

cards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-3px)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

const pageBanner = document.querySelector('.page-banner');
if (pageBanner) {
  pageBanner.animate(
    [
      { opacity: 0, transform: 'translateY(18px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ],
    {
      duration: 700,
      easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      fill: 'forwards'
    }
  );
}

const body = document.body;
if (body.classList.contains('dark')) {
  document.querySelectorAll('.timeline-card, .skill-pill, .achievement-card').forEach((element) => {
    element.classList.add('dark-mode');
  });
}
