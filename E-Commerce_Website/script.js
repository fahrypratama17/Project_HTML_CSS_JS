let products = [];
let cart = [];
let currentCategory = "all";

async function loadProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Error fetching the data...');
    }
    products = await response.json();
    console.log('data product:',products);

    renderFeaturedProducts();
    renderProducts();

  } catch (error) {
      console.error('Error Loading products...', error);
  }
}

function renderFeaturedProducts() {
  const container = document.getElementById('featuredProducts');
  const featured = products.slice(0, 2);

  container.innerHTML = featured.map((product, index) =>
    `
      <div class="featured-product">
        <div class="product-badge ${index === 1 ? "dark" : ""}">
          Something Here
        </div>
        
        <button class="wishlist-btn" onclick="toggleWishlist(${product.id})">
          <i class="far fa-heart"></i>
        </button>
      
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <div class="product-info">
          <h4>${product.title.substring(0, 30)}...</h4>
          <button class="product-price ${index === 1 ? "dark" : ""}" onclick="addToCart(${product.id})">
            $${product.price}
          </button>
        </div>
      </div>
    `
  ).join("");
}

function renderProducts() {
  const container = document.getElementById('productsGrid');
  const filteredProducts = currentCategory === 'all'
    ? products
    : products.filter((p) => p.category === currentCategory);

  if (filteredProducts.length === 0) {
    container.innerHTML =
      `  
        <div class="loading">
          <p>No products found</p>
        </div>  
      `
    ;
  }

  container.innerHTML = filteredProducts.map((product) =>
  `
    <div class="product-card">
      <button class="wishlist-btn" onclick="toggleWishlist(${product.id})">
        <i class="far fa-heart"></i>
      </button>
    
      <img src="${product.image}" alt="${product.title}" class="product-image">
      <div class="product-info">
      <h4>${product.title.substring(0, 40)}...</h4>
        <p style="color: #64748b; font-size: 0.9rem; margin: 0.5rem 0">
          $${product.price}
        </p>
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
          Add to Cart
        </button>
      </div>
    </div>
  `
  ).join("");
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({...product, quantity: 1});
  }

  updateCartUI();
  showNotification('Added to Cart');
  renderCheckout();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
  renderCheckout();
}

function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);

  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartUI();
      renderCheckout();
    }
  }
}

function toggleWishlist(productId) {
  const btn = document.querySelector(`[onclick="toggleWishlist(${productId})"] i`)

  if (btn.classList.contains('far')) {
    btn.className = "fas fa-heart";
    btn.style.color = '#ef4444';
  } else {
    btn.className = "fas fa-heart";
    btn.style.color = '';
  }
}

loadProducts();

const struct = `
        <div class="card-item">
          <img src="${item.image}" alt="${item.title}">
          <div class="cart-item-info">
            <div class="cart-item-title"></div>
            <div class="cart-item-price"></div>
            <div class="quantity-controls">
              <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
              <span style="padding: 0 0.5rem;">${item.quantity}</span>
              <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
              <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
          </div>
        </div>
`