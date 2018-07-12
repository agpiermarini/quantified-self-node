const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Meal {

  static all () {
    return database.raw(`SELECT m.id, m.name,
                         COALESCE(json_agg(f.* ORDER BY f.id) FILTER (WHERE f.id IS NOT NULL), '[]') AS foods
                         FROM meals m
                         LEFT JOIN meal_foods mf ON m.id = mf.meal_id
                         LEFT JOIN foods f ON f.id = mf.food_id
                         GROUP BY m.id, m.name
                         ORDER BY id`)
      .then( meals => meals )
  }

  static find (req, res, next) {
    let id = req.params.id

    return database.raw(`SELECT m.id, m.name,
                         COALESCE(json_agg(f.* ORDER BY f.id) FILTER (WHERE f.id IS NOT NULL), '[]') AS foods
                         FROM meals m
                         LEFT JOIN meal_foods mf ON m.id = mf.meal_id
                         LEFT JOIN foods f ON f.id = mf.food_id
                         WHERE m.id=?
                         GROUP BY m.id, m.name`, [id])
      .then( meal => meal )
  }
}

module.exports = Meal;
