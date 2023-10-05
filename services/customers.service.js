const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class CustomerService {
  constructor() {}

  async find() {
    const response = await models.Customer.findAll({
      include: ['user'],
    });
    return response;
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id, {
      include: ['user'],
    });
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  async create(data) {
    // CREAR USUARIO Y CUSTOMER EN LA MISMA TRANSACCION
    // Forma larga
    // const newUser = await User.create(data);
    // const newCustomer = await models.Customer.create({
    //   ...data,
    //   userId: newUser.id,
    // });

    // Forma "corta"

    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = { ...data, user: { ...data.user, password: hash } };
    const newCustomer = await models.Customer.create(newData, {
      include: ['user'],
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const response = await model.update(changes);
    return response;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { message: 'Deleted' };
  }
}

module.exports = CustomerService;
