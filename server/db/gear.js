const conn = require('./connection')

function getGearWithUsers(testDb) {
  const db = testDb || conn
  return db('gear')
    .join('users', 'gear.user_id', 'users.id')
}

function getGear(testDb) {
  const db = testDb || conn
  return db('gear')
    .select()
}

function getGearByGearId(id, testDb) {
  const db = testDb || conn
  return db('gear')
    .where({ id })
    .first()
}

function getGearByGearIdWithUser(id, testDb) {
  const db = testDb || conn
  return db('gear')
    .join('users', 'gear.user_id', 'users.id')
    .where('gear.id', id)
    .first()
}

function getGearByUserId(user_id, testDb) {
  const db = testDb || conn
  return db('gear')
    .where({ user_id })
}

function addGear(gear, testDb) {
  const db = testDb || conn
  return db.insert([gear], 'id').into('gear')
}

function updateGear(gear, id, testDb) {
  const db = testDb || conn
  return db('gear').where({ id }).update(gear)
}

function removeGearById(id, testDb) {
  const db = testDb || conn
  return db('gear').where({ id }).del()
}


module.exports = {
  getGearWithUsers,
  getGear,
  getGearByGearId,
  getGearByGearIdWithUser,
  getGearByUserId,
  addGear,
  updateGear,
  removeGearById
}

