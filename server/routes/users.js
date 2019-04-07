const userRouter = require('express').Router();
const ctrlUsers = require('../controllers/users');
const userValidation = require('../validations/user');


// POST /users/user
userRouter
  .route('/users/create')
  .post(
    userValidation.addUserValidation,
    ctrlUsers.createUser,
  );

// POST /users/authenticate
userRouter
  .route('/users/authenticate')
  .post(
    userValidation.addUserValidation,
    ctrlUsers.authenticateUser,
  );
module.exports = userRouter;
