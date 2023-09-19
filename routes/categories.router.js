const express = require('express');
const CategoriesService = require('../services/categories.service');

const router = express.Router();
const service = new CategoriesService();

router.get('/', (req, res) => {
  // res.json([
  //   {
  //     id: 1,
  //     name: 'Category 1',
  //   },
  //   {
  //     id: 2,
  //     name: 'Category 2',
  //   },
  // ]);
  const categories = service.find();
  res.json(categories);
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
  //     name: 'Category 1',
  //   });
  // }

  const category = service.findOne(id);
  res.json(category);
});

router.post('/', (req, res) => {
  const body = req.body;

  const newCategory = service.create(body);

  // res.status(201).json({
  //   message: 'Created',
  //   data: body,
  // });
  res.status(201).json(newCategory);
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
