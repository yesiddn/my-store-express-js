const { faker } = require('@faker-js/faker');

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

  create() {}

  find() {
    return this.categories;
  }

  findOne(id) {
    return this.categories.find((item) => item.id === id);
  }

  update() {}

  delete() {}
}

module.exports = CategoriesService;
