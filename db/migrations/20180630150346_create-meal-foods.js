
exports.up = function(knex, Promise) {
  let createTable = `CREATE TABLE meal_foods(
                      id SERIAL PRIMARY KEY NOT NULL,
                      meal_id INTEGER,
                      food_id INTEGER)`
  return knex.raw(createTable);
};

exports.down = function(knex, Promise) {
  let dropTable = `DROP TABLE meal_foods`
  return knex.raw(dropTable);
};


// exports.up = function(knex, Promise) {
//   let createTable = `CREATE TABLE meal_foods(
//                       id SERIAL PRIMARY KEY NOT NULL,
//                       meal_id INTEGER NOT NULL,
//                       food_id INTEGER NOT NULL,
//                       FOREIGN KEY (meal_id) REFERENCES meals(id),
//                       FOREIGN KEY (food_id) REFERENCES foods(id))`
//   return knex.raw(createTable);
// };
//
// exports.down = function(knex, Promise) {
//   let dropTable = `DROP TABLE meal_foods`
//   return knex.raw(dropTable);
// };
