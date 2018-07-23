
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('gear', table => {
      table.increments('id').primary()
      table.string('status')
      table.string('trustframework')
      table.string('name')
      table.string('description')
      table.string('photo_url')
      table.integer('user_id')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('gear')
  };
