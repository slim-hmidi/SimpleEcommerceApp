const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const { errors } = require('celebrate');
require('./config');
const routes = require('./routes/index');
const swaggerDocument = require('./swagger.json');
require('./database/config');
const { errorMiddleware } = require('./utils/error');

const app = express();

// server listening port
const port = process.env.port || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// application routes
app.use('/', routes);

// Error Middleware
app.use(errorMiddleware);

// return Validation errors
app.use(errors());

// error handler for unknown routes
app.use('*', (error, req, res, next) => {
  res.status(404);
  next(error);
});

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`server listens on 127.0.0.1:${port}`);
});


module.exports = app;
