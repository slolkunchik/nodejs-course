let tasks = [];

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

const deleteByBoardId = async boardId => {
  tasks = tasks.filter(task => task.boardId !== boardId);
};

const deleteUserId = async userId => {
  tasks = tasks.map(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
    return task;
  });
};

const deleteTask = async id => {
  tasks = tasks.filter(task => task.id !== id);
};

const update = async newTask => {
  const taskIndexById = tasks.findIndex(task => task.id === newTask.id);
  tasks[taskIndexById] = newTask;
  return tasks[taskIndexById];
};

module.exports = {
  getAll,
  create,
  getById,
  deleteByBoardId,
  deleteUserId,
  deleteTask,
  update
};
