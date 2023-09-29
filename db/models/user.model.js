const { Model, DataTypes, Sequelize } = require('sequelize');

// una buena practica es comenzar definiendo el nombre de la tabla
const USER_TABLE = 'users';
// schema que define la estructura de la base de datos. Diferente de los Schemas de Joi que definen la estructura de los datos que se reciben en el request
const UserSchema = {
  id: {
    allowNull: false, // permite o no que el campo sea nulo
    autoIncrement: true, // permite o no que el campo se autoincremente
    primaryKey: true, // permite o no que el campo sea una llave primaria
    type: DataTypes.INTEGER, // define el tipo de dato que se va a guardar en la base de datos
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true, // permite o no que el campo sea unico
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
  createdAt: {
    // nombre del campo como se quiere manipular en JS
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at', // permite definir el nombre del campo en la base de datos
    defaultValue: Sequelize.NOW, // permite definir un valor por defecto para el campo
  },
};

// esto permite usar metodos como create, findAll, findOne, etc. Este modelo tiene todos los metodos en que vamos a hacer queries a la base de datos
class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer, { as: 'customer', foreignKey: 'userId' });
  }

  // este metodo permite definir la configuracion del modelo y recibe como parametro la conexion a la base de datos. Retorna la configuracion del modelo
  static config(sequelize) {
    return {
      sequelize, // conexion a la base de datos
      tableName: 'users', // nombre de la tabla
      modelName: 'User', // nombre del modelo
      timestamps: false, // permite o no que se creen los campos createdAt y updatedAt
    };
  }
}

// exporta el modelo
module.exports = { USER_TABLE, UserSchema, User };