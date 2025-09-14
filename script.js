
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
const langToggle = document.getElementById('lang-toggle');
if (langToggle) {
  langToggle.addEventListener('click', () => {
    const currentLang = document.documentElement.lang;
    document.documentElement.lang = currentLang === 'en' ? 'lg' : 'en';
    // In a real implementation, you would replace text content with translations
    alert('Language switched. Full translation implementation would require more setup.');
  });
}

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

// Cart functionality
let cart = [];
let appliedCoupon = null;
try {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
} catch (e) {
  cart = [];
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

document.addEventListener('DOMContentLoaded', () => {
  const addToCartBricksBtn = document.getElementById('add-to-cart-bricks');
  if (addToCartBricksBtn) {
    addToCartBricksBtn.addEventListener('click', () => {
      addToCart('bricks');
    });
  }

  const addToCartPolesBtn = document.getElementById('add-to-cart-poles');
  if (addToCartPolesBtn) {
    addToCartPolesBtn.addEventListener('click', () => {
      addToCart('poles');
    });
  }

  const addToCartCustomBtn = document.getElementById('add-to-cart-custom');
  if (addToCartCustomBtn) {
    addToCartCustomBtn.addEventListener('click', () => {
      addToCart('custom');
    });
  }
});

function updateQuantity(productId, newQuantity) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = Math.max(0, newQuantity); // Ensure quantity is not negative
    if (item.quantity <= 0) {
      removeItem(productId);
    } else {
      saveCart();
      renderCart();
      renderCartDropdown();
    }
  }
}

function removeItem(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
  renderCartDropdown();
}

function calculateTotal() {
  let total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  if (appliedCoupon && appliedCoupon.discount) {
    total = total - appliedCoupon.discount;
    if (total < 0) total = 0;
  }
  return total;
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const paymentSection = document.getElementById('payment-section');
  const checkoutBtn = document.getElementById('checkout-btn');
  const couponSection = document.getElementById('coupon-section');

  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="text-center text-gray-500">Your cart is empty.</p>';
    cartTotal.classList.add('hidden');
    paymentSection.classList.add('hidden');
    couponSection.classList.add('hidden');
    checkoutBtn.disabled = true;
    return;
  }

  couponSection.classList.remove('hidden');

  cart.forEach(item => {
    const usdPrice = (item.price / 4000).toFixed(2);
    const usdTotal = (item.price * item.quantity / 4000).toFixed(2);
    const itemDiv = document.createElement('div');
    itemDiv.className = 'flex justify-between items-center border rounded p-4';
    itemDiv.innerHTML = `
      <div>
        <h4 class="font-bold">${item.name}</h4>
        <p>UGX ${item.price.toLocaleString()} ($${usdPrice}) x ${item.quantity} = UGX ${(item.price * item.quantity).toLocaleString()} ($${usdTotal})</p>
      </div>
      <div class="flex items-center space-x-2">
        <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})" class="bg-gray-300 px-2 py-1 rounded">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})" class="bg-gray-300 px-2 py-1 rounded">+</button>
        <button onclick="removeItem('${item.id}')" class="bg-red-500 text-white px-3 py-1 rounded ml-4">Remove</button>
      </div>
    `;
    cartItems.appendChild(itemDiv);
  });

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const total = calculateTotal();
  const usdTotal = (total / 4000).toFixed(2);
  const usdSubtotal = (subtotal / 4000).toFixed(2);

  let totalText = `UGX ${total.toLocaleString()} ($${usdTotal})`;
  if (appliedCoupon) {
    totalText = `<span class="line-through text-gray-500">UGX ${subtotal.toLocaleString()} ($${usdSubtotal})</span><br>UGX ${total.toLocaleString()} ($${usdTotal})<br><span class="text-green-600">Discount: UGX ${appliedCoupon.discount.toLocaleString()}</span>`;
  }

  document.getElementById('total-amount').innerHTML = totalText;
  cartTotal.classList.remove('hidden');
  paymentSection.classList.remove('hidden');
  checkoutBtn.disabled = false;
}

function renderCartDropdown() {
  console.log('renderCartDropdown called, cart:', cart);
  const dropdownItems = document.getElementById('cart-dropdown-items');
  const dropdownTotal = document.getElementById('cart-dropdown-total-amount');
  const checkoutBtn = document.getElementById('cart-dropdown-checkout');
  const cartCount = document.getElementById('cart-count');

  dropdownItems.innerHTML = '';

  if (!cart || cart.length === 0) {
    dropdownItems.innerHTML = '<p class="text-center text-gray-500">Your cart is empty.</p>';
    dropdownTotal.textContent = '0';
    checkoutBtn.disabled = true;
    cartCount.textContent = '0';
    return;
  }

  cart.forEach(item => {
    const usdPrice = (item.price / 4000).toFixed(2);
    const usdTotal = (item.price * item.quantity / 4000).toFixed(2);
    const itemDiv = document.createElement('div');
    itemDiv.className = 'flex justify-between items-center border rounded p-2';
    itemDiv.innerHTML = `
      <div>
        <h5 class="font-semibold">${item.name}</h5>
        <p>UGX ${item.price.toLocaleString()} ($${usdPrice}) x ${item.quantity} = UGX ${(item.price * item.quantity).toLocaleString()} ($${usdTotal})</p>
      </div>
      <div class="flex items-center space-x-1">
        <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})" class="bg-gray-300 px-1 py-0.5 rounded">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})" class="bg-gray-300 px-1 py-0.5 rounded">+</button>
        <button onclick="removeItem('${item.id}')" class="bg-red-500 text-white px-2 py-0.5 rounded ml-2">Remove</button>
      </div>
    `;
    dropdownItems.appendChild(itemDiv);
  });

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const total = calculateTotal();
  const usdTotal = (total / 4000).toFixed(2);
  const usdSubtotal = (subtotal / 4000).toFixed(2);

  let totalText = `UGX ${total.toLocaleString()} ($${usdTotal})`;
  if (appliedCoupon) {
    totalText = `UGX ${total.toLocaleString()} ($${usdTotal}) - Discount: UGX ${appliedCoupon.discount.toLocaleString()}`;
  }

  dropdownTotal.textContent = totalText;
  checkoutBtn.disabled = false;
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

document.getElementById('cart-toggle').addEventListener('click', () => {
  const dropdown = document.getElementById('cart-dropdown');
  if (!dropdown.classList.contains('hidden')) {
    // If dropdown is visible, hide it
    dropdown.classList.add('hidden');
  } else {
    // If dropdown is hidden, show it
    dropdown.classList.remove('hidden');
  }

  // Fix icons visibility by forcing reflow (workaround for any rendering issues)
  const icons = dropdown.querySelectorAll('svg, img');
  icons.forEach(icon => {
    icon.style.display = 'none';
    void icon.offsetHeight; // trigger reflow
    icon.style.display = '';
  });
});

// Close cart dropdown when clicking outside of it or the cart toggle button
document.addEventListener('click', (event) => {
  const dropdown = document.getElementById('cart-dropdown');
  const cartToggle = document.getElementById('cart-toggle');
  if (!dropdown.classList.contains('hidden')) {
    if (!dropdown.contains(event.target) && !cartToggle.contains(event.target)) {
      dropdown.classList.add('hidden');
    }
  }
});

// Payment and checkout for main cart section
document.querySelectorAll('input[name="payment"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const checkoutBtn = document.getElementById('checkout-btn');
    const momoQrContainer = document.getElementById('momo-qr-container');
    const cardInfoForm = document.getElementById('card-info-form');
    checkoutBtn.disabled = false;

    if (radio.value === 'mobile-money' && radio.checked) {
      momoQrContainer.classList.remove('hidden');
      cardInfoForm.classList.add('hidden');
      // Optionally, you can add logic here to generate or update the QR code dynamically
    } else if (['visa', 'paypal', 'apple-pay'].includes(radio.value) && radio.checked) {
      cardInfoForm.classList.remove('hidden');
      momoQrContainer.classList.add('hidden');
    } else {
      cardInfoForm.classList.add('hidden');
      momoQrContainer.classList.add('hidden');
    }
  });
});

document.getElementById('checkout-btn').addEventListener('click', () => {
  const paymentSection = document.getElementById('payment-section');
  if (paymentSection.classList.contains('hidden')) {
    // Show payment options if hidden
    paymentSection.classList.remove('hidden');
    // Disable checkout button until payment method selected
    document.getElementById('checkout-btn').disabled = true;
    alert('Please select a payment method to proceed.');
    return;
  }

  const selectedPayment = document.querySelector('input[name="payment"]:checked');
  if (!selectedPayment) {
    alert('Please select a payment method.');
    return;
  }

  const paymentMethod = selectedPayment.value;
  const total = calculateTotal();
  const usdTotal = (total / 4000).toFixed(2);

  alert(`Order placed successfully!\nTotal: UGX ${total.toLocaleString()} ($${usdTotal})\nPayment Method: ${paymentMethod}\n\nThank you for your order. We will contact you soon for delivery details.`);

  // Clear cart after checkout
  cart = [];
  saveCart();
  renderCart();
  renderCartDropdown();
});

// Payment and checkout for cart dropdown
document.getElementById('cart-dropdown-checkout').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  // For simplicity, just alert and clear cart
  const total = calculateTotal();
  const usdTotal = (total / 4000).toFixed(2);
  alert(`Order placed successfully!\nTotal: UGX ${total.toLocaleString()} ($${usdTotal})\n\nThank you for your order. We will contact you soon for delivery details.`);

  cart = [];
  appliedCoupon = null;
  saveCart();
  renderCart();
  renderCartDropdown();

  // Hide dropdown after checkout
  document.getElementById('cart-dropdown').classList.add('hidden');
});



function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalQuantity;
}

function applyCoupon() {
  const couponCode = document.getElementById('coupon-code').value.trim().toUpperCase();
  const couponMessage = document.getElementById('coupon-message');

  const coupons = {
    'SAVE10': { discount: 0.1, type: 'percentage' },
    'SAVE5000': { discount: 5000, type: 'fixed' },
    'FREESHIP': { discount: 0, type: 'shipping' } // For future shipping logic
  };

  if (coupons[couponCode]) {
    const coupon = coupons[couponCode];
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    if (coupon.type === 'percentage') {
      appliedCoupon = { code: couponCode, discount: subtotal * coupon.discount };
    } else if (coupon.type === 'fixed') {
      appliedCoupon = { code: couponCode, discount: Math.min(coupon.discount, subtotal) };
    } else {
      appliedCoupon = { code: couponCode, discount: 0 };
    }

    couponMessage.textContent = `Coupon "${couponCode}" applied! Discount: UGX ${appliedCoupon.discount.toLocaleString()}`;
    couponMessage.className = 'text-sm mt-1 text-green-600';
    couponMessage.classList.remove('hidden');
  } else {
    appliedCoupon = null;
    couponMessage.textContent = 'Invalid coupon code.';
    couponMessage.className = 'text-sm mt-1 text-red-600';
    couponMessage.classList.remove('hidden');
  }

  renderCart();
  renderCartDropdown();
}

function addToCart(productId) {
  const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
  if (!productCard) return;

  const quantityInput = productCard.querySelector(`#quantity-${productId}`);
  const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

  if (isNaN(quantity) || quantity < 1) {
    alert('Please enter a valid quantity.');
    return;
  }

  const name = productCard.getAttribute('data-name');
  let price = parseFloat(productCard.getAttribute('data-price'));

  // Check if on sale
  if (productCard.getAttribute('data-onsale') === 'true') {
    const salePrice = parseFloat(productCard.getAttribute('data-sale-price'));
    if (!isNaN(salePrice)) {
      price = salePrice;
    }
  }

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id: productId, name, price, quantity });
  }

  saveCart();
  renderCart();
  renderCartDropdown();
  updateCartCount();
  alert(`${quantity} ${name}(s) added to cart.`);
}



// Chatbot functionality
const responses = {
  'hello': 'Hello! How can I help you today?',
  'hi': 'Hi there! What can I assist you with?',
  'products': 'We offer quality bricks and strong poles. Check out our Products section for more details.',
  'bricks': 'Our bricks are made from high-quality clay and are eco-friendly. Price starts from UGX 5,000.',
  'poles': 'Our poles are sturdy and reliable for fencing. Price starts from UGX 15,000.',
  'price': 'Bricks: UGX 5,000, Poles: UGX 15,000. Custom orders priced on request.',
  'contact': 'You can contact us at +256 764-930-227 or email info@greenlandbricks.com.',
  'location': 'We are located in Kampala, Uganda.',
  'delivery': 'Delivery times vary, typically 2-4 weeks depending on order size and location.',
  'custom': 'We offer custom orders for unique sizes. Please contact us for a quote.',
  'about': 'Grandland Bricks & Polls Ltd specializes in manufacturing quality bricks and producing sturdy fence poles.',
  'team': 'Our team includes experienced professionals in construction and manufacturing.',
  'careers': 'Check our Careers section for current job openings.',
  'faq': 'Visit our FAQ section for common questions.',
  'default': 'I\'m sorry, I didn\'t understand that. Can you please rephrase or ask about our products, contact, or services?'
};

function addMessage(text, sender) {
  const messages = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender}`;
  messageDiv.innerHTML = `<div class="message">${text}</div>`;
  messages.appendChild(messageDiv);
  messages.scrollTop = messages.scrollHeight;
}

function getResponse(text) {
  const lower = text.toLowerCase();
  for (const key in responses) {
    if (lower.includes(key)) {
      return responses[key];
    }
  }
  return responses.default;
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  input.value = '';
  setTimeout(() => {
    const response = getResponse(text);
    addMessage(response, 'bot');
  }, 500);
}

document.getElementById('chat-toggle').addEventListener('click', () => {
  document.getElementById('chat-window').classList.toggle('hidden');
});

document.getElementById('chat-close').addEventListener('click', () => {
  document.getElementById('chat-window').classList.add('hidden');
});

document.getElementById('chat-send').addEventListener('click', sendMessage);

document.getElementById('chat-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
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
