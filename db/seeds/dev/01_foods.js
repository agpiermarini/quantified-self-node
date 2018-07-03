
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('foods').del()
    .then(function () {
      // Inserts seed entries
      return knex('foods').insert([
        {id: 1, name: 'Ramen', calories: 650},
        {id: 2, name: 'Coffee', calories: 50},
        {id: 3, name: 'Shumai', calories: 400}
      ]);
    });
};

// exports.seed = function(knex, Promise) {
//   // Deletes ALL existing entries
//   return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
//     .then(function () {
//       return Promise.all([
//         knex.raw('INSERT INTO foods (id, name, calories) VALUES (?, ?, ?)', [1, "Ramen", 650]),
//         knex.raw('INSERT INTO foods (id, name, calories) VALUES (?, ?, ?)', [2, "Coffee", 50]),
//         knex.raw('INSERT INTO foods (id, name, calories) VALUES (?, ?, ?)', [3, "Shumai", 400])
//     ])
//   })
// }
