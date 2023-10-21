const bcrypt = require('bcrypt');

const myPass = 'admin123';
const myHash = '$2b$10$U5IxumGanY612BPY05YsbeZFqIbmPI3xckb1Du8iE/JmGMnO91IGC';

async function verifyPassword(password, hash) {
  const isMatch = await bcrypt.compare(password, hash); // async (password, salt) > salt is the number of rounds to process the data for. (default is 10)
  console.log(isMatch);
}

verifyPassword(myPass, myHash); // return > $2b -> bcrypt version, 10 -> number of rounds, 31 characters -> hash
