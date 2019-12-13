const routes = require('express').Router();
const userRouter = require('./users');
const productRouter = require('./products');
const { verifyToken } = require('../utils/verifyToken');

// middleware function for response
routes.use((req, res, next) => {
  res.success = (statusCode, result) => res.status(statusCode).json(result);
  res.error = (statusCode, message) => res.status(statusCode).send(message);
  return next();
});
routes.use('/', userRouter);
routes.use('/', verifyToken, productRouter);

module.exports = routes;
