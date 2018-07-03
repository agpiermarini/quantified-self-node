const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Food {

  static all (req, res, next) {
    return database.raw('SELECT * FROM foods')
      .then(foods => {
        return foods.rows ? res.status(200).json(foods.rows) : res.sendStatus(404)
    })
  }

  static find (req, res, next) {
    let id = req.params.id
    return database.raw('SELECT * FROM foods WHERE id=?', [id])
      .then(food => {
        return food.rows.length == 1 ? res.status(200).json(food.rows[0]) : res.sendStatus(404)
    })
  }

  static create (req, res, next) {
    let name = req.body.food.name
    let calories = req.body.food.calories

    return database.raw(`INSERT INTO foods (name, calories)
                         VALUES (?, ?) RETURNING *`, [name, calories])
      .then(food => res.status(200).json(food.rows[0]) )
      .catch(err => res.sendStatus(404))
  }
}


module.exports = Food;
