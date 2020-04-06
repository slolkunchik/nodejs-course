const router = require('express').Router();
const boardService = require('./board.service');

const Column = require('../column/column.model');
const Board = require('./board.model');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards);
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body; // pseudo-validation
  let processedColumns = [];
  if (columns) {
    processedColumns = columns.map(
      column => new Column({ title: column.title, order: column.order })
    );
  }

  const newBoard = await boardService.create(
    new Board({ title, columns: processedColumns })
  );

  res.json(newBoard);
});

router.route('/:id').get(async (req, res) => {
  const boardById = await boardService.getById(req.params.id);
  if (boardById) {
    res.json(boardById);
  } else {
    res.status(404).send('Not found');
  }
});

router.route('/:id').put(async (req, res) => {
  const { title, columns } = req.body; // pseudo-validation
  const processedColumns = columns.map(
    column =>
      new Column({ id: column.id, title: column.title, order: column.order })
  );
  const newBoard = await boardService.update(
    new Board({ id: req.params.id, title, columns: processedColumns })
  );

  res.json(newBoard);
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  await boardService.deleteBoard(id);
  res.status(204).send('The board has been deleted');
});

module.exports = router;
