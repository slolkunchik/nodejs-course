const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const create = task => tasksRepo.create(task);
const getById = (boardId, taskId) => tasksRepo.getById(boardId, taskId);

module.exports = { getAll, create, getById };
