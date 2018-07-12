const express = require('express')
const router = express.Router()
const MealFood = require('../models/mealFood')

class mealFoodsController {

  static async create (req, res, next) {
    const message = await MealFood.create(req, res, next)
    return message ? res.status(200).json(message) : res.sendStatus(404)
  }

  static async delete (req, res, next) {
    return await MealFood.delete(req, res, next)
  }

}

module.exports = mealFoodsController
