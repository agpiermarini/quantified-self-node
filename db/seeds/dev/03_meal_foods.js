
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('meal_foods').del()
  .then(function () {
    return knex('meal_foods').insert([
      {id: 1, meal_id: 1, food_id: 1},
      {id: 2, meal_id: 1, food_id: 2},
      {id: 3, meal_id: 2, food_id: 1},
      {id: 4, meal_id: 2, food_id: 2},
      {id: 5, meal_id: 3, food_id: 1},
      {id: 6, meal_id: 3, food_id: 2},
      {id: 7, meal_id: 4, food_id: 1},
      {id: 8, meal_id: 4, food_id: 2}
    ]);
  })
}
//       return Promise.all([
//         knex.raw('INSERT INTO meal_foods (id, meal_id, food_id) VALUES (?, ?, ?)', [1, 1, 1]),
//         knex.raw('INSERT INTO meal_foods (id, meal_id, food_id) VALUES (?, ?, ?)', [2, 1, 2]),
//         knex.raw('INSERT INTO meal_foods (id, meal_id, food_id) VALUES (?, ?, ?)', [3, 2, 1]),
//         knex.raw('INSERT INTO meal_foods (id, meal_id, food_id) VALUES (?, ?, ?)', [4, 2, 2]),
//         knex.raw('INSERT INTO meal_foods (id, meal_id, food_id) VALUES (?, ?, ?)', [5, 3, 1]),
//         knex.raw('INSERT INTO meal_foods (id, meal_id, food_id) VALUES (?, ?, ?)', [6, 3, 2]),
//         knex.raw('INSERT INTO meal_foods (id, meal_id, food_id) VALUES (?, ?, ?)', [7, 4, 1]),
//         knex.raw('INSERT INTO meal_foods (id, meal_id, food_id) VALUES (?, ?, ?)', [8, 4, 2])
//     ])
//   })
// }
