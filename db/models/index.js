// Este archivo se encarga de enviar la conexion hacia los modelos y con esto va a poder hacer todo el mapeo y serializacion de los datos que se van a guardar en la base de datos
// Va a contener toda la configuracion y el setup inicial de sequelize con los modelos

// aqui se importan todos los modelos que se van a usar en la aplicacion
const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Category, CategorySchema } = require('./category.model');
const { Product, ProductSchema } = require('./product.model');
const { Order, OrderSchema } = require('./order.model');

// funcion que tambien recibe la conexion a la base de datos
function setupModels(sequelize) {
  // Se inicializa el modelo y se le pasa el schema y la configuracion
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));

  // se llama la funcion associate de cada modelo para que se puedan asociar entre si
  User.associate(sequelize.models);
  Customer.associate(sequelize.models); // los customers ya tenian una asocion, asi que para agregar una nueva asociacion simplemente se deja asi ya que la funcion se encarga de agregar todas las asociaciones existentes
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
}

// se exporta la funcion
module.exports = setupModels;