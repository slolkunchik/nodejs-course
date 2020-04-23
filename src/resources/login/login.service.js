const usersService = require('../users/user.service');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const bcrypt = require('bcrypt');

const findByLogin = login => usersService.findByLogin(login);

const isPasswordMatch = async (user, password) => {
  return await bcrypt.compare(password, user.password);
};

const sign = (user, cb) => {
  const payload = { userId: user.id, login: user.login };
  jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' }, cb);
};

module.exports = { findByLogin, sign, isPasswordMatch };
