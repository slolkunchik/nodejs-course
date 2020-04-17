const taskService = require('../tasks/task.service');
const boardsRepo = require('./board.db.repository');

const getAll = () => boardsRepo.getAll();
const create = board => boardsRepo.create(board);
const getById = id => boardsRepo.getById(id);
const update = newBoardProps => boardsRepo.update(newBoardProps);
const deleteBoard = async id => {
  await taskService.deleteByBoardId(id);
  return boardsRepo.deleteBoard(id);
};

module.exports = { getAll, create, getById, update, deleteBoard };
