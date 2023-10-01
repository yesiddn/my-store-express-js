const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : console.log,
};

// Sequelize ya usa por defecto el pool de conexiones
// const sequelize = new Sequelize(
//   URI,
//   {
//     dialect: 'postgres',
//     // dialect: 'mysql',
//     // logging: true, // Para ver las consultas que se hacen a la base de datos. La opcion TRUE esta deprecated, ahora se usa un console.log o un callback
//     logging: console.log,
//   }
// );
const sequelize = new Sequelize(config.dbUrl, options);

// se inicializan los modelos
setupModels(sequelize);

// se hace la sincronizacion de los modelos con la base de datos, es decir, se crean las tablas en la base de datos
// Una vez se tiene el build de la migracion se puede comentar esta linea. Todo se hace con migraciones
// sequelize.sync(); //  Empieza a leer los modelos, crea tablas y hace relist (se sobrescribe información), no se aconseja que se corra en producción. Es mejor sincronizar con un sistema de migraciones.

module.exports = sequelize;
