const { faker } = require('@faker-js/faker');

class ProductsService {
  constructor() {
    // Guardado en memoria volatil
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
      });
    }
  }

  create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find((item) => item.id === id);
  }

  update(id, { name, price, image }) {
  // update(id, data) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error('Not found');
    }

    this.products[index] = {
      id,
      name,
      price,
      image,
    };
    
    // patch method
    // const product = this.products[index];
    // this.products[index] = {...product, ...data}

    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error('Not found');
    }

    this.products.splice(index, 1);
    return { id, message: 'Deleted' };
  }
}

module.exports = ProductsService;
