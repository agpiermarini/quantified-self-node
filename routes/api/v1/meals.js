var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)

/* GET all meals */
router.get('/', function(req, res, next) {
  database.raw(`SELECT m.id, m.name, json_agg(f.* ORDER BY f.id) as foods
                FROM meals m INNER JOIN meal_foods mf ON m.id = mf.meal_id
                INNER JOIN foods f ON f.id = mf.food_id
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

module.exports = router;
