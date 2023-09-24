// tambien se pueden encontrar los schemas como DTOs (Data Transfer Object)

const Joi = require('joi');

// schema especifico para cada campo. Esto ayuda a reutilizar mucho mejor este codigo en la aactualizacion y la creacion
const id = Joi.string().uuid(); // primero se define el tipo de dato y luego las validaciones
const name = Joi.string().min(3).max(25);
const price = Joi.number().min(1);
const image = Joi.string().uri();

// schema para la creacion de un producto
const createCategorySchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

const updateCategorySchema = Joi.object({
  name,
  price,
  image,
}); // al crear el schema de los datos de esta forma, se puede reutilizar el codigo especificando si es o no requerido

const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema };
