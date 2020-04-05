const User = require('./user.model');

let users = [
  new User({
    id: '87c9bb49-d042-4581-960e-4d74d3264ff0',
    name: 'User-first',
    login: 'login-first',
    password: 'password-first'
  })
];

const getAll = async () => {
  return users;
};

const create = async user => {
  users.push(user); // pseudo-record
  return user;
};

const update = async newUser => {
  const userIndexById = users.findIndex(user => user.id === newUser.id);
  users[userIndexById] = newUser;
  return newUser;
};

const getById = async id => {
  return users.find(user => user.id === id);
};

const deleteUser = async id => {
  users = users.filter(user => user.id !== id);
};

module.exports = { getAll, create, getById, update, deleteUser };
