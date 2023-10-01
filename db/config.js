const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  // ambientes
  development: {
    url: URI,
    // url: config.dbUrl,
    dialect: 'postgres',
  },
  production: {
    // url: URI,
    url: config.dbUrl,
    dialect: 'postgres',
  }
  
};
