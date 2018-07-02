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
        return res.sendStatus(404);
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
      if (!food.rows.length == 1) {
        return res.sendStatus(404);
      } else {
        return res.status(200).json(food.rows[0]);
      }
    })
});

/* POST new food item */
router.post('/', function(req, res, next) {
  let name = req.body.food.name
  let calories = req.body.food.calories
  database.raw('INSERT INTO foods (name, calories) VALUES (?, ?) RETURNING *', [name, calories])
    .then(food => {
      if (!food.rows) {
        return res.sendStatus(404);
      } else {
        return res.status(200).json(food.rows[0]);
      }
    })
    .catch(err=>{
      return res.sendStatus(404);
    })
});

/* PATCH existing food item */
router.patch('/:id', function(req, res, next) {
  let id = req.params.id
  let name = req.body.food.name
  let calories = req.body.food.calories
  database.raw('UPDATE foods SET name = ?, calories = ? WHERE id = ? RETURNING *', [name, calories, id])
    .then(food => {
      if (!food.rows.length == 1) {
        return res.sendStatus(404);
      } else {
        return res.status(200).json(food.rows[0]);
      }
    })
    .catch(err => {
      return res.sendStatus(404);
    })
});

/* DELETE existing food item */
router.delete('/:id', function(req, res, next) {
  let id = req.params.id
  database.raw('DELETE FROM foods WHERE id = ?', [id])
    .then(food => {
      if (!food.rows) {
        return res.sendStatus(404);
      } else {
        return res.sendStatus(204);
      }
    })
    .catch(err => {
      return res.sendStatus(404);
    })
});

module.exports = router;
