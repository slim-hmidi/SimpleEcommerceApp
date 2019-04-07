const { celebrate, Joi } = require('celebrate');

const addProductValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
  }),
});

const productIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().regex(/^[a-f\d]{24}$/i, { name: 'ObjectId' }),
  }),
});

module.exports = { addProductValidation, productIdValidation };
