function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductDetails  {
  constructor(productId, dataSource){
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
}

  getData() {
    return fetch(this.path)
      .then(convertToJson).then((data) => data);
  }
  async findProductById(id) {
    const products = await this.getData()
    return products.find((item) => item.Id === id);
  }
}