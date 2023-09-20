const { faker } = require('@faker-js/faker');

class UsersService {
  constructor() {
    // Guardado en memoria volatil
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 25;

    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        job: faker.person.jobArea()
      });
    }
  }

  create(data) {
    const newUser = {
      id: faker.string.uuid(),
      ...data,
    };

    this.users.push(newUser);
    return newUser;
  }

  find() {
    return this.users;
  }

  findOne(id) {
    return this.users.find((item) => item.id === id);
  }

  update(id, { name, job }) {
    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error('Not found');
    }

    this.users[index] = {
      id,
      name,
      job,
    };
    return this.users[index];
  }

  delete(id) {
    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error('Not found');
    }

    this.users.splice(index, 1);
    return { id, message: 'Deleted' };
  }
}

module.exports = UsersService;
