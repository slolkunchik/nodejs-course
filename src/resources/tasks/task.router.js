const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');
const catchErrors = require('../../common/catchErrors');
const {
  BAD_REQUEST,
  NO_CONTENT,
  NOT_FOUND,
  getStatusText
} = require('http-status-codes');
const { isUUID } = require('validator');

router.param('boardId', (req, res, next, boardId) => {
  if (!isUUID(boardId)) {
    res.status(BAD_REQUEST).send(getStatusText(BAD_REQUEST));
    return;
  }

  next();
});

router.param('taskId', (req, res, next, taskId) => {
  if (!isUUID(taskId)) {
    res.status(BAD_REQUEST).send(getStatusText(BAD_REQUEST));
    return;
  }

  next();
});

router
  .route('/:boardId/tasks')
  .get(
    catchErrors(async (req, res) => {
      const boardId = req.params.boardId;
      const tasks = await taskService.getAll(boardId);
      res.json(tasks.map(Task.toResponse));
    })
  )

  .post(
    catchErrors(async (req, res) => {
      const boardId = req.params.boardId;
      const { title, order, description, userId, columnId } = req.body; // pseudo-validation

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
        res.status(NOT_FOUND).send(getStatusText(NOT_FOUND));
      } else {
        res.json(Task.toResponse(task));
      }
    })
  )

  .delete(
    catchErrors(async (req, res) => {
      const taskId = req.params.taskId;
      const boardId = req.params.boardId;
      const task = await taskService.getById(boardId, taskId);

      if (!task) {
        res.status(NOT_FOUND).send(getStatusText(NOT_FOUND));
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
      const task = await taskService.update(
        new Task({ id, title, order, description, userId, boardId, columnId })
      );
      res.json(Task.toResponse(task));
    })
  );

module.exports = router;
