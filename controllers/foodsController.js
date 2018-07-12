const express = require('express')
const router = express.Router()
const Food = require('../models/food')

class foodsController {

  static async index (req, res, next) {
    const foods = await Food.all ()
    return foods.rows ? res.status(200).json(foods.rows) : res.sendStatus(404)
  }

  static async show (req, res, next) {
    const food = await Food.find (req)
    return food.rows.length == 1 ? res.status(200).json(food.rows[0]) : res.sendStatus(404)
  }

  static async create (req, res, next) {
    const food = await Food.create (req)
    return food ? res.status(200).json(food.rows[0]) : res.sendStatus(404)
  }

  static async update (req, res, next) {
    const food = await Food.update (req)
    return food && food.rows.length == 1 ? res.status(200).json(food.rows[0]) : res.sendStatus(404)
  }

  static async delete  (req, res, next) {
    const food = await Food.delete (req)
    return food.rows ? res.sendStatus(204) : res.sendStatus(404)
  }
}

module.exports = foodsController;
