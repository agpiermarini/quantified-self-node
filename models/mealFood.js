const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class MealFood {

  static create (req) {
    let meal_id = req.params.meal_id
    let food_id = req.params.food_id

    return database.raw(`INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)`, [meal_id, food_id])
      .then(() => {
        return database.raw(`SELECT m.name AS meal_name, f.name AS food_name
                             FROM meals m, foods f
                             WHERE m.id=? AND f.id=?`, [meal_id, food_id])
      })
      .then(result => {
        let names = result.rows[0]
        return { message: `Successfully added ${names.food_name} to ${names.meal_name}` }
      })
      .catch(err => null )
  }

  static delete (req) {
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
          return { message: `Successfully removed ${names.food_name} from ${names.meal_name}` }
        })
        .catch(err => null )
  }

}


module.exports = MealFood
