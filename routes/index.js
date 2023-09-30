const express = require('express');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const customerRouter = require('./customers.router');
const ordersRouter = require('./orders.router');

function routerApi(app) {
  // para crear un path padre para todos los endpoints existen dos formas:
  // app.use('/api/v1/products', productsRouter);

  const router = express.Router();
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customerRouter);
  router.use('/orders', ordersRouter)
  
  app.use('/api/v1', router);
}

module.exports = routerApi;
