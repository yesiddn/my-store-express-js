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

module.exports = { logErrors, errorHandler };