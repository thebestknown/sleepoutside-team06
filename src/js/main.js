import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('newsletterForm');
  const messageDiv = document.getElementById('newsletterMessage');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;

    if (!email.includes('@')) {
      messageDiv.textContent = 'Please enter a valid email address.';
      messageDiv.style.color = 'red';
      return;
    }

    localStorage.setItem('newsletterEmail', email);
    messageDiv.textContent = 'Thank you for subscribing!';
    messageDiv.style.color = 'green';
    form.reset();
  });
});
