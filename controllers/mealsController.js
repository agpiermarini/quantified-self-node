const express = require('express')
const router = express.Router()
const Meal = require('../models/meal')

class mealsController {

  static async index (req, res, next) {
    const meals =  await Meal.all()
    return meals.rows ? res.status(200).json(meals.rows) : res.sendStatus(404)
  }

  static async show (req, res, next) {
    return await Meal.find(req, res, next)
  }
}

module.exports = mealsController;
