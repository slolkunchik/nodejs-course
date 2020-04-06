let users = [];

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
  return users[userIndexById];
};

const getById = async id => {
  return users.find(user => user.id === id);
};

const deleteUser = async id => {
  users = users.filter(user => user.id !== id);
};

module.exports = { getAll, create, getById, update, deleteUser };
