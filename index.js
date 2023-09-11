// Example: Hello, my server in express! (https://expressjs.com/en/starter/hello-world.html)
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, my server in express!');
});

app.get('/new-endpoint', (req, res) => {
  res.send('Hello, this is a new endpoint!');
});

app.get('/products', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Product 1',
      price: 1000,
    },
    {
      id: 2,
      name: 'Product 2',
      price: 2000,
    },
  ]);
});

app.get('/products/:id', (req, res) => {
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

app.get('/categories', (req, res) => {
  res.json([
    {
    id: 1,
    name: 'Category 1',
    },
    {
      id: 2,
      name: 'Category 2',
    }
  ]);
});

app.get('/categories/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Category 1',
  });
});

app.get('/people', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Person 1',
    },
    {
      id: 2,
      name: 'Person 2',
    },
  ]);
});

app.get('/people/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Person 1',
  });
});

// app.get('/categories/:categoryId/products/:productId', (req, res) => {
//   const { categoryId, productId } = req.params;
//   res.json({
//     categoryId,
//     productId,
//   });
// });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`); // se marca el console.log() por eslint, ya que es una mala practica en produccion
});
