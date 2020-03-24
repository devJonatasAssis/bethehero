
exports.up = function(knex) {
  return knex.schema.createTable('ong', function (table) {
      table.string('id').primary();
      table.string('nome_ong').notNullable();
      table.string('email_ong').notNullable();
      table.string('whatsapp_ong').notNullable();
      table.string('cidade_ong').notNullable();
      table.string('uf_ong', 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ong');
};
