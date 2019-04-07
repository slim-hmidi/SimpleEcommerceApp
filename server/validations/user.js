const { celebrate, Joi } = require('celebrate');

const addUserValidation = celebrate({
  body: Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

module.exports = { addUserValidation };
