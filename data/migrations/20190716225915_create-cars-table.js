exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl
      .string('VIN', 128)
      .unique()
      .notNullable();
    tbl.string('make', 128).notNullable();
    tbl.string('model', 128).notNullable();
    tbl.decimal('mileage').notNullable();
    tbl.string('transmissionType', 128);
    tbl.string('titleStatus');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
