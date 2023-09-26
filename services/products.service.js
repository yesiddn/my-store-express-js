const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const pool = require('../libs/postgres.pool');

class ProductsService {
  constructor() {
    // Guardado en memoria volatil
    this.products = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    // return this.products;

    // emulacion de demora
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(this.products);
    //   }, 2000);
    // });

    const query = 'SELECT * FROM tasks';
    const response = await this.pool.query(query);
    return response.rows;
  }

  async findOne(id) {
    // const name = this.getTotal(); // error, prueba de manejo de errores con middleware
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      throw boom.notFound('Product not found');
    }
    // regla o logica de negocio
    if (product.isBlock) {
      throw boom.conflict('Product is blocked');
    }

    return product;
  }

  async update(id, changes) {
    // update(id, data) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      // throw new Error('Not found'); // envio de error de forma explicita
      throw boom.notFound('Product not found'); // envio de error con http status code
    }

    this.products[index] = {
      ...this.products[index],
      ...changes,
    };

    // patch method
    // const product = this.products[index];
    // this.products[index] = {...product, ...data}

    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      // throw new Error('Not found');
      throw boom.notFound('Product not found');
    }

    this.products.splice(index, 1);
    return { id, message: 'Deleted' };
  }
}

module.exports = ProductsService;
