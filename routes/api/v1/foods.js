var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)

/* GET all foods */
router.get('/', function(req, res, next) {
  database.raw('SELECT * FROM foods')
    .then((foods) => {
      if (!foods.rows) {
        return req.sendStatus(404);
      } else {
        return res.status(200).json(foods.rows);
      }
    })
});

/* GET foods item corresponding to :id */
router.get('/:id', function(req, res, next) {
  let id = req.params.id
  database.raw('SELECT * FROM foods WHERE id=?', [id])
    .then((food) => {
      if (!food.rows) {
        return res.sendStatus(404);
      } else {
        return res.status(200).json(food.rows);
      }
    })
});

module.exports = router;
