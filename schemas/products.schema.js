// tambien se pueden encontrar los schemas como DTOs (Data Transfer Object)

const Joi = require('joi');

// schema especifico para cada campo. Esto ayuda a reutilizar mucho mejor este codigo en la aactualizacion y la creacion
const id = Joi.string().uuid(); // primero se define el tipo de dato y luego las validaciones
const name = Joi.string().min(3).max(25);
const description = Joi.string().min(10);
const price = Joi.number().min(1);
const image = Joi.string().uri();

// schema para la creacion de un producto
const createProductSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  image: image.required(),
});

const updateProductSchema = Joi.object({
  name,
  description,
  price,
  image,
}); // al crear el schema de los datos de esta forma, se puede reutilizar el codigo especificando si es o no requerido

const getProductSchema = Joi.object({
  id: id.required(),
}); 

module.exports = { createProductSchema, updateProductSchema, getProductSchema };