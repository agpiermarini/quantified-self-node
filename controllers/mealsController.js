var express = require('express');
var router = express.Router();
const Meal = require('../models/meal')

class mealsController {

  static async index (req, res, next) {
    return await Meal.all(req, res, next)
  }
}

module.exports = mealsController;
