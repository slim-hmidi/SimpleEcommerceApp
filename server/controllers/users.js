/* eslint-disable no-underscore-dangle */
const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secret } = require('../config');

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
      return res.error(400, 'User already exists');
    }
    const saltRounds = 10;
    // crypt the password before storing it in the db
    const hashedPassword = hashSync(password, saltRounds);
    const newUser = new User({
      login,
      password: hashedPassword,
    });

    const createdUser = User.create(newUser);
    if (createdUser) {
      return res.success(201, 'User was created successfully!!');
    }
    return res.error(400, 'Unable to create the user');
  } catch (error) {
    return res.error(500, error);
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
      const token = jwt.sign({ id: fetchedUser._id }, secret, {
        expiresIn: 300,
      });
      return res.success(200, {
        token,
      });
    }

    // returns error when the given password and hashed one are not similair
    if (fetchedUser && !compareSync(password, fetchedUser.password)) {
      return res.error(401, 'Invalid password');
    }

    return res.error(404, 'No user found');
  } catch (error) {
    return res.error(500, error);
  }
};
