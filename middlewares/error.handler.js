const boom = require('@hapi/boom');
const { ValidationError } = require('sequelize');
// función que hos hara llegar a un middleware de tipo error
function logErrors(err, req, res, next) {
  console.log('logErrors'); // para saber quien se esta ejecutando
  console.error(err);
  next(err); // importante para saber que se esta enviando a un middleware de tipo error, si no tiene el error dentro entonces se esta mandando a uno normal
}

// función para crear formato de error
function errorHandler(err, req, res, next) {
  console.log('errorHandler'); // para saber quien se esta ejecutando
  res.status(500).json({ // mala practica, cada vez que tenemos un error enviamos un 500, primero, un error 500 se debe evitar y segundo, lo ideal es que dependiendo del error se envie un codigo de error diferente
    message: err.message,
    stack: err.stack,
  });
}

// esta funcion nos dara un error: Cannot set headers after they are sent to the client. Esto por no tener un return en el res.status(500).json o un else en el if
// middleware para manejo de errores con Boom
// function boomErrorHandler(err, req, res, next) {
//   if (err.isBoom) {
//     const { output } = err;
//     res.status(output.statusCode).json(output.payload);
//   }
//   next(err);
// }

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

function queryErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    // error hanling with boom
    boomErrorHandler(boom.conflict(err.errors[0].message), req, res, next);

    // error handling with express
    // res.status(409).json({
    //   statusCode: 409,
    //   message: err.name,
    //   errors: err.errors,
    // });
  }
  next(err);
}

module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler,
  queryErrorHandler,
};