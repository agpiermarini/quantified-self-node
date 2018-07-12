const express = require('express')
const router = express.Router()
const MealFood = require('../models/mealFood')

class mealFoodsController {

  static async create (req, res, next) {
    const message = await MealFood.create(req)
    return message ? res.status(200).json(message) : res.sendStatus(404)
  }

  static async delete (req, res, next) {
    const message = await MealFood.delete(req)
    return message ? res.status(200).json(message) : res.sendStatus(404)
  }

}

module.exports = mealFoodsController
