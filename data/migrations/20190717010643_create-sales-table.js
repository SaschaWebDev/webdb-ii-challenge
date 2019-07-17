exports.up = function(knex) {
  return knex.schema.createTable('sales', tbl => {
    tbl.increments();
    tbl.boolean('sold');
    tbl
      .bigInteger('CarId')
      .unsigned()
      .index()
      .references('id')
      .inTable('cars');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('sales');
};
