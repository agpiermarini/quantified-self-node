
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('ALTER TABLE meals DISABLE TRIGGER ALL')
  return knex.raw('TRUNCATE meals RESTART IDENTITY')
  return knex.raw('ALTER TABLE meals ENABLE TRIGGER ALL')
  .then(function () {
      return Promise.all([
        knex.raw('INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)', [1, 1]),
        knex.raw('INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)', [1, 2]),
        knex.raw('INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)', [2, 1]),
        knex.raw('INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)', [2, 2]),
        knex.raw('INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)', [3, 1]),
        knex.raw('INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)', [3, 2]),
        knex.raw('INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)', [4, 1]),
        knex.raw('INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)', [4, 2]),

    ])
  })
}
