const gear = require('../../../server/db/gear')
const env = require('./test-environment')

let testDb = null
beforeEach(() => {
  testDb = env.getTestDb()
  return env.initialise(testDb)
})
afterEach(() => env.cleanup(testDb))

// boilerplate code above this point

const fakeUser = {
  id: 1,
  username: 'billyboi',
  first_name: 'bill',
  last_name: 'murray',
  email_address: 'bill@murray.com'
}

const fakeGearItem = {
  status: "Available",
  trustframework: "One",
  name: 'Dyna Drill',
  description: 'A drill that can be used on concrete',
  photo_url: 'https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/hires/2013/juigjhfj.jpg',
  user_id: 1
}

const fakeGearItemUpdate = {
  name: 'Dyno Drilla'
}

test('addGear function returns an ID of type numbers', done => {
  gear.addGear(fakeGearItem, testDb)
    .then(ids => {
      const expected = 'number'
      const actual = typeof ids[0]
      expect(actual).toBe(expected)
      done()
    })
})

test('updateGear function causes one record to be changed', done => {
  gear.updateGear(fakeGearItemUpdate, 1, testDb)
    .then(numUpdated => {
      expect(numUpdated).toBe(1)
      done()
    })
})








// test('getLost pets db function', () => {
//   return db.getLost(testDb)
//     .then(lostPets => {
//       expect(lostPets).toHaveLength(10)
//     })
// })

// test('add a lost pet to db', () => {
//   return db.addLost({name: 'Hayden'}, testDb)
//     .then(lostPet => {
//         expect(lostPet).toEqual([11])
//         return testDb('lost')
//           .then(lostPets => {
//             expect(lostPets).toHaveLength(11)
//             expect(lostPets[10].name).toBe('Hayden')
//           })
//         })
//       })

//     test('getFound pets db function', () => {
//         return db.getFound(testDb)
//           .then(foundPets => {
//             expect(foundPets).toHaveLength(10)
//           })
//     })

//       test('add a found pet to db', () => {
//         return db.addFound(testFoundPet, testDb)
//           .then(foundPet => {
//               expect(foundPet).toEqual([11])
//               return testDb('found')
//                 .then(foundPets => {
//                   expect(foundPets).toHaveLength(11)
//                 })
//               })
//             })
