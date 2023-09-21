const express = require('express');
// const { faker } = require('@faker-js/faker');
const ProductsService = require('../services/products.service');

const router = express.Router();
const service = new ProductsService();

// products array
// function getProducts(size = 100) {
//   const products = [];
//   const limit = size;

//   for (let i = 0; i < limit; i++) {
//     products.push({
//       id: i + 1,
//       name: faker.commerce.productName(),
//       price: parseInt(faker.commerce.price(), 10),
//       image: faker.image.url(),
//     });
//   }

//   return products;
// }

// app.get('/products', (req, res) => { //> para separar responsabilidades, el router no se manejaria con '/products' sino con '/' dejando solo la especificidad
router.get('/', async (req, res) => {
  // Los query params son opcionales, se pueden eviar asi: /products?size=10
  // const { size } = req.query;
  // const products = getProducts(size);
  const products = await service.find();
  res.json(products);
});

// endpoint estatico o especifico deben ir primero que los dinamicos
router.get('/filter', async (req, res) => {
  res.send('Soy un filter');
});

// endpoint dinamico
router.get('/:id', async (req, res, next) => {
  // el error se debe capturar de forma explicita en el router
  /* const params = req.params;
  {
    params: {
      id: 1
    }
  }
  */
  // const id = req.params.id;

  try {
    const { id } = req.params; // forma destructurada

    // if (id === '999') {
    //   res.status(404).json({
    //     message: 'Not found',
    //   });
    // } else {
    //   res.status(200).json({
    //     id,
    //     name: 'Product 2',
    //     price: 2000,
    //   });
    // }

    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error); // se agrega el next para atrapar de forma explicita el error con el middleware
  }
}); // :id es un parametro

router.post('/', async (req, res) => {
  const body = req.body;

  const newProduct = await service.create(body);

  // res.status(201).json({
  //   message: 'Created',
  //   data: body,
  // });
  res.status(201).json(newProduct);
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const product = await service.update(id, body);

    // res.json({
    //   message: 'Updated',
    //   data: body,
    //   id,
    // });
    res.json(product);
  } catch (error) {
    // res.status(404).json({
    //   message: error.message,
    // });
    next(error);
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  res.json({
    message: 'Updated',
    data: body,
    id,
  });
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await service.delete(id);

    // res.json({
    //   message: 'Deleted',
    //   id
    // });
    res.status(204).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
