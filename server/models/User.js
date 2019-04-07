const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = Schema({
  login: {
    type: 'string',
    index:
    {
      unique: true,
    },
  },
  password: {
    type: 'string',
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
