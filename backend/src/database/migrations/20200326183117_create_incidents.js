// Método up é responsável pela criação da tabela
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function (table) {
    table.increments();

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('ong_id').notNullable();

    table.foreign('ong_id').references('id').inTable('ongs');
  })
};

// Caso precise voltar atrás, o método down será chamado
exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
