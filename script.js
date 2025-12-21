
const STORAGE_CART_KEY = 'greenhub_cart';
const STORAGE_USER_KEY = 'greenhub_user';
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cart));
}

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_USER_KEY));
  } catch {
    return null;
  }
}

function saveUser(user) {
  if (user) {
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_USER_KEY);
  }
}

const cartBadge = document.getElementById('cartCount') || document.querySelector('.cart-badge');
const cartLink = document.querySelector('.cart-link');
const accountIcon = document.getElementById('Accountsection');

function getCartItemCount(cart) {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartBadge() {
  if (!cartBadge) return;
  const cart = loadCart();
  cartBadge.textContent = getCartItemCount(cart);
}

function updateNavbarUser() {
  const user = loadUser();
  if (!accountIcon) return;

  let usernameSpan = document.querySelector('.nav-username');

  if (user && user.email) {
    if (!usernameSpan) {
      usernameSpan = document.createElement('span');
      usernameSpan.className = 'nav-username';
      accountIcon.parentElement.appendChild(usernameSpan);
    }
    const name = user.email.split('@')[0];
    usernameSpan.textContent = `(${name})`;
  } else if (usernameSpan) {
    usernameSpan.remove();
  }
}

const authOverlay = document.getElementById('authOverlay');
const authForm = document.getElementById('authForm');
const authToggleMode = document.getElementById('authToggleMode');
const authSubmitBtn = document.getElementById('authSubmitBtn');
const authModalTitle = document.getElementById('authModalTitle');

let authMode = 'login';

function setAuthMode(mode) {
  authMode = mode;

  if (!authModalTitle || !authSubmitBtn || !authToggleMode) return;

  if (mode === 'login') {
    authModalTitle.textContent = 'Welcome back';
    authSubmitBtn.textContent = 'Log in';
    authToggleMode.textContent = 'Create an account';
  } else {
    authModalTitle.textContent = 'Create your account';
    authSubmitBtn.textContent = 'Sign up';
    authToggleMode.textContent = 'Already have an account? Log in';
  }
}

function openAuthModal() {
  if (!authOverlay) return;

  const existingUser = loadUser();
  if (existingUser) {
    const wantsLogout = confirm(`Logged in as ${existingUser.email}. Do you want to log out?`);
    if (wantsLogout) {
      saveUser(null);
      updateNavbarUser();
      alert('You have been logged out.');
    }
    return;
  }

  setAuthMode('login');
  authOverlay.classList.add('show');
  authOverlay.setAttribute('aria-hidden', 'false');
}

function closeAuthModal() {
  if (!authOverlay) return;
  authOverlay.classList.remove('show');
  authOverlay.setAttribute('aria-hidden', 'true');
}

if (authToggleMode) {
  authToggleMode.addEventListener('click', () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  });
}

if (authForm) {
  authForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('authEmail').value.trim();
    const password = document.getElementById('authPassword').value.trim();

    if (!email || !password) {
      alert('Please fill in both email and password.');
      return;
    }

    saveUser({ email });
    updateNavbarUser();
    closeAuthModal();

    alert(authMode === 'login'
      ? 'Logged in successfully.'
      : 'Account created and logged in.'
    );

    authForm.reset();
  });
}

if (authOverlay) {
  authOverlay.addEventListener('click', (e) => {
    const clickedOutside = e.target === authOverlay;
    const wantsClose = e.target.hasAttribute('data-close-auth');
    if (clickedOutside || wantsClose) {
      closeAuthModal();
    }
  });
}

const cartOverlay = document.getElementById('cartOverlay');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotalItems = document.getElementById('cartTotalItems');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const cartClearBtn = document.getElementById('cartClearBtn');

function formatCurrency(amount) {
  return '₹' + amount.toLocaleString();
}

function renderCart() {
  if (!cartItemsContainer) return;

  const cart = loadCart();
  cartItemsContainer.innerHTML = '';

  if (!cart.length) {
    cartItemsContainer.innerHTML =
      '<p class="cart-empty">Your cart is empty. Add some plants to see them here.</p>';
    if (cartTotalItems) cartTotalItems.textContent = '0';
    if (cartTotalPrice) cartTotalPrice.textContent = '₹0';
    return;
  }

  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach((item, index) => {
    totalItems += item.qty;
    totalPrice += item.price * item.qty;

    const row = document.createElement('div');
    row.className = 'cart-item-row';

    const imgSrc = item.img || 'img/indoor.jpg';

    row.innerHTML = `
      <div class="cart-item-main">
        <img src="${imgSrc}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <span class="cart-item-name">${item.name}</span>
          <span class="cart-item-meta">₹${item.price} × ${item.qty}</span>
        </div>
      </div>
      <button class="btn btn-sm btn-outline-light-green" data-remove-index="${index}">Remove</button>
    `;
    cartItemsContainer.appendChild(row);
  });

  if (cartTotalItems) cartTotalItems.textContent = String(totalItems);
  if (cartTotalPrice) cartTotalPrice.textContent = formatCurrency(totalPrice);
}

function openCartModal() {
  if (!cartOverlay) return;
  renderCart();
  cartOverlay.classList.add('show');
  cartOverlay.setAttribute('aria-hidden', 'false');
}

function closeCartModal() {
  if (!cartOverlay) return;
  cartOverlay.classList.remove('show');
  cartOverlay.setAttribute('aria-hidden', 'true');
}

if (cartOverlay) {
  cartOverlay.addEventListener('click', (e) => {
    const clickedOutside = e.target === cartOverlay;
    const wantsClose = e.target.hasAttribute('data-close-cart');

    if (clickedOutside || wantsClose) {
      closeCartModal();
      return;
    }

    const removeBtn = e.target.matches('[data-remove-index]')
      ? e.target
      : e.target.closest('[data-remove-index]');

    if (removeBtn) {
      const index = Number(removeBtn.getAttribute('data-remove-index'));
      const cart = loadCart();
      cart.splice(index, 1);
      saveCart(cart);
      updateCartBadge();
      renderCart();
    }
  });
}

if (cartClearBtn) {
  cartClearBtn.addEventListener('click', () => {
    if (!confirm('Clear all items from cart?')) return;
    saveCart([]);
    updateCartBadge();
    renderCart();
  });
}

const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');

function filterProducts() {
  if (!productsGrid) return;

  const searchValue = (searchInput?.value || '').toLowerCase();
  const categoryValue = categoryFilter ? categoryFilter.value : 'all';

  const cards = productsGrid.querySelectorAll('.col');

  cards.forEach((card) => {
    const name = (card.dataset.name || '').toLowerCase();
    const category = card.dataset.category || '';

    const matchesSearch = name.includes(searchValue);
    const matchesCategory = categoryValue === 'all' || category === categoryValue;

    card.style.display = matchesSearch && matchesCategory ? '' : 'none';
  });
}

function sortProducts() {
  if (!productsGrid || !sortFilter) return;

  const value = sortFilter.value;
  if (value === 'default') return;

  const cards = Array.from(productsGrid.querySelectorAll('.col'));

  cards.sort((a, b) => {
    const priceA = Number(a.dataset.price);
    const priceB = Number(b.dataset.price);

    if (value === 'price-asc') return priceA - priceB;
    if (value === 'price-desc') return priceB - priceA;
    return 0;
  });

  cards.forEach((card) => productsGrid.appendChild(card));
}

if (searchInput) searchInput.addEventListener('input', filterProducts);
if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
if (sortFilter) sortFilter.addEventListener('change', sortProducts);

if (productsGrid) {
  productsGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.addToCart');
    if (!btn) return;

    const card = btn.closest('.col');
    if (!card) return;

    const name = card.dataset.name;
    const price = Number(card.dataset.price);
    const img = card.querySelector('img')?.getAttribute('src') || '';

    if (!name || !price) return;

    const cart = loadCart();
    const existing = cart.find((item) => item.name === name);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, qty: 1, img });
    }

    saveCart(cart);
    updateCartBadge();
    alert(`${name} added to cart!`);
  });
}

function applyCategoryFromUrl() {
  if (!categoryFilter) return;
  const params = new URLSearchParams(window.location.search);
  const urlCategory = params.get('category');
  if (urlCategory) {
    categoryFilter.value = urlCategory;
    filterProducts();
  }
}

const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent.');
    contactForm.reset();
  });
}


if (cartLink) {
  cartLink.addEventListener('click', (e) => {
    e.preventDefault();
    openCartModal();
  });
}

if (accountIcon) {
  accountIcon.addEventListener('click', (e) => {
    e.preventDefault();
    openAuthModal();
  });
}


updateCartBadge();
updateNavbarUser();

if (window.location.pathname.includes('shop.html')) {
  applyCategoryFromUrl();
}
