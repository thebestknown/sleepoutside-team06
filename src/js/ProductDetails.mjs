import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";

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
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
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
