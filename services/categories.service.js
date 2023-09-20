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

  create(data) {
    const newCategory = {
      id: faker.string.uuid(),
      ...data,
    };

    this.categories.push(newCategory);
    return newCategory;
  }

  find() {
    return this.categories;
  }

  findOne(id) {
    return this.categories.find((item) => item.id === id);
  }

  update(id, { name, image }) {
    const index = this.categories.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error('Not found');
    }

    this.categories[index] = {
      id,
      name,
      image,
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
