const Task = require('./task.model');

const getAll = async boardId => {
  return Task.find({ boardId });
};

const create = async task => {
  return Task.create(task);
};

const getById = async (boardId, taskId) => {
  return Task.findOne({ _id: taskId, boardId });
};

const deleteByBoardId = async boardId => {
  return Task.deleteMany({ boardId });
};

const deleteUserId = async userId => {
  return Task.findOneAndUpdate(
    { userId },
    { userId: null },
    { new: true, useFindAndModify: false },
    (err, data) => {
      return data;
    }
  );
};

const deleteTask = async (boardId, taskId) => {
  const res = await Task.deleteOne({ _id: taskId });

  return res.deletedCount;
};

const update = async newTaskProps => {
  const res = await Task.updateOne({ _id: newTaskProps.id }, newTaskProps);

  if (res.nModified === 0) {
    return null;
  }

  return getById(newTaskProps.boardId, newTaskProps.id);
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
