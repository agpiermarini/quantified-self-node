
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE meal_foods RESTART IDENTITY')
  return knex.raw('TRUNCATE meals RESTART IDENTITY')
    .then(function () {
      return Promise.all([
        knex.raw('INSERT INTO meals (id, name) VALUES (?, ?)', [1, "Breakfast"]),
        knex.raw('INSERT INTO meals (id, name) VALUES (?, ?)', [2, "Lunch"]),
        knex.raw('INSERT INTO meals (id, name) VALUES (?, ?)', [3, "Snack"]),
        knex.raw('INSERT INTO meals (id, name) VALUES (?, ?)', [4, "Dinner"])
    ])
  })
}
