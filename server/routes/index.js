const routes = require('express').Router();
const userRouter = require('./users');
const productRouter = require('./products');
const { verifyToken } = require('../utils/verifyToken');

// middleware function for response
routes.use((req, res, next) => {
  res.error = (statusCode, errorMessage) => res.status(statusCode).json(errorMessage);
  res.success = (statusCode, result) => res.status(statusCode).json(result);
  return next();
});
routes.use('/', userRouter);
routes.use('/', verifyToken, productRouter);

module.exports = routes;
