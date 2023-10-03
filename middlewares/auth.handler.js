const boom = require('@hapi/boom');
const { config } = require('../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];

  // validacion de forma directa desde variable de entorno
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized('Invalid API Key'));
  }
}

module.exports = { checkApiKey };
