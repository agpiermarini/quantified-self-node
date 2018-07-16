const express = require('express')
const router = express.Router()
const Food = require('../models/food')
const Meal = require('../models/meal')
const MealFood = require('../models/mealFood')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class favoriteFoodsController {

  static async index (req, res, next) {
    const foodCounts = await MealFood.timesEaten()
    let favoriteFoods = foodCounts.rows.map(row => {
      let favorite = {}
      favorite["timesEaten"] = row.timeseaten
      favorite["foods"] = [{}]
      favorite["foods"][0]["name"] = row.name
      favorite["foods"][0]["calories"] = row.calories
      favorite["meals"] = row.meal_names.map(meal => {
        return meal.name
      })
      return favorite
    })
    return favoriteFoods ? res.status(200).json(favoriteFoods) : res.sendStatus(404)
  }
}

module.exports = favoriteFoodsController;
