
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
    .then(function () {
      return Promise.all([
        knex.raw('INSERT INTO foods (id, name, calories) VALUES (?, ?)', [1, "Ramen", 650]),
        knex.raw('INSERT INTO foods (id, name, calories) VALUES (?, ?)', [2, "Coffee", 50]),
        knex.raw('INSERT INTO foods (id, name, calories) VALUES (?, ?)', [3, "Shumai", 400])
    ])
  })
}
