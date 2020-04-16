const usersRepo = require('./user.db.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const create = user => usersRepo.create(user);
const update = newUserProps => usersRepo.update(newUserProps);
const deleteUser = async id => {
  await taskService.deleteUserId(id);
  return usersRepo.deleteUser(id);
};

module.exports = { getAll, create, getById, update, deleteUser };
