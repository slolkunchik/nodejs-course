const usersRepo = require('./user.db.repository');
const taskService = require('../tasks/task.service');
const bcrypt = require('bcrypt');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const create = async user => {
  const saltRounds = 8;
  const { password } = user;
  const hash = await bcrypt.hash(password, saltRounds);
  return usersRepo.create({ ...user, password: hash });
};
const update = newUserProps => usersRepo.update(newUserProps);
const deleteUser = async id => {
  await taskService.deleteUserId(id);
  return usersRepo.deleteUser(id);
};

module.exports = { getAll, create, getById, update, deleteUser };
