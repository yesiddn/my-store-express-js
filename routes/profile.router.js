const express = require('express');
const passport = require('passport');

const OrderService = require('../services/orders.service');

const router = express.Router();
const service = new OrderService();

router.get('/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await service.findByUser(user.sub);
      res.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/create-order',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const order = await service.createByUserId(user.sub);
      res.status(200).json(order);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;