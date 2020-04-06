let boards = [];

const getAll = async () => {
  return boards;
};

const create = async board => {
  boards.push(board); // pseudo-record
  return board;
};

const getById = async id => {
  return boards.find(board => board.id === id);
};

const update = async newBoard => {
  const boardIndexById = boards.findIndex(board => board.id === newBoard.id);

  boards[boardIndexById] = newBoard;

  return boards[boardIndexById];
};

const deleteBoard = async id => {
  boards = boards.filter(board => board.id !== id);
};

module.exports = { getAll, create, getById, update, deleteBoard };
