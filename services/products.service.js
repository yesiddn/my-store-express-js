const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

// const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');

class ProductsService {
  constructor() {
    // Guardado en memoria volatil
    // this.products = [];
    // this.generate();
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err));
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
    // const newProduct = {
    //   id: faker.string.uuid(),
    //   ...data,
    // };

    // this.products.push(newProduct);
    // return newProduct;

    const newProduct = await models.Product.create(data);
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

    // consulta usando pool
    // const query = 'SELECT * FROM tasks';
    // const response = await this.pool.query(query);
    // return response.rows;

    // consulta usando sequelize
    const products = await models.Product.findAll({
      include: ['category'],
    });
    return products;
  }

  async findOne(id) {
    // const name = this.getTotal(); // error, prueba de manejo de errores con middleware
    // const product = this.products.find((item) => item.id === id);

    // if (!product) {
    //   throw boom.notFound('Product not found');
    // }
    // // regla o logica de negocio
    // if (product.isBlock) {
    //   throw boom.conflict('Product is blocked');
    // }

    // return product;

    const product = await models.Product.findByPk(id, {
      include: ['category'],
    });
    if (!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async update(id, changes) {
    // update(id, data) {
    // const index = this.products.findIndex((item) => item.id === id);

    // if (index === -1) {
    //   // throw new Error('Not found'); // envio de error de forma explicita
    //   throw boom.notFound('Product not found'); // envio de error con http status code
    // }

    // this.products[index] = {
    //   ...this.products[index],
    //   ...changes,
    // };

    // // patch method
    // // const product = this.products[index];
    // // this.products[index] = {...product, ...data}

    // return this.products[index];

    const product = await this.findOne(id);
    const response = await product.update(changes);
    return response;
  }

  async delete(id) {
    // const index = this.products.findIndex((item) => item.id === id);

    // if (index === -1) {
    //   // throw new Error('Not found');
    //   throw boom.notFound('Product not found');
    // }

    // this.products.splice(index, 1);
    // return { id, message: 'Deleted' };

    const product = await this.findOne(id);
    await product.destroy();
    return { id, message: 'Deleted' };
  }
}

module.exports = ProductsService;
