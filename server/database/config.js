const mongoose = require('mongoose');
const { devUrl, testUrtl } = require('../config');


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
