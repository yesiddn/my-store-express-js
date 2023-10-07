const express = require('express');
const passport = require('passport');

const { loginAuthSchema } = require('../schemas/auth.schema');
const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router();

router.post('/login',
  validatorHandler(loginAuthSchema, 'body'),
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
