const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const create = async board => {
  return Board.create(board);
};

const getById = async id => {
  return Board.findOne({ _id: id });
};

const update = async newBoardProps => {
  const res = await Board.updateOne({ _id: newBoardProps.id }, newBoardProps);

  if (res.nModified === 0) {
    return null;
  }

  return getById(newBoardProps.id);
};

const deleteBoard = async id => {
  const res = await Board.deleteOne({ _id: id });
  return res.deletedCount;
};

module.exports = { getAll, create, getById, update, deleteBoard };
