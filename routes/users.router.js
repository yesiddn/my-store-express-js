const express = require('express');
const UsersService = require('../services/users.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('../schemas/users.schema');

const router = express.Router();
const service = new UsersService();

router.get('/', async (req, res, next) => {
  // const { limit, offset } = req.query;

  // if (limit && offset) {
  //   res.json([
  //     {
  //       id: 1,
  //       name: 'Person 1',
  //       limit,
  //       offset,
  //     },
  //   ]);
  // } else {
  //   res.json([
  //     {
  //       id: 1,
  //       name: 'Person 1',
  //     },
  //     {
  //       id: 2,
  //       name: 'Person 2',
  //     },
  //   ]);
  // }

  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    
    // if (id === '999') {
    //   res.status(404).json({
    //     message: 'Not found',
    //   });
    // } else {
    //   res.json({
    //     id,
    //     name: 'Person 1',
    //   });
    // }
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    }catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;

      const newUser = await service.create(body);

      // res.status(201).json({
      //   message: 'Created',
      //   data: body,
      // });
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const user = await service.update(id, body);

      // res.json({
      //   message: 'Updated',
      //   data: body,
      //   id,
      // });
      res.json(user);
    } catch (error) {
      // res.status(404).json({
      //   message: error.message,
      // });
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const user = await service.update(id, body);

      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const response = service.delete(id);

  // res.json({
  //   message: 'Deleted',
  //   id,
  // });
  res.status(204).json(response);
});

module.exports = router;
