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
          profile_pic: 'https://i.ebayimg.com/images/g/AmAAAOSwPydZpDlm/s-l300.jpg',
          hash: '$2a$12$3AFD0RA3To2A/rsyvJ/SjO6Z4JbrbZv2a7RJaQHZSYi/ZGrkeb7KK'
        },
        {
          id: 2,
          first_name: 'Haydeen',
          last_name: 'Blumont',
          user_name: 'haydiggidydoc',
          email_address: 'hblummont1@gmail.com',
          profile_pic: 'http://getdrawings.com/img/person-silhouette-standing-4.jpg',
          hash: '$2a$12$3AFD0RA3To2A/rsyvJ/SjO6Z4JbrbZv2a7RJaQHZSYi/ZGrkeb7KK'
        },
        {
          id: 3,
          first_name: 'Reuben',
          last_name: 'Harcourt',
          user_name: 'Reuban',
          email_address: 'reuban@imrich.co.usa',
          profile_pic: 'http://getdrawings.com/img/person-silhouette-standing-4.jpg',
          hash: '$2a$12$3AFD0RA3To2A/rsyvJ/SjO6Z4JbrbZv2a7RJaQHZSYi/ZGrkeb7KK'
        },
        {
          id: 4,
          first_name: 'Stan',
          last_name: 'Dan',
          user_name: 'Diddly',
          email_address: 'diddly@imcool.co.usa',
          profile_pic: 'http://getdrawings.com/img/person-silhouette-standing-4.jpg',
          hash: '$2a$12$3AFD0RA3To2A/rsyvJ/SjO6Z4JbrbZv2a7RJaQHZSYi/ZGrkeb7KK'
        }
      ]);
    });
};
