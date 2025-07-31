// Hamburger menu toggle (add a hamburger icon in your HTML for this to work)
const nav = document.querySelector('nav ul');
const hamburger = document.createElement('button');
hamburger.innerHTML = '☰';
hamburger.setAttribute('aria-label', 'Open navigation menu');
hamburger.id = 'hamburger-menu';
hamburger.style.display = 'none';
document.querySelector('nav').prepend(hamburger);

function toggleMenu() {
  nav.classList.toggle('open');
}
hamburger.addEventListener('click', toggleMenu);

// Show hamburger on small screens
function handleResize() {
  if (window.innerWidth <= 768) {
    hamburger.style.display = 'block';
    nav.style.display = nav.classList.contains('open') ? 'flex' : 'none';
  } else {
    hamburger.style.display = 'none';
    nav.style.display = 'flex';
    nav.classList.remove('open');
  }
}
window.addEventListener('resize', handleResize);
window.addEventListener('DOMContentLoaded', handleResize);

// Smooth scrolling for nav links
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      if (window.innerWidth <= 768) {
        nav.classList.remove('open');
        nav.style.display = 'none';
      }
    }
  });
});

// Project filter (example: filter by category, assuming data-category attributes)
function filterProjects(category) {
  document.querySelectorAll('#projects article').forEach(article => {
    if (category === 'all' || article.dataset.category === category) {
      article.style.display = '';
    } else {
      article.style.display = 'none';
    }
  });
}
// Example usage: filterProjects('web'); // Call this on a button click

// Lightbox for project images
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.style.display = 'none';
lightbox.style.position = 'fixed';
lightbox.style.top = 0;
lightbox.style.left = 0;
lightbox.style.width = '100vw';
lightbox.style.height = '100vh';
lightbox.style.background = 'rgba(0,0,0,0.8)';
lightbox.style.justifyContent = 'center';
lightbox.style.alignItems = 'center';
lightbox.style.zIndex = 1000;
lightbox.innerHTML = '<img style="max-width:90vw;max-height:80vh;border-radius:8px;" alt="Project image"><span style="position:absolute;top:2rem;right:2rem;font-size:2rem;color:#fff;cursor:pointer;" id="close-lightbox">&times;</span>';
document.body.appendChild(lightbox);

document.querySelectorAll('#projects img').forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', function() {
    lightbox.querySelector('img').src = this.src;
    lightbox.querySelector('img').alt = this.alt;
    lightbox.style.display = 'flex';
  });
});
lightbox.querySelector('#close-lightbox').onclick = () => {
  lightbox.style.display = 'none';
};

// Contact form validation
const form = document.querySelector('#contact form');
if (form) {
  form.addEventListener('submit', function(e) {
    let valid = true;
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');
    // Remove previous error messages
    form.querySelectorAll('.error').forEach(el => el.remove());

    if (!name.value.trim()) {
      valid = false;
      showError(name, 'Name is required.');
    }
    if (!email.value.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(email.value)) {
      valid = false;
      showError(email, 'Valid email is required.');
    }
    if (!message.value.trim()) {
      valid = false;
      showError(message, 'Message is required.');
    }
    if (!valid) e.preventDefault();
  });

  function showError(input, msg) {
    const error = document.createElement('div');
    error.className = 'error';
    error.style.color = 'red';
    error.style.fontSize = '0.95rem';
    error.style.marginTop = '0.2rem';
    error.textContent = msg;
    input.parentNode.insertBefore(error, input.nextSibling);
  }
}