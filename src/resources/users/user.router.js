const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { isUUID } = require('validator');
const { BAD_REQUEST, NO_CONTENT, getStatusText } = require('http-status-codes');
const catchErrors = require('../../common/catchErrors');

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
      const users = await usersService.getAll();
      // map user fields to exclude secret fields like "password"
      res.json(users.map(User.toResponse));
    })
  )

  .post(
    catchErrors(async (req, res) => {
      const { name, login, password } = req.body; // pseudo-validation
      const user = await usersService.create(
        new User({ name, login, password })
      );

      res.json(User.toResponse(user));
    })
  );

router
  .route('/:id')
  .get(
    catchErrors(async (req, res) => {
      const id = req.params.id;

      const userById = await usersService.getById(id);
      res.json(User.toResponse(userById));
    })
  )

  .put(
    catchErrors(async (req, res) => {
      const id = req.params.id;

      const { name, login, password } = req.body; // pseudo-validation
      const user = await usersService.update(
        new User({ id, name, login, password })
      );
      res.json(User.toResponse(user));
    })
  )

  .delete(
    catchErrors(async (req, res) => {
      const id = req.params.id;

      await usersService.deleteUser(id);
      res.status(NO_CONTENT).send(getStatusText(NO_CONTENT));
    })
  );

module.exports = router;
