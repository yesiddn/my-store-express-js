const express = require('express');
const CategoriesService = require('../services/categories.service');
const validatorHandler = require('../middlewares/validator.handler'); // middleware que no se usa de forma global, solo en el router que lo necesita
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require('../schemas/categories.schema'); // cada endpoint tiene que definir su propio schema y de donde saca los datos

const router = express.Router();
const service = new CategoriesService();

router.get('/', async (req, res) => {
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
  const categories = await service.find();
  res.json(categories);
});

router.get(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
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

      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;

      const newCategory = await service.create(body);

      // res.status(201).json({
      //   message: 'Created',
      //   data: body,
      // });
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const category = await service.update(id, body);

      // res.json({
      //   message: 'Updated',
      //   data: body,
      //   id,
      // });
      res.json(category);
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
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const category = await service.update(id, body);

      // res.json({
      //   message: 'Updated',
      //   data: body,
      //   id,
      // });
      res.json(category);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const response = await service.delete(id);

      // res.json({
      //   message: 'Deleted',
      //   id,
      // });
      res.status(202).json(response);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
