const express = require('express');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');

function routerApi(app) {
  // para crear un path padre para todos los endpoints existen dos formas:
  // app.use('/api/v1/products', productsRouter);

  const router = express.Router();
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  
  app.use('/api/v1', router);
}

module.exports = routerApi;
