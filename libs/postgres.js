const { Client } = require('pg');

async function getConetion() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'jess',
    password: 'admin',
    database: 'my_store',
  });

  await client.connect();
  return client;
}

module.exports = getConetion;
