import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  if (cartItems.length > 0) {
    showCartFooter(cartItems);
  }
}

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#"><h2 class="card__name">${item.Name}</h2></a>
      <p class="cart-card__color">${item.Colors[0]?.ColorName || "N/A"}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;
}

function showCartFooter(cartItems) {
  const total = cartItems.reduce((sum, item) => sum + Number(item.FinalPrice), 0);
  document.getElementById("cartTotal").textContent = total.toFixed(2);
  document.querySelector(".cart-footer").classList.remove("hide");
}

renderCartContents();
