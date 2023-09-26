const { faker } = require('@faker-js/faker');
// const getConetion = require('../libs/postgres');
const pool = require('../libs/postgres.pool');
const {models} = require('../libs/sequelize'); // cada vez que en sequelize llamamos al setupModels que ejecuta el .init, se exporta el objeto models (namespace o espacio de nombres reservados) que contiene todos los modelos que se han inicializado
// En user.model.js en la configuracion se pone un atributo modelName, el cual es el nombre del modelo que se va a usar en el namespace models

class UsersService {
  constructor() {
    // Guardado en memoria volatil
    this.users = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
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

  async find() {
    // const client = await getConetion();
    // const response = await client.query('SELECT * FROM tasks');
    // return response.rows;

    // return this.users;

    // const query = 'SELECT * FROM tasks';
    // const response = await this.pool.query(query);
    // return response.rows;

    const respose = await models.User.findAll();
    return respose;
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
