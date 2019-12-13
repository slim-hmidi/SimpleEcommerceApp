const mongoose = require('mongoose');
const { hashSync } = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = Schema({
  login: {
    type: 'string',
    index:
    {
      unique: true,
    },
    required: true,
  },
  password: {
    type: 'string',
    require: true,
  },
});

// eslint-disable-next-line func-names
UserSchema.pre('save', function (next) {
  const user = this;
  const salt = 10;
  try {
    const hash = hashSync(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
