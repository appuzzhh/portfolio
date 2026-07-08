const form = document.getElementById('contact-form');
const feedback = document.querySelector('.form-feedback');
const inputs = form ? form.querySelectorAll('input, textarea') : [];

const setFeedback = (message, isError = false) => {
  if (!feedback) return;
  feedback.textContent = message;
  feedback.style.color = isError ? '#dc2626' : '#15803d';
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const values = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    subject: form.subject.value.trim(),
    message: form.message.value.trim()
  };

  if (!values.name || !values.email || !values.subject || !values.message) {
    setFeedback('Please fill in all required fields.', true);
    return;
  }

  if (!validateEmail(values.email)) {
    setFeedback('Please enter a valid email address.', true);
    return;
  }

  const submitButton = form.querySelector('button');
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
  }

  setTimeout(() => {
    form.reset();
    setFeedback('Message sent successfully. I will get back to you soon.');
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  }, 900);
});

inputs.forEach((input) => {
  input.addEventListener('focus', () => {
    input.classList.add('is-focused');
  });

  input.addEventListener('blur', () => {
    input.classList.remove('is-focused');
  });
});

const revealItems = document.querySelectorAll('.page-banner, .contact-info-card, .form-card, .map-card');
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
