const mongoose = require('mongoose');

// database url
const testUrtl = 'mongodb://localhost:27017/test';
const devUrl = 'mongodb://localhost:27017/db';

let url = devUrl;
if (process.env.NODE_ENV === 'test') {
  url = testUrtl;
}

mongoose.connect(url, {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
});


const db = mongoose.connection;

module.exports = db;
