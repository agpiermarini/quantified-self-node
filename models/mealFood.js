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
      .then(new_meal_food => {
        let names = new_meal_food.rows[0]
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
        .then(delete_meal_food => {
          let names = delete_meal_food.rows[0]
          return { message: `Successfully removed ${names.food_name} from ${names.meal_name}` }
        })
        .catch(err => null )
  }

  static timesEaten () {
    // return database.raw(`SELECT count(meal_foods.food_id) as timesEaten,
    //                      COALESCE(json_agg((SELECT x FROM (SELECT foods.name, foods.calories) AS x)
    //                      ORDER BY foods.id GROUP BY foods.id) FILTER (WHERE foods.id IS NOT NULL), '[]') AS foods FROM meal_foods
    //                      JOIN foods ON meal_foods.food_id = foods.id GROUP BY meal_foods.food_id, foods.name, foods.id;`)
      // return database.raw(`SELECT count(foods.id) as timeseaten, foods.name, foods.calories
      //                     FROM meal_foods JOIN foods ON meal_foods.food_id = foods.id
      //                     GROUP BY meal_foods.food_id, foods.name, foods.calories;`)
      // return database.raw(`SELECT count(meal_foods.food_id) as timesEaten,
      //                     to_json(array_agg(DISTINCT foods.*)) AS foods
      //                     FROM meal_foods LEFT OUTER JOIN foods ON meal_foods.food_id = foods.id
      //                     GROUP BY meal_foods.food_id, foods.name, foods.id;`)
      return database.raw(`SELECT count(meal_foods.food_id) as timesEaten,
                          to_json(array_agg(DISTINCT (SELECT x FROM(SELECT foods.name, foods.calories) AS x))) AS foods
                          FROM meal_foods LEFT OUTER JOIN foods ON meal_foods.food_id = foods.id
                          GROUP BY meal_foods.food_id, foods.name, foods.id;`)
      .then(foodCounts => foodCounts)
  }
}


module.exports = MealFood
