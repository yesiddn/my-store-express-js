// const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const { Op } = require('sequelize'); // operadores de sequelize para hacer consultas mas complejas

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

  // generate() {
  //   const limit = 100;

  //   for (let i = 0; i < limit; i++) {
  //     this.products.push({
  //       id: faker.string.uuid(),
  //       name: faker.commerce.productName(),
  //       price: parseInt(faker.commerce.price(), 10),
  //       image: faker.image.url(),
  //       isBlock: faker.datatype.boolean(),
  //     });
  //   }
  // }

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

  async find(query) {
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

    const options = {
      include: ['category'],
      where: {},
    };
    const { limit, offset, price, price_min, price_max } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    if (price) {
      options.where.price = price;
    } else if (price_min && price_max) {
      options.where.price = {
        // validacion de ambos valores
        // [Op.gte]: price_min, // gte = greater than or equal
        // [Op.lte]: price_max, // lte = less than or equal

        // valida que el valor este entre los dos valores
        [Op.between]: [price_min, price_max] // forma mas usada
      };
    }

    // consulta usando sequelize
    const products = await models.Product.findAll(options);
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
