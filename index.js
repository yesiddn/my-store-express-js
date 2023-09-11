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
  res.json({
    id: 1,
    name: 'Product 1',
    price: 1000
  });
});

app.get('/categories', (req, res) => {
  res.json({
    id: 1,
    name: 'Category 1'
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`); // se marca el console.log() por eslint, ya que es una mala practica en produccion
});
