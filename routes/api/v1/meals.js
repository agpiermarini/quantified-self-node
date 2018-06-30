var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)

/* GET all meals */
router.get('/', function(req, res, next) {
  database.raw('SELECT * FROM meals')
    .then((meals) => {
      if (!meals.rows) {
        return res.sendStatus(404);
      } else {
        return res.status(200).json(meals.rows)
      }
    })
});
//
// router.get('/', function(req, res, next) {
//   database.raw('SELECT * FROM foods')
//     .then((foods) => {
//       if (!foods.rows) {
//         return res.sendStatus(404);
//       } else {
//         return res.status(200).json(foods.rows);
//       }
//     })
// // });

module.exports = router;
