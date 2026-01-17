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

  } catch (error) {

  }
}

console.log(products)