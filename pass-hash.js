const bcrypt = require('bcrypt');

const myPass = 'admin123';

async function hashPassword(password) {
  const hash = await bcrypt.hashSync(password, 10); // async (password, salt) > salt is the number of rounds to process the data for. (default is 10)
  console.log(hash);
}

hashPassword(myPass); // return > $2b -> bcrypt version, 10 -> number of rounds, 31 characters -> hash
