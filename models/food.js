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

  static update (req, res, next) {
    let id = req.params.id
    let name = req.body.food.name
    let calories = req.body.food.calories

    return database.raw(`UPDATE foods SET name = ?, calories = ?
                         WHERE id = ? RETURNING *`, [name, calories, id])
      .then(food => {
        return food.rows.length == 1 ? res.status(200).json(food.rows[0]) : res.sendStatus(404)
      })
      .catch(err => res.sendStatus(404) )
  }

  static delete (req, res, next) {
    let id = req.params.id

    return database.raw('DELETE FROM foods WHERE id = ?', [id])
      .then(food =>  food.rows ? res.sendStatus(204) : res.sendStatus(404) )
  }
}



module.exports = Food;
