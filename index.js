// Example: Hello, my server in express! (https://expressjs.com/en/starter/hello-world.html)
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  queryErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json()); // middleware para que express entienda el formato json en las peticiones

const whitelist = [
  'http://127.0.0.1:5500',
  'https://my-store-express-js.onrender.com/',
  'https://my-store-express-js-production-ef4b.up.railway.app/',
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  }
};
// app.use(cors()); // middleware para habilitar el cors en la app, habilitando el acceso a la api desde cualquier origen
app.use(cors(options)); 

// ---

app.get('/', (req, res) => {
  res.send('Hello, my server in express!');
});

app.get('/new-endpoint', (req, res) => {
  res.send('Hello, this is a new endpoint!');
});

routerApi(app);

// --- los middlewares de tipo error se deben poner despues de definir el rounting de la app
// > tambien es importante el orden en el que se pongan, de esta forma se ejecutaran de forma secuencial uno tras otro
app.use(logErrors);
app.use(queryErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler); // este middleware es el que se encarga de enviar la respuesta al cliente, por lo cual finaliza la ejecucion de la app
// app.use(logErrors); // en caso de ponerlo en esta posicion, nunca se ejecutaria

// app.get('/products', (req, res) => {
//   const { size } = req.query;
//   const products = getProducts(size);
//   res.json(products);
// });

// // endpoint estatico o especifico deben ir primero que los dinamicos
// app.get('/products/filter', (req, res) => {
//   res.send('Soy un filter');
// });

// // endpoint dinamico
// app.get('/products/:id', (req, res) => {
//   /* const params = req.params;
//   {
//     params: {
//       id: 1
//     }
//   }
//   */
//   // const id = req.params.id;

//   const { id } = req.params; // forma destructurada
//   res.json({
//     id,
//     name: 'Product 2',
//     price: 2000,
//   });
// }); // :id es un parametro

// app.get('/categories', (req, res) => {
//   res.json([
//     {
//       id: 1,
//       name: 'Category 1',
//     },
//     {
//       id: 2,
//       name: 'Category 2',
//     },
//   ]);
// });

// app.get('/categories/:id', (req, res) => {
//   const { id } = req.params;
//   res.json({
//     id,
//     name: 'Category 1',
//   });
// });

// app.get('/users', (req, res) => {
//   const { limit, offset } = req.query;

//   if (limit && offset) {
//     res.json([
//       {
//         id: 1,
//         name: 'Person 1',
//         limit,
//         offset,
//       },
//     ]);
//   } else {
//     res.json([
//       {
//         id: 1,
//         name: 'Person 1',
//       },
//       {
//         id: 2,
//         name: 'Person 2',
//       },
//     ]);
//   }
// });

// app.get('/users/:id', (req, res) => {
//   const { id } = req.params;
//   res.json({
//     id,
//     name: 'Person 1',
//   });
// });

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
