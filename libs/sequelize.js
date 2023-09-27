const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// Sequelize ya usa por defecto el pool de conexiones
const sequelize = new Sequelize(
  URI,
  {
    // dialect: 'postgres',
    dialect: 'mysql',
    // logging: true, // Para ver las consultas que se hacen a la base de datos. La opcion TRUE esta deprecated, ahora se usa un console.log o un callback
    logging: console.log,
  }
);

// se inicializan los modelos
setupModels(sequelize);

// se hace la sincronizacion de los modelos con la base de datos, es decir, se crean las tablas en la base de datos
sequelize.sync();


module.exports = sequelize;
