const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const create = user => usersRepo.create(user);
const update = newUser => usersRepo.update(newUser);
const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, create, getById, update, deleteUser };
