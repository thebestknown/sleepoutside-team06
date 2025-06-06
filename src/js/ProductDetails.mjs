import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  
async init() {  
  this.product = await this.dataSource.findProductById(this.productId);
  this.renderProductDetails();
  document.getElementById('add-to-cart')
    .addEventListener('click', this.addProductToCart.bind(this));
}

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];

  // Look for the product by Id
  const existingItemIndex = cartItems.findIndex(item => item.Id === this.product.Id);

  if (existingItemIndex > -1) {
    // If product already exists, increment quantity
    if (!cartItems[existingItemIndex].quantity) {
      cartItems[existingItemIndex].quantity = 1;
    }
    cartItems[existingItemIndex].quantity += 1;
  } else {
    // If product doesn't exist, add it with quantity 1
    const productToAdd = { ...this.product, quantity: 1 };
    cartItems.push(productToAdd);
  }

  setLocalStorage("so-cart", cartItems);
}

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("#product-brand").textContent = product.Brand.Name;
  document.querySelector("#product-name").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("product-image");
  productImage.src = product.Images.PrimaryLarge;
  productImage.alt = product.NameWithoutBrand;

  document.querySelector("#product-price").textContent = `$${product.FinalPrice}`;
  document.querySelector("#product-color").textContent = product.Colors[0].ColorName;
  document.querySelector("#product-description").innerHTML = product.DescriptionHtmlSimple;

  document.querySelector("#add-to-cart").dataset.id = product.Id;
}
