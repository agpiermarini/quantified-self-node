
exports.up = function(knex, Promise) {
  let createTable = `CREATE TABLE meals(
                    id SERIAL PRIMARY KEY NOT NULL,
                    name TEXT NOT NULL)`
  return knex.raw(createTable);
};

exports.down = function(knex, Promise) {
  let dropTable = `DROP TABLE meals`
  return knex.raw(dropTable);
};
