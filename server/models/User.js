const mongoose = require('mongoose');

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

const User = mongoose.model('User', UserSchema);
module.exports = User;
