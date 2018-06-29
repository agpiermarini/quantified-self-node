
exports.up = function(knex, Promise) {
  let createTable = `CREATE TABLE foods(
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT,
    calories INTEGER,
    created_at TIMESTAMP)`
  return knex.raw(createTable);
};

exports.down = function(knex, Promise) {
  let dropTable = `DROP TABLE foods`
  return knex.raw(dropTable);
};
