
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('ALTER TABLE foods DISABLE TRIGGER ALL')
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
  return knex.raw('ALTER TABLE foods ENABLE TRIGGER ALL')
    .then(function () {
      return Promise.all([
        knex.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ["Ramen", 650]),
        knex.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ["Coffee", 50]),
        knex.raw('INSERT INTO foods (name, calories) VALUES (?, ?)', ["Shumai", 400])
    ])
  })
}
