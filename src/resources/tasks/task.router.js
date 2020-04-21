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

router.param('taskId', (req, res, next, taskId) => {
  if (!isUUID(taskId)) {
    return createErrorMiddleware(
      req,
      res,
      next,
      BAD_REQUEST,
      'enter correct uuid for task id'
    );
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
        throw createError(
          NOT_FOUND,
          `GET method, tasks with board id ${boardId} were not found`
        );
      }

      res.json(tasks.map(Task.toResponse));
    })
  )

  .post(
    catchErrors(async (req, res) => {
      const boardId = req.params.boardId;
      const { title, order, description, userId, columnId } = req.body; // pseudo-validation

      if (isEmpty(title) || isEmpty(description) || typeof order !== 'number') {
        throw createError(
          BAD_REQUEST,
          'POST method, enter correct string for task title, description or number for order'
        );
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
        throw createError(
          NOT_FOUND,
          `GET method, task with board id ${boardId} and task id ${taskId} was not found`
        );
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
        throw createError(
          NOT_FOUND,
          `DELETE method, task with board id ${boardId} and task id ${taskId} was not found`
        );
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
        throw createError(
          BAD_REQUEST,
          'PUT method, enter correct string for task title, description, number for order or uuid for id'
        );
      }

      const task = await taskService.update(
        new Task({ id, title, order, description, userId, boardId, columnId })
      );

      if (!task) {
        throw createError(
          NOT_FOUND,
          `PUT method, task with id ${id} was not found`
        );
      }

      res.json(Task.toResponse(task));
    })
  );

module.exports = router;
