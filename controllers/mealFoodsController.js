const express = require('express')
const router = express.Router()
const MealFood = require('../models/mealFood')

class mealFoodsController {

  static async create (req, res, next) {
    const new_meal = await MealFood.create(req, res, next)
    let names = new_meal.rows[0]
    let msg = { message: `Successfully added ${names.food_name} to ${names.meal_name}` }
    return new_meal.rows ? res.status(200).json(msg) : res.sendStatus(404)
  }

  static async delete (req, res, next) {
    return await MealFood.delete(req, res, next)
  }

}

module.exports = mealFoodsController
