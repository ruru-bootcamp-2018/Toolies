const {hashSync} = require('bcrypt')
const saltRounds = 10

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          first_name: 'Bradley',
          last_name: 'Adams',
          user_name: 'wayneric',
          email_address: 'brad@devacademy.co.nz',
          hash: hashSync('Krang', saltRounds)
        },
        {
          id: 2,
          first_name: 'Haydeen',
          last_name: 'Blumont',
          user_name: 'haydiggidydoc',
          email_address: 'hblummont1@gmail.com',
          hash: hashSync('Krang', saltRounds)
        },
        {
          id: 3,
          first_name: 'Reuben',
          last_name: 'Harcourt',
          user_name: 'Reuban',
          email_address: 'reuban@imrich.co.usa',
          hash: hashSync('Krang', saltRounds)
        },
        {
          id: 4,
          first_name: 'Stan',
          last_name: 'Dan',
          user_name: 'Diddly',
          email_address: 'diddly@imcool.co.usa',
          hash: hashSync('Krang', saltRounds)
        }
      ]);
    });
};
