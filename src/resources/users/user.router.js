const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { isUUID, isEmpty } = require('validator');
const createErrorMiddleware = require('../../middleware/createErrorMiddleware');
const createError = require('../../common/createError');
const {
  BAD_REQUEST,
  NO_CONTENT,
  NOT_FOUND,
  getStatusText
} = require('http-status-codes');
const catchErrors = require('../../common/catchErrors');

router.param('id', (req, res, next, id) => {
  if (!isUUID(id)) {
    return createErrorMiddleware(
      req,
      res,
      next,
      BAD_REQUEST,
      'enter correct uuid for user id'
    );
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

      if (isEmpty(name) || isEmpty(login) || isEmpty(password)) {
        throw createError(
          BAD_REQUEST,
          'POST method, enter correct string for user name, login or password'
        );
      }

      const user = await usersService.create({ name, login, password });

      res.json(User.toResponse(user));
    })
  );

router
  .route('/:id')
  .get(
    catchErrors(async (req, res) => {
      const id = req.params.id;

      const userById = await usersService.getById(id);

      if (!userById) {
        throw createError(
          NOT_FOUND,
          `GET method, user with ${id} id was not found`
        );
      }

      res.json(User.toResponse(userById));
    })
  )

  .put(
    catchErrors(async (req, res) => {
      const id = req.params.id;

      const { name, login, password } = req.body; // pseudo-validation

      if (isEmpty(name) || isEmpty(login) || isEmpty(password)) {
        throw createError(
          BAD_REQUEST,
          'PUT method, enter correct string for user name, login or password'
        );
      }

      const user = await usersService.update({ id, name, login, password });

      if (!user) {
        throw createError(
          NOT_FOUND,
          `PUT method, user with ${id} id was not found`
        );
      }

      res.json(User.toResponse(user));
    })
  )

  .delete(
    catchErrors(async (req, res) => {
      const id = req.params.id;

      const deletedCount = await usersService.deleteUser(id);

      if (deletedCount === 0) {
        createError(
          NOT_FOUND,
          `DELETE method, user with ${id} id was not found`
        );
      }

      res.status(NO_CONTENT).send(getStatusText(NO_CONTENT));
    })
  );

module.exports = router;
