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

loadProducts()


function renderFeaturedProducts() {
  const container = document.getElementById('featuredProducts');
  const featured = products.slice(0, 2);

  container.innerHTML = featured.map((product, index) =>
    `
      <div class="featured-product">
        <div class="product-badge ${index === 1 ? "dark" : ""}">
          
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

  container.innerHTML =
}

