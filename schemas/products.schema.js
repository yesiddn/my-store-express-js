// tambien se pueden encontrar los schemas como DTOs (Data Transfer Object)

const Joi = require('joi');

// schema especifico para cada campo. Esto ayuda a reutilizar mucho mejor este codigo en la aactualizacion y la creacion
const id = Joi.number().integer(); // primero se define el tipo de dato y luego las validaciones
const name = Joi.string().min(3).max(25);
const description = Joi.string().min(10);
const price = Joi.number().min(1);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

// Paginacion
const limit = Joi.number().integer();
const offset = Joi.number().integer();

// Filtros
const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

// schema para la creacion de un producto
const createProductSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name,
  description,
  price,
  image,
  categoryId,
}); // al crear el schema de los datos de esta forma, se puede reutilizar el codigo especificando si es o no requerido

const getProductSchema = Joi.object({
  id: id.required(),
}); 

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min', {
    is: Joi.number().exist(),
    then: Joi.number().min(Joi.ref('price_min')).required(),
  })
}); 

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema };