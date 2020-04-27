const usersRepo = require('./user.db.repository');
const taskService = require('../tasks/task.service');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../../common/config');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const create = async user => {
  const { password } = user;
  const hash = await bcrypt.hash(password, +SALT_ROUNDS); // from .env SALT_ROUNDS return a string
  return usersRepo.create({ ...user, password: hash });
};
const update = newUserProps => usersRepo.update(newUserProps);
const deleteUser = async id => {
  await taskService.deleteUserId(id);
  return usersRepo.deleteUser(id);
};

const findByLogin = login => usersRepo.findByLogin(login);

module.exports = {
  getAll,
  create,
  getById,
  update,
  deleteUser,
  findByLogin
};
