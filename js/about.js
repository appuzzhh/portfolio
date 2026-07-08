const revealItems = document.querySelectorAll('.page-banner, .story-section, .education-section, .objective-section, .info-section, .cta-section, .info-card');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => {
  item.classList.add('reveal-item');
  revealObserver.observe(item);
});

const cards = document.querySelectorAll('.info-card');

cards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-4px)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

const pageBanner = document.querySelector('.page-banner');
if (pageBanner) {
  pageBanner.animate(
    [
      { opacity: 0, transform: 'translateY(20px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ],
    {
      duration: 700,
      easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      fill: 'forwards'
    }
  );
}
