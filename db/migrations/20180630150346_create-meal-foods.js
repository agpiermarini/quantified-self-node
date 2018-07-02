
exports.up = function(knex, Promise) {
  let createTable = `CREATE TABLE meal_foods(
                      id SERIAL PRIMARY KEY NOT NULL,
                      meal_id INTEGER REFERENCES meals ON DELETE CASCADE,
                      food_id INTEGER REFERENCES foods ON DELETE CASCADE)`
  return knex.raw(createTable);
};

exports.down = function(knex, Promise) {
  let dropTable = `DROP TABLE meal_foods`
  return knex.raw(dropTable);
};
