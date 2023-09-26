const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'jess',
  password: 'admin',
  database: 'my_store',
});

module.exports = pool;
