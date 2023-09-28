'use strict';

// En la primer migracion se crean las tablas en la base de datos
const {UserSchema, USER_TABLE} = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // queryInterface es una instancia de sequelize que nos permite ejecutar unos comandos
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  // opcion para revertir la migracion o hacer un rollback
  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable(USER_TABLE);
  }
};
