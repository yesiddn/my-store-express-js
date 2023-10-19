const Joi = require('joi');

const token = Joi.string();
const email = Joi.string().email();
const newPassword = Joi.string().min(8);

const loginAuthSchema = Joi.object({
  email: email.required(),
  password: newPassword.required(),
});

const recoveryAuthSchema = Joi.object({
  email: email.required(),
});

const changePasswordAuthSchema = Joi.object({
  token: token.required(),
  newPassword: newPassword.required(),
});

module.exports = {
  loginAuthSchema,
  recoveryAuthSchema,
  changePasswordAuthSchema,
};
