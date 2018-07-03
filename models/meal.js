const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Meal {

  static all (req, res, next) {
    return database.raw(`SELECT m.id, m.name,
                         COALESCE(json_agg(f.* ORDER BY f.id) FILTER (WHERE f.id IS NOT NULL), '[]') AS foods
                         FROM meals m
                         LEFT JOIN meal_foods mf ON m.id = mf.meal_id
                         LEFT JOIN foods f ON f.id = mf.food_id
                         GROUP BY m.id, m.name
                         ORDER BY id`)
      .then( meals => {
        return meals.rows ? res.status(200).json(meals.rows) : res.sendStatus(404)
      })
  }

  
}

module.exports = Meal;