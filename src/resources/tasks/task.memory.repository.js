const Task = require('./task.model');

const tasks = [new Task(), new Task({ id: '1', boardId: '111' })];

const getAll = async boardId => {
  return tasks.filter(task => task.boardId === boardId);
};

const create = async task => {
  tasks.push(task); // pseudo-record
  return task;
};

const getById = async (boardId, taskId) => {
  return tasks.find(task => task.boardId === boardId && task.id === taskId);
};

module.exports = { getAll, create, getById };
