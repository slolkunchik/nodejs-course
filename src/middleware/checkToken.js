const { JWT_SECRET_KEY } = require('../common/config');
const createError = require('../common/createError');
const { UNAUTHORIZED, getStatusText } = require('http-status-codes');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const header = req.headers.authorization;

  if (header && header.startsWith('Bearer ')) {
    const token = header.slice(7, header.length);

    jwt.verify(token, JWT_SECRET_KEY, err => {
      if (err) {
        createError(UNAUTHORIZED, getStatusText(UNAUTHORIZED));
      } else {
        return next();
      }
    });
  } else {
    createError(UNAUTHORIZED, getStatusText(UNAUTHORIZED));
  }
};
