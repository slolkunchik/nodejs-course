const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');
const catchErrors = require('../../common/catchErrors');
const createErrorMiddleware = require('../../middleware/createErrorMiddleware');
const createError = require('../../common/createError');
const {
  BAD_REQUEST,
  NO_CONTENT,
  NOT_FOUND,
  getStatusText
} = require('http-status-codes');
const { isUUID, isEmpty } = require('validator');

router.param('boardId', (req, res, next, boardId) => {
  if (!isUUID(boardId)) {
    return createErrorMiddleware(req, res, next, BAD_REQUEST);
  }
  next();
});

router.param('taskId', (req, res, next, taskId) => {
  if (!isUUID(taskId)) {
    return createErrorMiddleware(req, res, next, BAD_REQUEST);
  }

  next();
});

router
  .route('/:boardId/tasks')
  .get(
    catchErrors(async (req, res) => {
      const boardId = req.params.boardId;
      const tasks = await taskService.getAll(boardId);

      if (tasks.length === 0) {
        createError(NOT_FOUND);
      }

      res.json(tasks.map(Task.toResponse));
    })
  )

  .post(
    catchErrors(async (req, res) => {
      const boardId = req.params.boardId;
      const { title, order, description, userId, columnId } = req.body; // pseudo-validation

      if (isEmpty(title) || isEmpty(description) || typeof order !== 'number') {
        createError(BAD_REQUEST);
      }

      const task = await taskService.create(
        new Task({
          title,
          order,
          description,
          userId,
          boardId,
          columnId
        })
      );

      res.json(Task.toResponse(task));
    })
  );

router
  .route('/:boardId/tasks/:taskId')
  .get(
    catchErrors(async (req, res) => {
      const boardId = req.params.boardId;
      const taskId = req.params.taskId;
      const task = await taskService.getById(boardId, taskId);

      if (!task) {
        createError(NOT_FOUND);
      }

      res.json(Task.toResponse(task));
    })
  )

  .delete(
    catchErrors(async (req, res) => {
      const taskId = req.params.taskId;
      const boardId = req.params.boardId;
      const task = await taskService.getById(boardId, taskId);

      if (!task) {
        createError(NOT_FOUND);
      }

      await taskService.deleteTask(boardId, taskId);

      res.status(NO_CONTENT).send(getStatusText(NO_CONTENT));
    })
  )

  .put(
    catchErrors(async (req, res) => {
      const {
        id,
        title,
        order,
        description,
        userId,
        boardId,
        columnId
      } = req.body; // pseudo-validation

      if (
        isEmpty(title) ||
        isEmpty(description) ||
        typeof order !== 'number' ||
        !isUUID(id)
      ) {
        createError(BAD_REQUEST);
      }

      const task = await taskService.update(
        new Task({ id, title, order, description, userId, boardId, columnId })
      );

      if (!task) {
        createError(NOT_FOUND);
      }

      res.json(Task.toResponse(task));
    })
  );

module.exports = router;
