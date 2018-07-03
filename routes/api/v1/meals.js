const express = require('express')
const router = express.Router()
const mealsController = require('../../../controllers/mealsController')
const mealFoodsController = require('../../../controllers/mealFoodsController')

router.get('/', mealsController.index)
router.get('/:id/foods', mealsController.show)
router.post('/:meal_id/foods/:food_id', mealFoodsController.create)
router.delete('/:meal_id/foods/:food_id', mealFoodsController.delete)

module.exports = router;
