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
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
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
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById("productPrice").textContent = product.FinalPrice;
  document.getElementById("productColor").textContent =
    product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}
