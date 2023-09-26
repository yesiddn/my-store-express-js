const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// Sequelize ya usa por defecto el pool de conexiones
const sequelize = new Sequelize(
  URI,
  {
    dialect: 'postgres',
    // logging: true, // Para ver las consultas que se hacen a la base de datos. La opcion TRUE esta deprecated, ahora se usa un console.log o un callback
    logging: console.log,
  }
);

module.exports = sequelize;
