document.getElementById("menu-btn").addEventListener("click", () => {
  document.getElementById("menu").classList.toggle("hidden");
});

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll('.team-member').forEach(member => {
  member.addEventListener('click', () => {
    const desc = member.querySelector('.description');
    if (desc) {
      desc.classList.toggle('hidden');
    }
  });
});

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.textContent = '↑';
backToTopBtn.setAttribute('aria-label', 'Back to top');
backToTopBtn.className = 'fixed bottom-4 right-4 bg-green-700 text-white p-2 rounded-full shadow-lg hidden';
document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.remove('hidden');
  } else {
    backToTopBtn.classList.add('hidden');
  }
});

// Toggle product description display on click
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
  });
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for your message! We will get back to you soon.');
  this.reset();
});

// Newsletter form submission
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for subscribing to our newsletter!');
  this.reset();
});

// Dark mode toggle
document.getElementById('dark-mode-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const icon = document.getElementById('dark-mode-toggle');
  icon.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Language toggle (basic implementation)
document.getElementById('lang-toggle').addEventListener('click', () => {
  const currentLang = document.documentElement.lang;
  document.documentElement.lang = currentLang === 'en' ? 'lg' : 'en';
  // In a real implementation, you would replace text content with translations
  alert('Language switched. Full translation implementation would require more setup.');
});

// Lightbox functions
function openLightbox(src) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').classList.remove('hidden');
  document.getElementById('lightbox').classList.add('flex');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
  document.getElementById('lightbox').classList.remove('flex');
}

// Careers application form modal show/hide
function showApplicationForm(jobTitle) {
  document.getElementById('job-title').textContent = jobTitle;
  document.getElementById('position-input').value = jobTitle;
  document.getElementById('application-modal').classList.remove('hidden');
  document.getElementById('application-modal').classList.add('flex');
}

function hideApplicationForm() {
  document.getElementById('application-modal').classList.add('hidden');
  document.getElementById('application-modal').classList.remove('flex');
}

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registered'))
      .catch(error => console.log('SW registration failed'));
  });
}
