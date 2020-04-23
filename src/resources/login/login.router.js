const router = require('express').Router();
const catchErrors = require('../../common/catchErrors');
const loginService = require('./login.service');
const createError = require('../../common/createError');
const { UNAUTHORIZED, FORBIDDEN, getStatusText } = require('http-status-codes');

router.route('/').post(
  catchErrors(async (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    const user = await loginService.findByLogin(login);

    if (!user || !(await loginService.isPasswordMatch(user, password))) {
      createError(
        FORBIDDEN,
        `POST method, the user with login ${login} and password ${password} does not have access rights to the content`
      );
    }

    loginService.sign(user, (err, token) => {
      if (err) {
        createError(UNAUTHORIZED, getStatusText(UNAUTHORIZED));
      }
      res.json({ token });
    });
  })
);

module.exports = router;
