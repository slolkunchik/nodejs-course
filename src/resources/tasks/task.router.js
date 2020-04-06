const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params.boardId);
  res.json(tasks.map(Task.toResponse));
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const { title, order, description, userId, columnId } = req.body; // pseudo-validation
  const task = await taskService.create(
    new Task({
      title,
      order,
      description,
      userId,
      boardId: req.params.boardId,
      columnId
    })
  );
  res.json([task].map(Task.toResponse).pop());
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const taskId = req.params.taskId;
  const boardId = req.params.boardId;
  const task = await taskService.getById(boardId, taskId);

  if (!task) {
    res.status(404).send('Not found');
  } else {
    res.json([task].map(Task.toResponse).pop());
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const taskId = req.params.taskId;
  const boardId = req.params.boardId;
  await taskService.deleteTask(boardId, taskId);

  res.status(204).send('The task has been deleted');
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const { id, title, order, description, userId, boardId, columnId } = req.body; // pseudo-validation
  const task = await taskService.update(
    new Task({ id, title, order, description, userId, boardId, columnId })
  );
  res.json([task].map(Task.toResponse).pop());
});

module.exports = router;
