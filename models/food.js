const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Food {

  static all (req, res, next) {
    return database.raw('SELECT * FROM foods').then(foods => {
      return foods.rows ? res.status(200).json(foods.rows) : res.sendStatus(404)
    })
  }

  static find (req, res, next) {
    let id = req.params.id
    return database.raw('SELECT * FROM foods WHERE id=?', [id]).then(food => {
      return food.rows.length == 1 ? res.status(200).json(food.rows[0]) : res.sendStatus(404)
    })
  }

}


module.exports = Food;
