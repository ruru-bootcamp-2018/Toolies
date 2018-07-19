const conn = require('./connection')


function getGearWithUsers (testDb) {
  const db = testDb || conn
  return db('gear')
    .join('users', 'gear.user_id', 'users.id')
}

function getGear (testDb) {
  const db = testDb || conn
  return db('gear')
    .select()
}

function getGearByGearId (id, testDb) {
  const db = testDb || conn
  return db('gear')
    .where({id})
    .first()
}

function getGearByUserId (user_id, testDb) {
  const db = testDb || conn
  return db('gear')
    .where({user_id})
}

function addGear(gear, testDb) {
  const db = testDb || conn
  return db('gear').insert(gear)
}

function updateGear(gear, id, testDb) {
  const db = testDb || conn
  return db('gear').where({id}).update(gear)
}


module.exports = {
  getGearWithUsers,
  getGear,
  getGearByGearId,
  getGearByUserId,
  addGear,
  updateGear
}

// need testing