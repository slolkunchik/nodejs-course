const router = require('express').Router();
const boardService = require('./board.service');
const catchErrors = require('../../common/catchErrors');
const Column = require('../column/column.model');
const Board = require('./board.model');
const {
  BAD_REQUEST,
  NO_CONTENT,
  NOT_FOUND,
  getStatusText
} = require('http-status-codes');
const { isUUID } = require('validator');

router.param('id', (req, res, next, id) => {
  if (!isUUID(id)) {
    res.status(BAD_REQUEST).send(getStatusText(BAD_REQUEST));
    return;
  }

  next();
});

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const boards = await boardService.getAll();
      res.json(boards);
    })
  )

  .post(
    catchErrors(async (req, res) => {
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
    })
  );

router
  .route('/:id')
  .get(
    catchErrors(async (req, res) => {
      const id = req.params.id;
      const boardById = await boardService.getById(id);

      if (boardById) {
        res.json(boardById);
      } else {
        res.status(NOT_FOUND).send(getStatusText(NOT_FOUND));
      }
    })
  )

  .put(
    catchErrors(async (req, res) => {
      const id = req.params.id;
      const { title, columns } = req.body; // pseudo-validation
      const processedColumns = columns.map(
        column =>
          new Column({
            id: column.id,
            title: column.title,
            order: column.order
          })
      );
      const newBoard = await boardService.update(
        new Board({ id, title, columns: processedColumns })
      );

      res.json(newBoard);
    })
  )

  .delete(
    catchErrors(async (req, res) => {
      const id = req.params.id;

      await boardService.deleteBoard(id);
      res.status(NO_CONTENT).send(getStatusText(NO_CONTENT));
    })
  );

module.exports = router;
