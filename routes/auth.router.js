const express = require('express');
const passport = require('passport');

const {
  loginAuthSchema,
  recoveryAuthSchema,
} = require('../schemas/auth.schema');
const validatorHandler = require('../middlewares/validator.handler');
// const jwt = require('jsonwebtoken');

// const { config } = require('../config/config');

const AuthService = require('../services/auth.service');

const router = express.Router();

const service = new AuthService();

router.post(
  '/login',
  validatorHandler(loginAuthSchema, 'body'),
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      // const payload = {
      //   sub: user.id,
      //   role: user.role,
      // };
      // const token = jwt.sign(payload, config.jwtSecret);
      
      // res.json({
      //   user,
      //   token,
      // });

      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/recovery',
  validatorHandler(recoveryAuthSchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const response = await service.sendRecoveryLink(email);
      res.json(response);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
