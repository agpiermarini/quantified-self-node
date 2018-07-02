var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)

/* GET all meals */
router.get('/', function(req, res, next) {
  database.raw(`SELECT m.id, m.name,
                COALESCE(json_agg(f.* ORDER BY f.id) FILTER (WHERE f.id IS NOT NULL), '[]') AS foods
                FROM meals m
                LEFT JOIN meal_foods mf ON m.id = mf.meal_id
                LEFT JOIN foods f ON f.id = mf.food_id
                GROUP BY m.id, m.name
                ORDER BY id`)
    .then((meals) => {
      if (!meals.rows) {
        return res.sendStatus(404);
      } else {
        return res.status(200).json(meals.rows)
      }
    })
});

/* GET all foods associated with a meal */
router.get('/:id/foods', function(req, res, next) {
                  // json_agg(f.* ORDER BY f.id) as foods
  let id = req.params.id
  database.raw(`SELECT m.id, m.name,
                COALESCE(json_agg(f.* ORDER BY f.id) FILTER (WHERE f.id IS NOT NULL), '[]') AS foods
                FROM meals m
                LEFT JOIN meal_foods mf ON m.id = mf.meal_id
                LEFT JOIN foods f ON f.id = mf.food_id
                WHERE m.id=?
                GROUP BY m.id, m.name`, [id])
    .then((foods) => {
      if (!foods.rows.length == 1) {
        return res.sendStatus(404);
      } else {
        return res.status(200).json(foods.rows)
      }
    })
});

/* POST create joins record for existing food item and existing meal */
router.post('/:meal_id/foods/:food_id', function(req, res, next) {
  let meal_id = req.params.meal_id
  let food_id = req.params.food_id
  database.raw(`INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)`, [meal_id, food_id])
    .then(() => {
      return database.raw(`SELECT m.name AS meal_name, f.name AS food_name
                   FROM meals m
                   INNER JOIN meal_foods mf ON m.id = mf.meal_id
                   INNER JOIN foods f ON f.id = mf.food_id
                   WHERE m.id=? AND f.id=?`, [meal_id, food_id])
    })
    .then((result) => {
      if (!result.rows) {
        return res.sendStatus(404);
      } else {
        let names = result.rows[0]
        return res.status(200).json( { message: `Successfully added ${names.food_name} to ${names.meal_name}` } )
      }
    })
    .catch(err=>{
      return res.sendStatus(404);
    })
});

/* DELETE joins record for existing food item and existing meal */
router.delete('/:meal_id/foods/:food_id', function(req, res, next) {
  let meal_id = req.params.meal_id
  let food_id = req.params.food_id
  database.raw(`DELETE FROM meal_foods WHERE meal_id=? AND food_id=?`, [meal_id, food_id])
    .then(() => {
      return database.raw(`SELECT m.name AS meal_name, f.name AS food_name
                           FROM meals m, foods f
                           WHERE m.id=? AND f.id=?`, [meal_id, food_id])
      })
      .then((result) => {
        if (!result.rows) {
          return res.sendStatus(404);
        } else {
          let names = result.rows[0]
          return res.status(200).json( { message: `Successfully removed ${names.food_name} from ${names.meal_name}` } )
        }
      })
    .catch(err=>{
      return res.sendStatus(404);
    })
});

module.exports = router;
