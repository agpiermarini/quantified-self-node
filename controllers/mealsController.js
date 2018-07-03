const express = require('express')
const router = express.Router()
const Meal = require('../models/meal')

class mealsController {

  static async index (req, res, next) {
    return await Meal.all(req, res, next)
  }

  static async show (req, res, next) {
    return await Meal.find(req, res, next)
  }
}

module.exports = mealsController;
