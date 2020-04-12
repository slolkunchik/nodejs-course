const router = require('express').Router();
const boardService = require('./board.service');
const catchErrors = require('../../common/catchErrors');
const Column = require('../column/column.model');
const Board = require('./board.model');
const createErrorMiddleware = require('../../middleware/createErrorMiddleware');
const createError = require('../../common/createError');
const {
  BAD_REQUEST,
  NO_CONTENT,
  NOT_FOUND,
  getStatusText
} = require('http-status-codes');
const { isUUID } = require('validator');

router.param('id', (req, res, next, id) => {
  if (!isUUID(id)) {
    return createErrorMiddleware(req, res, next, BAD_REQUEST);
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

      if (!title) {
        createError(BAD_REQUEST);
      }

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

      if (!boardById) {
        createError(NOT_FOUND);
      }

      res.json(boardById);
    })
  )

  .put(
    catchErrors(async (req, res) => {
      const id = req.params.id;
      const { title, columns } = req.body; // pseudo-validation

      if (!title || !columns) {
        createError(BAD_REQUEST);
      }

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

      if (!newBoard) {
        createError(NOT_FOUND);
      }

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
