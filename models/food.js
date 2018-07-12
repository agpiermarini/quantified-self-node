const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Food {

  static all () {
    return database.raw('SELECT * FROM foods')
      .then(foods => foods )
  }

  static find (req) {
    let id = req.params.id

    return database.raw('SELECT * FROM foods WHERE id=?', [id])
      .then(food => food )
  }

  static create (req) {
    let name = req.body.food.name
    let calories = req.body.food.calories

    return database.raw(`INSERT INTO foods (name, calories)
                         VALUES (?, ?) RETURNING *`, [name, calories])
      .then(food => food )
      .catch(err => null )
  }

  static update (req) {
    let id = req.params.id
    let name = req.body.food.name
    let calories = req.body.food.calories

    return database.raw(`UPDATE foods SET name = ?, calories = ?
                         WHERE id = ? RETURNING *`, [name, calories, id])
      .then(food => food )
      .catch(err => null )
  }

  static delete (req) {
    let id = req.params.id

    return database.raw('DELETE FROM foods WHERE id = ?', [id])
      .then(food => food )
  }
}



module.exports = Food;
