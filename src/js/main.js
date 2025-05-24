import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./alert.js";

loadHeaderFooter(); //we were missing this

//showing alerts
const alerts = new Alert();
alerts.init();

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();
