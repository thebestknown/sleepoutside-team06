import ProductDetails from "./ProductDetails.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices("tents");
const productId = getParam("product");

// console.log(dataSource.findProductById(productId));

const product = new ProductDetails(productId, dataSource);
// Call the init() method using the class instance
product.init();

document.querySelector("#add-to-cart").addEventListener("click", () => {
  const cartIcon = document.querySelector(".cart-icon");
  cartIcon.classList.remove("animation");
  void cartIcon.offsetWidth;
  cartIcon.classList.add("animation");
});
