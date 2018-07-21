var hash = require('../auth/hash')
const conn = require('./connection')

function createUser (user_name, first_name, last_name, email_address, password, testDb) {
  const db = testDb || conn
  return new Promise ((resolve, reject) => {
    hash.generate(password, (err, hash) => {
      if (err) reject(err)
      db('users')
        .insert({user_name, first_name, last_name, email_address, hash})
        .then(user_id => resolve(user_id))
        .catch(err => reject(err))
    })
  })
}

function userExists (user_name, testDb) {
  const db = testDb || conn
  return db('users')
    .where('user_name', user_name)
    .first()
    .then(user => !!user)
}

// all boilerplate code above this line

function getUserByName (user_name, testDb) {
  const db = testDb || conn
  return db('users')
    .where('user_name', user_name)
    .first()
}

function getUserById (id, testDb) {
  const db = testDb || conn
  return db('users')
    .where('id', id)
    .first()
}

function getUsers (testDb) {
  const db = testDb || conn
  return db('users')
    .select()
}

function updateUser (id, newUser, testDb) {
  const db = testDb || conn
  return db('users')
    .where({id})
    .update(newUser)
}



module.exports = {
  createUser,
  userExists,
  getUserByName,
  getUserById,
  getUsers,
  updateUser
}


// to test