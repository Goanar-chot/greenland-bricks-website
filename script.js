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

// Removed separate description toggling for Freddy, Emma, Monica as it will be handled with social links

// Add hover and click listeners for Goanar Chot's profile
const goanarProfile = document.getElementById('goanar-profile');
const goanarSocialLinks = document.getElementById('goanar-social-links');
const goanarDesc = document.querySelector('#goanar-profile .description');

if (goanarProfile && goanarSocialLinks && goanarDesc) {
  goanarProfile.addEventListener('mouseenter', () => {
    goanarSocialLinks.classList.remove('hidden');
    goanarDesc.classList.remove('hidden');
  });
  goanarProfile.addEventListener('mouseleave', () => {
    goanarSocialLinks.classList.add('hidden');
    goanarDesc.classList.add('hidden');
  });
  goanarProfile.addEventListener('click', () => {
    goanarSocialLinks.classList.toggle('hidden');
    goanarDesc.classList.toggle('hidden');
  });
}

// Add hover and click listeners for Freddy's profile
const freddyProfile = document.getElementById('freddy-profile');
const freddySocialLinks = document.getElementById('freddy-social-links');
const freddyDesc = document.querySelector('#freddy-profile .description');

if (freddyProfile && freddySocialLinks && freddyDesc) {
  freddyProfile.addEventListener('mouseenter', () => {
    freddySocialLinks.classList.remove('hidden');
    freddyDesc.classList.remove('hidden');
  });
  freddyProfile.addEventListener('mouseleave', () => {
    freddySocialLinks.classList.add('hidden');
    freddyDesc.classList.add('hidden');
  });
  freddyProfile.addEventListener('click', () => {
    freddySocialLinks.classList.toggle('hidden');
    freddyDesc.classList.toggle('hidden');
  });
}

// Add hover and click listeners for Emma's profile
const emmaProfile = document.getElementById('emma-profile');
const emmaSocialLinks = document.getElementById('emma-social-links');
const emmaDesc = document.querySelector('#emma-profile .description');

if (emmaProfile && emmaSocialLinks && emmaDesc) {
  emmaProfile.addEventListener('mouseenter', () => {
    emmaSocialLinks.classList.remove('hidden');
    emmaDesc.classList.remove('hidden');
  });
  emmaProfile.addEventListener('mouseleave', () => {
    emmaSocialLinks.classList.add('hidden');
    emmaDesc.classList.add('hidden');
  });
  emmaProfile.addEventListener('click', () => {
    emmaSocialLinks.classList.toggle('hidden');
    emmaDesc.classList.toggle('hidden');
  });
}

// Add hover and click listeners for Monica's profile
const monicaProfile = document.getElementById('monica-profile');
const monicaSocialLinks = document.getElementById('monica-social-links');
const monicaDesc = document.querySelector('#monica-profile .description');

if (monicaProfile && monicaSocialLinks && monicaDesc) {
  monicaProfile.addEventListener('mouseenter', () => {
    monicaSocialLinks.classList.remove('hidden');
    monicaDesc.classList.remove('hidden');
  });
  monicaProfile.addEventListener('mouseleave', () => {
    monicaSocialLinks.classList.add('hidden');
    monicaDesc.classList.add('hidden');
  });
  monicaProfile.addEventListener('click', () => {
    monicaSocialLinks.classList.toggle('hidden');
    monicaDesc.classList.toggle('hidden');
  });
}

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
    // Toggle the product-details div visibility
    const details = card.querySelector('.product-details');
    if (details.style.display === 'block') {
      details.style.display = 'none';
    } else {
      details.style.display = 'block';
    }
  });
});

// Product filtering
let currentCategoryFilter = 'all';
let minPrice = 0;
let maxPrice = Infinity;
let sortBy = 'name';

function applyFilters() {
  const productGrid = document.querySelector('.grid');
  const cards = Array.from(document.querySelectorAll('.product-card'));
  cards.forEach(card => {
    const category = card.getAttribute('data-id');
    const price = parseInt(card.getAttribute('data-price'));
    const categoryMatch = currentCategoryFilter === 'all' || category.includes(currentCategoryFilter.slice(0, -1));
    const priceMatch = price >= minPrice && price <= maxPrice;
    if (categoryMatch && priceMatch) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
  // Sort visible cards
  const visibleCards = cards.filter(card => card.style.display !== 'none');
  visibleCards.sort((a, b) => {
    const nameA = a.getAttribute('data-name').toLowerCase();
    const nameB = b.getAttribute('data-name').toLowerCase();
    const priceA = parseInt(a.getAttribute('data-price'));
    const priceB = parseInt(b.getAttribute('data-price'));
    if (sortBy === 'name') {
      return nameA.localeCompare(nameB);
    } else if (sortBy === 'price-low') {
      return priceA - priceB;
    } else if (sortBy === 'price-high') {
      return priceB - priceA;
    } else if (sortBy === 'popularity') {
      // Assuming popularity is based on price or random, for demo use price
      return priceB - priceA;
    }
    return 0;
  });
  // Reorder in DOM
  visibleCards.forEach(card => productGrid.appendChild(card));
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentCategoryFilter = btn.getAttribute('data-filter');
    applyFilters();
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('bg-green-700', 'text-white'));
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.add('bg-gray-300', 'text-gray-700'));
    btn.classList.remove('bg-gray-300', 'text-gray-700');
    btn.classList.add('bg-green-700', 'text-white');
  });
});

document.getElementById('apply-price-filter').addEventListener('click', () => {
  minPrice = parseInt(document.getElementById('min-price').value) || 0;
  maxPrice = parseInt(document.getElementById('max-price').value) || Infinity;
  applyFilters();
});

document.getElementById('sort-select').addEventListener('change', () => {
  sortBy = document.getElementById('sort-select').value;
  applyFilters();
});

document.getElementById('sort-by').addEventListener('change', () => {
  sortBy = document.getElementById('sort-by').value;
  applyFilters();
});

// Blog pagination
const postsPerPage = 3;
let currentPage = 1;
const blogPosts = Array.from(document.querySelectorAll('.blog-post'));
const totalPages = Math.ceil(blogPosts.length / postsPerPage);

function showPage(page) {
  currentPage = page;
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  blogPosts.forEach((post, index) => {
    if (index >= start && index < end) {
      post.style.display = 'block';
    } else {
      post.style.display = 'none';
    }
  });
  updatePaginationButtons();
}

function updatePaginationButtons() {
  const paginationContainer = document.getElementById('blog-pagination');
  paginationContainer.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.className = 'px-3 py-1 border rounded ' + (i === currentPage ? 'bg-green-700 text-white' : 'bg-white text-green-700 hover:bg-gray-200');
    button.addEventListener('click', () => showPage(i));
    paginationContainer.appendChild(button);
  }
}

// Blog search
const blogSearchInput = document.getElementById('blog-search');
blogSearchInput.addEventListener('input', () => {
  const query = blogSearchInput.value.toLowerCase();
  blogPosts.forEach(post => {
    const title = post.querySelector('h4').textContent.toLowerCase();
    const content = post.querySelector('p').textContent.toLowerCase();
    const tags = post.getAttribute('data-tags').toLowerCase();
    if (title.includes(query) || content.includes(query) || tags.includes(query)) {
      post.style.display = 'block';
    } else {
      post.style.display = 'none';
    }
  });
  // Reset pagination when searching
  updatePaginationButtons();
});

// Initialize blog pagination
showPage(1);

// Blog post modal
const blogModal = document.getElementById('blog-modal');
const blogModalClose = document.getElementById('blog-modal-close');
const blogModalContent = document.getElementById('blog-modal-content');

blogModalClose.addEventListener('click', () => {
  blogModal.classList.add('hidden');
});

blogModal.addEventListener('click', (e) => {
  if (e.target === blogModal) {
    blogModal.classList.add('hidden');
  }
});

document.querySelectorAll('.blog-post a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const post = e.target.closest('.blog-post');
    const title = post.querySelector('h4').textContent;
    const content = post.querySelector('p').textContent;
    const tags = post.querySelectorAll('span');
    const tagsHtml = Array.from(tags).map(tag => `<span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-2">${tag.textContent}</span>`).join('');

    blogModalContent.innerHTML = `
      <div class="mb-4">${tagsHtml}</div>
      <h2 class="text-3xl font-bold mb-4">${title}</h2>
      <p class="text-lg mb-4">${content}</p>
      <p class="text-gray-700">This is the full content of the blog post. In a real application, this would contain the complete article text, images, and additional details. For now, this serves as a placeholder for the individual blog post page functionality.</p>
      <p class="text-gray-700 mt-4">Published on ${new Date().toLocaleDateString()}</p>
    `;
    blogModal.classList.remove('hidden');
  });
});

// User Authentication
const authModal = document.getElementById('auth-modal');
const authModalClose = document.getElementById('auth-modal-close');
const authContent = document.getElementById('auth-content');
const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', () => {
  showLoginForm();
  authModal.classList.remove('hidden');
});

authModalClose.addEventListener('click', () => {
  authModal.classList.add('hidden');
});

authModal.addEventListener('click', (e) => {
  if (e.target === authModal) {
    authModal.classList.add('hidden');
  }
});

function showLoginForm() {
  authContent.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <form id="login-form">
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Email</label>
        <input type="email" name="email" class="w-full p-2 border rounded" required>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Password</label>
        <input type="password" name="password" class="w-full p-2 border rounded" required>
      </div>
      <button type="submit" class="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 w-full">Login</button>
    </form>
    <p class="mt-4 text-center">
      Don't have an account? <a href="#" id="show-signup" class="text-green-700 hover:underline">Sign up</a>
    </p>
  `;

  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate login
    alert('Login successful! (This is a demo)');
    authModal.classList.add('hidden');
    showDashboard();
  });

  document.getElementById('show-signup').addEventListener('click', (e) => {
    e.preventDefault();
    showSignupForm();
  });
}

function showSignupForm() {
  authContent.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">Sign Up</h2>
    <form id="signup-form">
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Full Name</label>
        <input type="text" name="name" class="w-full p-2 border rounded" required>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Email</label>
        <input type="email" name="email" class="w-full p-2 border rounded" required>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Password</label>
        <input type="password" name="password" class="w-full p-2 border rounded" required>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Confirm Password</label>
        <input type="password" name="confirm-password" class="w-full p-2 border rounded" required>
      </div>
      <button type="submit" class="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 w-full">Sign Up</button>
    </form>
    <p class="mt-4 text-center">
      Already have an account? <a href="#" id="show-login" class="text-green-700 hover:underline">Login</a>
    </p>
  `;

  document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate signup
    alert('Signup successful! (This is a demo)');
    authModal.classList.add('hidden');
  });

  document.getElementById('show-login').addEventListener('click', (e) => {
    e.preventDefault();
    showLoginForm();
  });
}

function showDashboard() {
  const dashboardModal = document.getElementById('dashboard-modal');
  const dashboardContent = document.getElementById('dashboard-content');

  dashboardContent.innerHTML = `
    <h2 class="text-3xl font-bold mb-6">User Dashboard</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-gray-100 p-4 rounded">
        <h3 class="text-xl font-bold mb-4">Order History</h3>
        <div id="order-history" class="space-y-2">
          <!-- Order history will be populated here -->
        </div>
      </div>
      <div class="bg-gray-100 p-4 rounded">
        <h3 class="text-xl font-bold mb-4">Account Information</h3>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john@example.com</p>
        <p><strong>Member since:</strong> January 2023</p>
      </div>
    </div>
    <div class="mt-6">
      <h3 class="text-xl font-bold mb-4">Quick Actions</h3>
      <button id="logout-btn" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Logout</button>
    </div>
  `;

  // Load orders from localStorage
  const storedOrders = localStorage.getItem('orders');
  const userOrders = storedOrders ? JSON.parse(storedOrders) : [];

  // Populate order history
  const orderHistory = document.getElementById('order-history');

  if (userOrders.length === 0) {
    orderHistory.innerHTML = '<p>No orders found.</p>';
  } else {
    userOrders.forEach(order => {
      const orderDiv = document.createElement('div');
      orderDiv.className = 'border-b pb-2';
      orderDiv.innerHTML = `
        <p><strong>Order #${order.id}</strong> - ${order.date}</p>
        <p>Total: UGX ${order.total.toLocaleString()} | Status: ${order.status}</p>
      `;
      orderHistory.appendChild(orderDiv);
    });
  }

  document.getElementById('logout-btn').addEventListener('click', () => {
    dashboardModal.classList.add('hidden');
    alert('Logged out successfully!');
  });

  dashboardModal.classList.remove('hidden');
}

// Dashboard modal close
document.getElementById('dashboard-modal-close').addEventListener('click', () => {
  document.getElementById('dashboard-modal').classList.add('hidden');
});

document.getElementById('dashboard-modal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('dashboard-modal')) {
    document.getElementById('dashboard-modal').classList.add('hidden');
  }
});

// Order Tracking
const trackOrderBtn = document.getElementById('track-order-btn');
const trackingModal = document.getElementById('tracking-modal');
const trackingModalClose = document.getElementById('tracking-modal-close');
const trackingContent = document.getElementById('tracking-content');

trackOrderBtn.addEventListener('click', () => {
  showTrackingForm();
  trackingModal.classList.remove('hidden');
});

trackingModalClose.addEventListener('click', () => {
  trackingModal.classList.add('hidden');
});

trackingModal.addEventListener('click', (e) => {
  if (e.target === trackingModal) {
    trackingModal.classList.add('hidden');
  }
});

function showTrackingForm() {
  trackingContent.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">Track Your Order</h2>
    <form id="tracking-form">
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Order ID</label>
        <input type="text" name="order-id" class="w-full p-2 border rounded" placeholder="Enter your order ID" required>
      </div>
      <button type="submit" class="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 w-full">Track Order</button>
    </form>
  `;

  document.getElementById('tracking-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const orderId = e.target['order-id'].value;
    showTrackingResult(orderId);
  });
}

function showTrackingResult(orderId) {
  // Load orders from localStorage
  const storedOrders = localStorage.getItem('orders');
  const userOrders = storedOrders ? JSON.parse(storedOrders) : [];
  const order = userOrders.find(o => o.id === orderId);

  if (!order) {
    trackingContent.innerHTML = `
      <h2 class="text-2xl font-bold mb-4">Order Not Found</h2>
      <p>Sorry, we couldn't find an order with ID: ${orderId}</p>
      <button id="back-to-tracking" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">Try Another Order</button>
    `;
    document.getElementById('back-to-tracking').addEventListener('click', () => {
      showTrackingForm();
    });
    return;
  }

  // Simulate tracking updates based on order date
  const orderDate = new Date(order.date);
  const now = new Date();
  const daysSinceOrder = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));

  let status, location, estimatedDelivery, updates;

  if (daysSinceOrder < 1) {
    status = 'Processing';
    location = 'Warehouse';
    estimatedDelivery = new Date(orderDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    updates = [
      { date: order.date, status: 'Order Placed', location: 'Online' },
      { date: order.date, status: 'Processing', location: 'Warehouse' }
    ];
  } else if (daysSinceOrder < 3) {
    status = 'Shipped';
    location = 'Kampala';
    estimatedDelivery = new Date(orderDate.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    updates = [
      { date: order.date, status: 'Order Placed', location: 'Online' },
      { date: new Date(orderDate.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], status: 'Processing', location: 'Warehouse' },
      { date: new Date(orderDate.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], status: 'Shipped', location: 'Kampala' }
    ];
  } else if (daysSinceOrder < 7) {
    status = 'In Transit';
    location = 'Kampala Distribution Center';
    estimatedDelivery = new Date(orderDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    updates = [
      { date: order.date, status: 'Order Placed', location: 'Online' },
      { date: new Date(orderDate.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], status: 'Processing', location: 'Warehouse' },
      { date: new Date(orderDate.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], status: 'Shipped', location: 'Kampala' },
      { date: new Date(orderDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], status: 'In Transit', location: 'Kampala Distribution Center' }
    ];
  } else {
    status = 'Delivered';
    location = 'Customer Location';
    estimatedDelivery = order.date;
    updates = [
      { date: order.date, status: 'Order Placed', location: 'Online' },
      { date: new Date(orderDate.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], status: 'Processing', location: 'Warehouse' },
      { date: new Date(orderDate.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], status: 'Shipped', location: 'Kampala' },
      { date: new Date(orderDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], status: 'In Transit', location: 'Kampala Distribution Center' },
      { date: new Date(orderDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], status: 'Delivered', location: 'Customer Location' }
    ];
  }

  trackingContent.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">Order Tracking</h2>
    <div class="mb-4">
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Current Status:</strong> ${status}</p>
      <p><strong>Current Location:</strong> ${location}</p>
      <p><strong>Estimated Delivery:</strong> ${estimatedDelivery}</p>
    </div>
    <div class="mb-4">
      <h3 class="text-lg font-bold mb-2">Tracking Updates</h3>
      <div class="space-y-2">
        ${updates.map(update => `
          <div class="border-l-4 border-green-500 pl-4">
            <p class="font-bold">${update.status}</p>
            <p class="text-sm text-gray-600">${update.date} - ${update.location}</p>
          </div>
        `).join('')}
      </div>
    </div>
    <button id="back-to-tracking" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">Track Another Order</button>
  `;

  document.getElementById('back-to-tracking').addEventListener('click', () => {
    showTrackingForm();
  });
}

// Add to Cart button event listeners for new products
document.getElementById('add-to-cart-small-polls').addEventListener('click', () => {
  const qty = parseInt(document.getElementById('quantity-small-polls').value, 10) || 1;
  addToCart('small-polls', 'Small Polls', 10, qty);
});

document.getElementById('add-to-cart-long-polls-angle').addEventListener('click', () => {
  const qty = parseInt(document.getElementById('quantity-long-polls-angle').value, 10) || 1;
  addToCart('long-polls-angle', 'Long Polls with Angle', 2500, qty);
});

document.getElementById('add-to-cart-6-inch-bricks').addEventListener('click', () => {
  const qty = parseInt(document.getElementById('quantity-6-inch-bricks').value, 10) || 1;
  addToCart('6-inch-bricks', '6 Inch Bricks', 2000, qty);
});

document.getElementById('add-to-cart-4-inch-bricks').addEventListener('click', () => {
  const qty = parseInt(document.getElementById('quantity-4-inch-bricks').value, 10) || 1;
  addToCart('4-inch-bricks', '4 Inch Bricks', 1700, qty);
});

document.getElementById('add-to-cart-pavers').addEventListener('click', () => {
  const qty = parseInt(document.getElementById('quantity-pavers').value, 10) || 1;
  addToCart('pavers', 'Pavers', 700, qty);
});

document.getElementById('add-to-cart-medium-calvert').addEventListener('click', () => {
  const qty = parseInt(document.getElementById('quantity-medium-calvert').value, 10) || 1;
  addToCart('medium-calvert', 'Medium Calvert', 850, qty);
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

// Multi-language support
const translations = {
  en: {
    home: 'Home',
    about: 'About',
    products: 'Products',
    projects: 'Projects',
    testimonials: 'Testimonials',
    faq: 'FAQ',
    blog: 'Blog',
    careers: 'Careers',
    team: 'Team',
    contact: 'Contact',
    login: 'Login',
    trackOrder: 'Track Order',
    welcome: 'Welcome to Grandland Construction Materials',
    heroText: 'Quality Construction Materials for Uganda',
    heroSubtext: 'Bricks, Poles, Pavers & More',
    shopNow: 'Shop Now',
    learnMore: 'Learn More',
    ourProducts: 'Our Products',
    viewAll: 'View All',
    latestNews: 'Latest News & Articles',
    readMore: 'Read more',
    subscribe: 'Subscribe to Our Newsletter',
    subscribeText: 'Stay updated with our latest products and offers.',
    enterEmail: 'Enter your email',
    subscribeBtn: 'Subscribe',
    allRights: 'All rights reserved.',
    // Add more translations as needed
  },
  lg: {
    home: 'Eka',
    about: 'Ebifaako',
    products: 'Ebintu',
    projects: 'Emirimu',
    testimonials: 'Obujulizi',
    faq: 'Ebibuuzo',
    blog: 'Blog',
    careers: 'Emirimu',
    team: 'Abakozi',
    contact: 'Tuukirira',
    login: 'Yingira',
    trackOrder: 'Kola Emirimu',
    welcome: 'Tukwaniriza ku Grandland Construction Materials',
    heroText: 'Ebintu ebirungi ebikozesebwa mu kukola Uganda',
    heroSubtext: 'Amatafa, Amasasi, Amapave & Ebintu Ebirala',
    shopNow: 'Gula Kati',
    learnMore: 'Manya Ebisingawo',
    ourProducts: 'Ebintu Byaffe',
    viewAll: 'Laba Byonna',
    latestNews: 'Amawulire Amaggya & Ebitabo',
    readMore: 'Soma ebisingawo',
    subscribe: 'Wewandise ku Newsletter yaffe',
    subscribeText: 'Siga amawulire agaggya ku bintu byaffe n\'ebirala.',
    enterEmail: 'Yingiza email yo',
    subscribeBtn: 'Wewandise',
    allRights: 'Ebifaamu byonna biriko.',
    // Add more translations as needed
  }
};

let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem('language', lang);

  // Update text content based on translations
  updatePageText();
}

function updatePageText() {
  const t = translations[currentLang];

  // Update navigation
  document.querySelector('a[href="#home"]').textContent = t.home;
  document.querySelector('a[href="#about"]').textContent = t.about;
  document.querySelector('a[href="#products"]').textContent = t.products;
  document.querySelector('a[href="#projects"]').textContent = t.projects;
  document.querySelector('a[href="#testimonials"]').textContent = t.testimonials;
  document.querySelector('a[href="#faq"]').textContent = t.faq;
  document.querySelector('a[href="#blog"]').textContent = t.blog;
  document.querySelector('a[href="#careers"]').textContent = t.careers;
  document.querySelector('a[href="#team"]').textContent = t.team;
  document.querySelector('a[href="#contact"]').textContent = t.contact;
  document.getElementById('login-btn').textContent = t.login;
  document.getElementById('track-order-btn').textContent = t.trackOrder;

  // Update hero section
  document.querySelector('h1').textContent = t.welcome;
  document.querySelector('h1 + p').textContent = t.heroText;
  document.querySelector('h1 + p + p').textContent = t.heroSubtext;
  document.querySelector('.bg-green-700').textContent = t.shopNow;
  document.querySelector('.border-green-700').textContent = t.learnMore;

  // Update products section
  document.querySelector('#products h3').textContent = t.ourProducts;
  document.querySelector('#products .text-green-700').textContent = t.viewAll;

  // Update blog section
  document.querySelector('#blog h3').textContent = t.latestNews;
  document.querySelectorAll('#blog .text-green-700').forEach(el => el.textContent = t.readMore);

  // Update footer
  document.querySelector('#newsletter h4').textContent = t.subscribe;
  document.querySelector('#newsletter p').textContent = t.subscribeText;
  document.querySelector('#newsletter-form input').placeholder = t.enterEmail;
  document.querySelector('#newsletter-form button').textContent = t.subscribeBtn;
  document.querySelector('footer p').innerHTML = `&copy; ${new Date().getFullYear()} Grandland Construction Materials. ${t.allRights}`;
}

// Language toggle
const langToggle = document.getElementById('lang-toggle');
if (langToggle) {
  langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'lg' : 'en';
    setLanguage(newLang);
  });
}

// Load saved language on page load
const savedLang = localStorage.getItem('language') || 'en';
setLanguage(savedLang);

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
let orders = [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  const storedCart = localStorage.getItem('cart');
  cart = storedCart ? JSON.parse(storedCart) : [];
}

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalQuantity;
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
    updateCartCount();
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
  updateCartCount();
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
    updateCartCount();
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
  updateCartCount();
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

function createOrder() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const orderId = 'ORD-' + Date.now();
  const order = {
    id: orderId,
    date: new Date().toISOString().split('T')[0],
    items: [...cart],
    total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    status: 'Processing'
  };

  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  // Clear cart after order
  cart = [];
  saveCart();
  renderCart();
  renderCartDropdown();

  alert(`Order placed successfully! Order ID: ${orderId}`);
  return orderId;
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

  
// Payment method selection handling
document.querySelectorAll('input[name="payment"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    const cardInfoForm = document.getElementById('card-info-form');
    const momoQrContainer = document.getElementById('momo-qr-container');
    if (e.target.value === 'visa') {
      cardInfoForm.classList.remove('hidden');
      momoQrContainer.classList.add('hidden');
    } else if (e.target.value === 'mobile-money') {
      cardInfoForm.classList.add('hidden');
      momoQrContainer.classList.remove('hidden');
    } else {
      cardInfoForm.classList.add('hidden');
      momoQrContainer.classList.add('hidden');
    }
  });
});

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registered'))
      .catch(error => console.log('SW registration failed'));
  });
}

// Calculate and display years in business
const foundingDate = new Date(2022, 0, 1); // January 1, 2022
const now = new Date();
let years = now.getFullYear() - foundingDate.getFullYear();
const monthDiff = now.getMonth() - foundingDate.getMonth();
if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < foundingDate.getDate())) {
  years--;
}
document.getElementById('years-in-business').textContent = years;

// Contact form validation and submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Check honeypot field for spam prevention
  const honeypot = this.honeypot.value.trim();
  if (honeypot) {
    // If honeypot is filled, treat as spam and do not submit
    console.warn('Spam detected: honeypot field filled.');
    return;
  }

  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();

  let isValid = true;

  // Hide all error messages
  document.querySelectorAll('.error-message').forEach(el => el.classList.add('hidden'));

  // Validate name
  if (!name) {
    document.getElementById('name-error').classList.remove('hidden');
    isValid = false;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    document.getElementById('email-error').classList.remove('hidden');
    isValid = false;
  }

  // Validate message
  if (!message) {
    document.getElementById('message-error').classList.remove('hidden');
    isValid = false;
  }

  if (isValid) {
    const submitBtn = document.getElementById('contact-submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Submit the form
    fetch(this.action, {
      method: this.method,
      body: new FormData(this),
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        document.getElementById('contact-success').classList.remove('hidden');
        document.getElementById('contact-error').classList.add('hidden');
        this.reset();
      } else {
        throw new Error('Form submission failed');
      }
    }).catch(error => {
      document.getElementById('contact-error').classList.remove('hidden');
      document.getElementById('contact-success').classList.add('hidden');
    }).finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    });
  }
});
