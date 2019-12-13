/* eslint-disable no-underscore-dangle */
const { compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ErrorHandler } = require('../utils/error');

/**
 * Create a new user
 * @param {object} req - Express object
 * @param {object} res - Express object
 */
module.exports.createUser = async (req, res) => {
  const { login, password } = req.body;
  try {
    const foundUser = await User.findOne({ login });
    // verify if a user already exists
    if (foundUser) {
      throw new ErrorHandler(400, 'User already exists');
    }
    const newUser = new User({
      login,
      password,
    });

    const createdUser = await User.create(newUser);
    if (createdUser) {
      return res.success(200, {
        id: createdUser._id,
        login: createdUser.login,
      });
    }
    throw new ErrorHandler(400, 'Unable to create the user');
  } catch (error) {
    return res.error(error.statusCode || 500, error.message);
  }
};

/**
 * Authenticate a user using login/password
 * @param {object} req - Express object
 * @param {object} res - Express object
 */
module.exports.authenticateUser = async (req, res) => {
  const { login, password } = req.body;

  try {
    const fetchedUser = await User.findOne({
      login,
    });
    if (fetchedUser && compareSync(password, fetchedUser.password)) {
      // create a token
      const token = jwt.sign({ id: fetchedUser._id }, process.env.__SECRET__, {
        expiresIn: 300,
      });
      return res.success(200, {
        token,
      });
    }

    // returns error when the given password and hashed one are not similair
    if (fetchedUser && !compareSync(password, fetchedUser.password)) {
      throw new ErrorHandler(401, 'Invalid password');
    }

    throw new ErrorHandler(404, 'No user found');
  } catch (error) {
    return res.error(error.statusCode || 500, error.message);
  }
};
