const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const sequelize = require('../libs/sequelize');

class CategoriesService {
  constructor() {
    // Guardado en memoria volatil
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 5;

    for (let i = 0; i < limit; i++) {
      this.categories.push({
        id: faker.string.uuid(),
        name: faker.commerce.department(),
        image: faker.image.url(),
      });
    }
  }

  create(data) {
    const newCategory = {
      id: faker.string.uuid(),
      ...data,
    };

    this.categories.push(newCategory);
    return newCategory;
  }

  async find() {
    const query = 'SELECT * FROM tasks';

    // la respuesta que da es un array de dos posiciones, la primera es la data que contiene la respuesta de la consulta y la segunda es la metadata la cual contiene informacion sobre la consulta
    // const [data, metadata] = await sequelize.query(query); // Sequelize permite hacer consultas directas a la base de datos
    // return {data, metadata};
    
    const [data] = await sequelize.query(query);
    return data;
    // return this.categories;
  }

  findOne(id) {
    const category = this.categories.find((item) => item.id === id);

    if (!category) {
      throw boom.notFound('Category not found');
    }

    if (category.isBlock) {
      throw boom.conflict('Category is blocked');
    }

    return category;
  }

  update(id, changes) {
    const index = this.categories.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error('Not found');
    }

    this.categories[index] = {
      ...this.categories[index],
      ...changes,
    };
    return this.categories[index];
  }

  delete(id) {
    const index = this.categories.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error('Not found');
    }

    this.categories.splice(index, 1);
    return { id, message: 'Deleted' };
  }
}

module.exports = CategoriesService;
