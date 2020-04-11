const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  })

  .post(async (req, res) => {
    const { name, login, password } = req.body; // pseudo-validation
    const user = await usersService.create(new User({ name, login, password }));

    res.json([user].map(User.toResponse).pop());
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const userById = await usersService.getById(req.params.id);
    res.json([userById].map(User.toResponse).pop());
  })

  .put(async (req, res) => {
    const { name, login, password } = req.body; // pseudo-validation
    const user = await usersService.update(
      new User({ id: req.params.id, name, login, password })
    );
    res.json([user].map(User.toResponse).pop());
  })

  .delete(async (req, res) => {
    const id = req.params.id;
    await usersService.deleteUser(id);
    res.status(204).send('The user has been deleted');
  });

module.exports = router;
