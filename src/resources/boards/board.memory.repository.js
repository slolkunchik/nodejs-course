const Board = require('./board.model');

let boards = [
  new Board({
    id: '111',
    title: 'first-board',
    columns: []
  })
];

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

  console.log('old:', boards[boardIndexById]);
  console.log('new:', newBoard);
  boards[boardIndexById] = newBoard;

  return boards[boardIndexById];
};

const deleteBoard = async id => {
  boards = boards.filter(board => board.id !== id);
};

module.exports = { getAll, create, getById, update, deleteBoard };
