document.getElementById("menu-btn").addEventListener("click", () => {
  document.getElementById("menu").classList.toggle("hidden");
});

document.getElementById("year").textContent = new Date().getFullYear();



const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
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
}

// Function to hide all descriptions
function hideAllDescriptions() {
  document.querySelectorAll('.description').forEach(desc => desc.classList.add('hidden'));
}

// Add click listeners to toggle descriptions for Freddy, Emma, Monica
['Freddy', 'Emma', 'Monica'].forEach(name => {
  const member = document.querySelector(`.team-member img[alt="${name}"]`);
  if (member) {
    member.style.cursor = 'pointer';
    member.addEventListener('click', () => {
      const desc = member.parentElement.querySelector('.description');
      if (desc) {
        desc.classList.toggle('hidden');
      }
    });
  }
});

document.querySelectorAll('section > h3, section > h4, section > h5').forEach(header => {
  header.style.cursor = 'pointer';
  header.addEventListener('click', () => {
    const section = header.parentElement;
    if (!section) return;
    const children = Array.from(section.children);
    children.forEach(child => {
      if (child !== header) {
        if (child.style.display === 'block') {
          child.style.display = 'none';
        } else {
          child.style.display = 'block';
        }
      }
    });
  });
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

// Show application form modal
function showApplicationForm(position) {
  const modal = document.getElementById('application-modal');
  const jobTitle = document.getElementById('job-title');
  const positionInput = document.getElementById('position-input');
  modal.classList.remove('hidden');
  jobTitle.textContent = position;
  positionInput.value = position;
}

// Hide application form modal
function hideApplicationForm() {
  const modal = document.getElementById('application-modal');
  modal.classList.add('hidden');
}

// Event listeners for Apply Now buttons
document.querySelectorAll('button[onclick^="showApplicationForm"]').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const position = button.getAttribute('onclick').match(/'([^']+)'/)[1];
    showApplicationForm(position);
  });
});

// Close modal on clicking outside or close button
document.getElementById('application-modal').addEventListener('click', (e) => {
  if (e.target.id === 'application-modal' || e.target.id === 'application-close') {
    hideApplicationForm();
  }
});

// Language toggle (basic implementation)
const langToggle = document.getElementById('lang-toggle');
if (langToggle) {
  langToggle.addEventListener('click', () => {
    const currentLang = document.documentElement.lang;
    document.documentElement.lang = currentLang === 'en' ? 'lg' : 'en';
    // In a real implementation, you would replace text content with translations
    alert('Language switched. Full translation implementation would require more setup.');
  });
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
  lightbox.classList.add('show');
  lightbox.style.display = 'flex';
  lightboxImg.src = src;
}

function closeLightbox() {
  lightbox.classList.remove('show');
  lightbox.style.display = 'none';
  lightboxImg.src = '';
}

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Remove duplicate lightbox declarations and event listeners
// Assuming lightbox and lightboxImg are already declared earlier in the file

function openLightbox(src) {
  lightbox.classList.remove('hidden');
  lightbox.style.display = 'flex';
  lightboxImg.src = src;
  lightboxImg.style.cursor = 'zoom-in';
  lightboxImg.style.transition = 'transform 0.3s ease';
  lightboxImg.style.transform = 'scale(1)';
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  lightbox.style.display = 'none';
  lightboxImg.src = '';
  lightboxImg.style.transform = 'scale(1)';
}

lightboxImg.addEventListener('click', () => {
  if (lightboxImg.style.transform === 'scale(1)') {
    lightboxImg.style.transform = 'scale(2)';
    lightboxImg.style.cursor = 'zoom-out';
  } else {
    lightboxImg.style.transform = 'scale(1)';
    lightboxImg.style.cursor = 'zoom-in';
  }
});

// Close lightbox when clicking outside the image or on close button
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target.id === 'lightbox-close') {
    closeLightbox();
  }
});

// Add click event to gallery images to open lightbox
document.querySelectorAll('.gallery-img').forEach(img => {
  img.addEventListener('click', () => openLightbox(img.src));
});

// Cart data and functions
let cart = [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  const storedCart = localStorage.getItem('cart');
  cart = storedCart ? JSON.parse(storedCart) : [];
}

function renderCart() {
  loadCart();
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('total-amount');
  cartItemsContainer.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    cartTotal.parentElement.classList.add('hidden');
    return;
  }

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'flex justify-between items-center border-b border-gray-300 pb-2 mb-2';

    itemDiv.innerHTML = `
      <div>
        <h5 class="font-semibold">${item.name}</h5>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: UGX ${item.price.toLocaleString()}</p>
      </div>
      <div>
        <button class="remove-item bg-red-600 text-white px-2 py-1 rounded">Remove</button>
      </div>
    `;

    itemDiv.querySelector('.remove-item').addEventListener('click', () => {
      removeFromCart(item.id);
    });

    cartItemsContainer.appendChild(itemDiv);
  });

  cartTotal.textContent = total.toLocaleString();
  cartTotal.parentElement.classList.remove('hidden');
}

function renderCartDropdown() {
  loadCart();
  const dropdownItems = document.getElementById('cart-dropdown-items');
  const dropdownTotal = document.getElementById('cart-dropdown-total-amount');
  const checkoutBtn = document.getElementById('cart-dropdown-checkout');
  dropdownItems.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    dropdownItems.innerHTML = '<p>Your cart is empty.</p>';
    checkoutBtn.disabled = true;
    dropdownTotal.textContent = '0';
    return;
  }

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'flex justify-between items-center border-b border-gray-300 pb-2 mb-2';

    itemDiv.innerHTML = `
      <div>
        <h5 class="font-semibold">${item.name}</h5>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: UGX ${item.price.toLocaleString()}</p>
      </div>
      <div>
        <button class="remove-item bg-red-600 text-white px-2 py-1 rounded">Remove</button>
      </div>
    `;

    itemDiv.querySelector('.remove-item').addEventListener('click', () => {
      removeFromCart(item.id);
    });

    dropdownItems.appendChild(itemDiv);
  });

  dropdownTotal.textContent = total.toLocaleString();
  checkoutBtn.disabled = false;
}

function addToCart(id, name, price, quantity) {
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id, name, price, quantity });
  }
  saveCart();
  renderCart();
  renderCartDropdown();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
  renderCartDropdown();
}

// Event listeners for Add to Cart buttons
document.getElementById('add-to-cart-bricks').addEventListener('click', () => {
  const qty = parseInt(document.getElementById('quantity-bricks').value, 10) || 1;
  addToCart('bricks', 'Bricks', 4000, qty);
});

document.getElementById('add-to-cart-poles').addEventListener('click', () => {
  const qty = parseInt(document.getElementById('quantity-poles').value, 10) || 1;
  addToCart('poles', 'Poles', 12000, qty);
});

document.getElementById('add-to-cart-custom').addEventListener('click', () => {
  const qty = parseInt(document.getElementById('quantity-custom').value, 10) || 1;
  addToCart('custom', 'Custom Orders', 0, qty);
});

// Initialize cart on page load
renderCart();
renderCartDropdown();

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registered'))
      .catch(error => console.log('SW registration failed'));
  });
}
