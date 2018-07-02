
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('meals').del()
    .then(function () {
      // Inserts seed entries
      return knex('meals').insert([
        {id: 1, colName: 'Breakfast'},
        {id: 2, colName: 'Snack'},
        {id: 3, colName: 'Lunch'}
        {id: 4, colName: 'Dinner'}
      ]);
    });
};
