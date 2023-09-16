const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const { limit, offset } = req.query;

  if (limit && offset) {
    res.json([
      {
        id: 1,
        name: 'Person 1',
        limit,
        offset,
      },
    ]);
  } else {
    res.json([
      {
        id: 1,
        name: 'Person 1',
      },
      {
        id: 2,
        name: 'Person 2',
      },
    ]);
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Person 1',
  });
});

router.post('/', (req, res) => {
  const body = req.body;

  res.json({
    message: 'Created',
    data: body,
  });
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
