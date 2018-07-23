
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('users', table => {
      table.increments('id').primary()
      table.string('first_name')
      table.string('last_name')
      table.string('user_name')
      table.string('email_address')
      table.string('profile_pic')
      table.string('hash')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users')
  };

