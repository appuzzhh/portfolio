const cards = document.querySelectorAll('.project-card');
const buttons = document.querySelectorAll('.project-actions a');

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

cards.forEach((card) => {
  card.classList.add('reveal-card');
  revealObserver.observe(card);
});

cards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-6px)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    button.classList.add('ripple');
    setTimeout(() => button.classList.remove('ripple'), 400);
  });
});

const pageBanner = document.querySelector('.page-banner');
if (pageBanner) {
  pageBanner.animate(
    [
      { opacity: 0, transform: 'translateY(18px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ],
    { duration: 700, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)', fill: 'forwards' }
  );
}

const imagePlaceholders = document.querySelectorAll('.project-image');
imagePlaceholders.forEach((image, index) => {
  image.setAttribute('loading', 'lazy');
  image.setAttribute('data-index', index + 1);
});
