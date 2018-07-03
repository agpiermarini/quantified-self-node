var express = require('express');
var router = express.Router();
const Food = require('../models/food')

class foodController {

  static async index (req, res, next) {
    return await Food.all (req, res, next)
  }

  static async show (req, res, next) {
    return await Food.find (req, res, next)
  }

  static async create (req, res, next) {
    return await Food.create (req, res, next)
  }

  static async update (req, res, next) {
    return await Food.update (req, res, next)
  }

  static async delete  (req, res, next) {
    return await Food.delete (req, res, next)
  }
}

module.exports = foodController;
