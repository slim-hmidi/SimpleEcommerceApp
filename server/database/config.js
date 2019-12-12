/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');


let url = process.env.__DEV_DB_URL__;
if (process.env.NODE_ENV === 'test') {
  url = process.env.__TEST_DB_URL__;
}

(async () => {
  try {
    await mongoose.connect(url, {
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error);
  }
})();


const db = mongoose.connection;

if (process.env.NODE_ENV !== 'test') {
  db.on('error', (error) => {
    console.log(error);
  });

  db.on('open', () => {
    console.log('Database server starts successfully!!');
  });
}

module.exports = db;
