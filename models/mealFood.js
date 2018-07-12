const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class MealFood {

  static create (req, res, next) {
    let meal_id = req.params.meal_id
    let food_id = req.params.food_id

    return database.raw(`INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)`, [meal_id, food_id])
      .then(() => {
        return database.raw(`SELECT m.name AS meal_name, f.name AS food_name
                             FROM meals m, foods f
                             WHERE m.id=? AND f.id=?`, [meal_id, food_id])
      })
      .then(new_meal => new_meal )
      .catch(err => res.sendStatus(404) )
  }

  static delete (req, res, next) {
    let meal_id = req.params.meal_id
    let food_id = req.params.food_id

    return database.raw(`DELETE FROM meal_foods WHERE meal_id=? AND food_id=?`, [meal_id, food_id])
      .then(() => {
        return database.raw(`SELECT m.name AS meal_name, f.name AS food_name
                             FROM meals m, foods f
                             WHERE m.id=? AND f.id=?`, [meal_id, food_id])
        })
        .then(result => {
          let names = result.rows[0]
          let msg = { message: `Successfully removed ${names.food_name} from ${names.meal_name}` }
          return result.rows ? res.status(200).json(msg) : res.sendStatus(404)
        })
        .catch(err => res.sendStatus(404))
  }

}


module.exports = MealFood
