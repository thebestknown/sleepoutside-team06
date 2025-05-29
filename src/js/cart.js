import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", function () {
        const idToRemove = this.dataset.id;
        removeFromCart(idToRemove);
      });
    });
  } else {
    document.querySelector(".product-list").innerHTML =
      "<p>Your cart is empty.</p>";
  }

  calculateCartTotal();
}

function removeFromCart(productId) {
  let cart = getLocalStorage("so-cart") || [];
  const updatedCart = cart.filter((item) => item.Id !== productId);
  localStorage.setItem("so-cart", JSON.stringify(updatedCart));
  renderCartContents();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="remove-item" data-id="${item.Id}">❌</button>
</li>`;

  return newItem;
}

function calculateCartTotal() {
  const cart = getLocalStorage("so-cart") || [];
  const total = cart.reduce((sum, item) => sum + Number(item.FinalPrice), 0);

  const totalElement = document.querySelector("#cartTotal");
  if (totalElement) {
    totalElement.textContent = total.toFixed(2);
  }

  const footer = document.querySelector(".cart-footer");
  if (footer) {
    footer.classList.toggle("hide", cart.length === 0);
  }
}

renderCartContents();
