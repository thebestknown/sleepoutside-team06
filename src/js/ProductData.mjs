const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {}

  async getData(category) {
    const url = `${baseURL}products/search/${category}`;
    console.log("🔗 Fetching:", url); // <-- importante para depurar
    const response = await fetch(url);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const url = `${baseURL}product/${id}`;
    console.log("🔗 Fetching product by ID:", url);
    const response = await fetch(url);
    const data = await convertToJson(response);
    return data.Result;
  }
}
