const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

// products array
function getProducts(size = 100) {
  const products = [];
  const limit = size;

  for (let i = 0; i < limit; i++) {
    products.push({
      id: i + 1,
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
    });
  }

  return products;
}

// app.get('/products', (req, res) => { //> parar separar responsabilidades, el router no se manejaria con '/products' sino con '/' dejando solo la especificidad
router.get('/', (req, res) => {
  const { size } = req.query;
  const products = getProducts(size);
  res.json(products);
});

// endpoint estatico o especifico deben ir primero que los dinamicos
router.get('/filter', (req, res) => {
  res.send('Soy un filter');
});

// endpoint dinamico
router.get('/:id', (req, res) => {
  /* const params = req.params;
  {
    params: {
      id: 1
    }
  }
  */
  // const id = req.params.id;

  const { id } = req.params; // forma destructurada
  res.json({
    id,
    name: 'Product 2',
    price: 2000,
  });
}); // :id es un parametro

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'Created',
    data: body
  });
});

module.exports = router;
