const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports.verifyToken = (req, res, next) => {
  // bypass the token verfication for the test enivironment
  if (process.env.NODE_ENV === 'test') {
    return next();
  }
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send('No provided Token');
  }

  return jwt.verify(token, secret, (error, decodedToken) => {
    if (error) {
      return res.status(500).send('Token Authentication failed');
    }
    req.userId = decodedToken.id;
    return next();
  });
};
