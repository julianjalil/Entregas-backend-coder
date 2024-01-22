class ProductManager {
  constructor(products) {
    this.products = [];
    this.nextProductCode = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !code || !stock) {
      console.error("Todos los campos son obligatorios.");
      return null;
    }

    if (
      this.products.find((product) => product.code === this.nextProductCode)
    ) {
      console.error(
        `Error: Ya existe un producto con code ${this.nextProductCode}.`
      );
      return null;
    }

    const newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.nextProductCode++;
    this.products.push(newProduct);
  }

  getProducts() {
    return this.products;
  }

  getProductByCode(productCode) {
    const product = this.products.find(
      (product) => product.code === productCode
    );

    if (product) {
      return product;
    } else {
      console.log("Not found");
      return null;
    }
  }
}
