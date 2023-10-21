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

function checkAdminRole(req, res, next) {
  const user = req.user;
  if (user.role === 'admin') {
    next();
  } else {
    next(boom.unauthorized('You are not an admin'));
  }
}

function checkRoles(...roles) {
  // para tener un mejor manejo de permisos se puede usar la libreria accesscontrol (https://onury.io/accesscontrol/)
  return (req, res, next) => {
    console.log(roles);
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized('You are not an admin'));
    }
  }
}

module.exports = { checkApiKey, checkAdminRole, checkRoles };
