const express = require('express');
const UsersService = require('../services/users.service');

const router = express.Router();
const service = new UsersService();

router.get('/', (req, res) => {
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

  const users = service.find();
  res.json(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

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

  const user = service.findOne(id);
  res.json(user);
});

router.post('/', (req, res) => {
  const body = req.body;
  
  const newUser = service.create(body);

  // res.status(201).json({
  //   message: 'Created',
  //   data: body,
  // });
  res.status(201).json(newUser);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const user = service.update(id, body);

  // res.json({
  //   message: 'Updated',
  //   data: body,
  //   id,
  // });
  res.json(user);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  res.json({
    message: 'Updated',
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    message: 'Deleted',
    id,
  });
});

module.exports = router;
