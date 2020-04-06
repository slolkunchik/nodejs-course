const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const create = task => tasksRepo.create(task);
const getById = (boardId, taskId) => tasksRepo.getById(boardId, taskId);
const deleteByBoardId = boardId => tasksRepo.deleteByBoardId(boardId);
const deleteUserId = userId => tasksRepo.deleteUserId(userId);
const deleteTask = id => tasksRepo.deleteTask(id);
const update = newTask => tasksRepo.update(newTask);

module.exports = {
  getAll,
  create,
  getById,
  deleteByBoardId,
  deleteUserId,
  deleteTask,
  update
};
