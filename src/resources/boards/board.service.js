const taskService = require('../tasks/task.service');
const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const create = board => boardsRepo.create(board);
const getById = id => boardsRepo.getById(id);
const update = newBoard => boardsRepo.update(newBoard);
const deleteBoard = id => {
  boardsRepo.deleteBoard(id);
  taskService.deleteByBoardId(id);
};

module.exports = { getAll, create, getById, update, deleteBoard };
