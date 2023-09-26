const { Pool } = require('pg');

const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

// url de conexion a la base de datos
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// configuracion de la conexion automatica
const pool = new Pool({ connectionString: URI });

// configuracion de la conexion manual
// const pool = new Pool({
//   host: 'localhost',
//   port: 5432,
//   user: 'jess',
//   password: 'admin',
//   database: 'my_store',
// });

module.exports = pool;
