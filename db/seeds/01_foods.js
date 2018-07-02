
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
    .then(function () {
      return Promise.all([
        knex.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ["Ramen", 650]),
        knex.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ["Coffee", 50]),
        knex.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ["Shumai", 400])
    ])
  })
}
