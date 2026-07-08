const progressBars = document.querySelectorAll('.progress-bar span');
const skillCards = document.querySelectorAll('.skill-card');
const circularIndicators = document.querySelectorAll('.circle-indicator');

const animateProgress = (bar) => {
  const width = bar.getAttribute('data-width') || '75%';
  bar.style.width = width;
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        if (entry.target.classList.contains('progress-bar')) {
          const bar = entry.target.querySelector('span');
          if (bar) {
            animateProgress(bar);
          }
        }
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

skillCards.forEach((card) => {
  card.classList.add('reveal-card');
  revealObserver.observe(card);
});

progressBars.forEach((bar) => {
  const parent = bar.parentElement;
  parent.classList.add('reveal-bar');
  revealObserver.observe(parent);
});

circularIndicators.forEach((indicator, index) => {
  const value = 85 - index * 5;
  indicator.textContent = `${value}%`;
  indicator.animate(
    [
      { opacity: 0, transform: 'scale(0.9)' },
      { opacity: 1, transform: 'scale(1)' }
    ],
    { duration: 700, delay: index * 80, fill: 'forwards' }
  );
});

const body = document.body;
if (body.classList.contains('dark')) {
  document.querySelectorAll('.skill-card').forEach((card) => {
    card.classList.add('dark-mode');
  });
}
