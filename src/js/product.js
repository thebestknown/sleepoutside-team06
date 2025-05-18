import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

// console.log(dataSource.findProductById(productId));

const product = new ProductDetails(productId, dataSource);
// Call the init() method using the class instance
product.init();
