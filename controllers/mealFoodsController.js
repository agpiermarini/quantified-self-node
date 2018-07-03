var express = require('express');
var router = express.Router();
const MealFood = require('../models/mealFood')

class mealFoodsController {

  static async create (req, res, next) {
    return await MealFood.create(req, res, next)
  }

  static async delete (req, res, next) {
    return await MealFood.delete(req, res, next)
  }

}

module.exports = mealFoodsController
