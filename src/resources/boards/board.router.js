const router = require('express').Router();
const boardService = require('./board.service');
const catchErrors = require('../../common/catchErrors');
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
    return createErrorMiddleware(
      req,
      res,
      next,
      BAD_REQUEST,
      'enter correct uuid for board id'
    );
  }
  next();
});

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const boards = await boardService.getAll();
      res.json(boards.map(Board.toResponse));
    })
  )

  .post(
    catchErrors(async (req, res) => {
      const { title, columns } = req.body; // pseudo-validation

      if (!title) {
        throw createError(
          BAD_REQUEST,
          'POST method, enter correct string for board title'
        );
      }

      let processedColumns = [];
      if (columns) {
        processedColumns = columns.map(column => ({
          title: column.title,
          order: column.order
        }));
      }

      const newBoard = await boardService.create(
        new Board({ title, columns: processedColumns })
      );
      res.json(Board.toResponse(newBoard));
    })
  );

router
  .route('/:id')
  .get(
    catchErrors(async (req, res) => {
      const id = req.params.id;
      const boardById = await boardService.getById(id);

      if (!boardById) {
        throw createError(
          NOT_FOUND,
          `GET method, board with ${id} id was not found`
        );
      }

      res.json(Board.toResponse(boardById));
    })
  )

  .put(
    catchErrors(async (req, res) => {
      const id = req.params.id;
      const { title, columns } = req.body; // pseudo-validation

      if (!title || !columns) {
        throw createError(
          BAD_REQUEST,
          'PUT method, enter correct string for board title and array for columns'
        );
      }

      const processedColumns = columns.map(column => ({
        id: column.id,
        title: column.title,
        order: column.order
      }));
      const newBoard = await boardService.update({
        id,
        title,
        columns: processedColumns
      });

      if (!newBoard) {
        throw createError(
          NOT_FOUND,
          `PUT method, board with ${id} id was not found`
        );
      }

      res.json(Board.toResponse(newBoard));
    })
  )

  .delete(
    catchErrors(async (req, res) => {
      const id = req.params.id;

      const deletedCount = await boardService.deleteBoard(id);

      if (deletedCount === 0) {
        createError(
          NOT_FOUND,
          `DELETE method, board with ${id} id was not found`
        );
      }

      res.status(NO_CONTENT).send(getStatusText(NO_CONTENT));
    })
  );

module.exports = router;
