
exports.up = function(knex, Promise) {
  let createTable = `CREATE TABLE foods(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    calories INTEGER NOT NULL)`
  return knex.raw(createTable);
};

exports.down = function(knex, Promise) {
  let dropTable = `DROP TABLE foods`
  return knex.raw(dropTable);
};
