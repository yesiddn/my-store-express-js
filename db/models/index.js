// Este archivo se encarga de enviar la conexion hacia los modelos y con esto va a poder hacer todo el mapeo y serializacion de los datos que se van a guardar en la base de datos
// Va a contener toda la configuracion y el setup inicial de sequelize con los modelos

const { User, UserSchema } = require('./user.model');
// aqui se importan todos los modelos que se van a usar en la aplicacion

// funcion que tambien recibe la conexion a la base de datos
function setupModels(sequelize) {
  // Se inicializa el modelo y se le pasa el schema y la configuracion
  User.init(UserSchema, User.config(sequelize));
}

// se exporta la funcion
module.exports = setupModels;