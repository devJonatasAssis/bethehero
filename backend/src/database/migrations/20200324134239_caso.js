
exports.up = function(knex) {
    return knex.schema.createTable('caso', function (table) {
        table.increments();
        table.string('titulo_caso').notNullable();
        table.string('desc_caso').notNullable();
        table.string('valor_caso').notNullable();
        
        table.string('ong_id').notNullable();
        table.foreign('ong_id').references('id').inTable('ong');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('caso');
  };
