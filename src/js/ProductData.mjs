const baseURL = import.meta.env.VITE_SERVER_URL + '/';

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
  }
  async getData(category) {
  const url = `${baseURL}products/search/${category}`;
  console.log("🔗 Fetching:", url);

  const response = await fetch(url);
  const text = await response.text();
  console.log("🧾 Raw response text:", text);

  const data = JSON.parse(text); 
  return data.Result;
}
  async findProductById(id) {
    const response = await fetch(`${baseURL}/product/${id}`);
    const data = await convertToJson(response);
    console.log(data.Result);
    return data.Result;
  }
}
