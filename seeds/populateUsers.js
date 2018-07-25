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
          email_address: 'adams.b.w@hotmail.com',
          profile_pic: '/images/profiles/4.jpg',
          hash: '$2a$12$3AFD0RA3To2A/rsyvJ/SjO6Z4JbrbZv2a7RJaQHZSYi/ZGrkeb7KK'
        },
        {
          id: 2,
          first_name: 'Hayden',
          last_name: 'Blummont',
          user_name: 'haydenb23',
          email_address: 'hblummont@gmail.com',
          profile_pic: '/images/profiles/3.jpg',
          hash: '$2a$12$3AFD0RA3To2A/rsyvJ/SjO6Z4JbrbZv2a7RJaQHZSYi/ZGrkeb7KK'
        },
        {
          id: 3,
          first_name: 'Reuben',
          last_name: 'Harcourt',
          user_name: 'Reuban',
          email_address: 'rjharcourt@gmail.com',
          profile_pic: '/images/profiles/2.jpg',
          hash: '$2a$12$3AFD0RA3To2A/rsyvJ/SjO6Z4JbrbZv2a7RJaQHZSYi/ZGrkeb7KK'
        },
        {
          id: 4,
          first_name: 'Stan',
          last_name: 'Dan',
          user_name: 'Diddly',
          email_address: 'stan.roache@gmail.com',
          profile_pic: '/images/profiles/1.jpg',
          hash: '$2a$12$3AFD0RA3To2A/rsyvJ/SjO6Z4JbrbZv2a7RJaQHZSYi/ZGrkeb7KK'
        }
      ]);
    });
};
