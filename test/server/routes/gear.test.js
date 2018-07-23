const server = require('../../../server/server')
const request = require('supertest')(server)
const { createToken } = require('../../../server/auth/token')

require('dotenv').config()

jest.mock('../../../server/db/gear', () => ({
  getGearByGearId: (id) => {
    return (id
      ? Promise.resolve({ id, name: 'doodad', description: 'cool as' })
      : Promise.reject('database err')
    )
  },
  getGearWithUsers: null,
  getGear: () => Promise.resolve([1, 2, 3]),
  getGearByUserId: null,
  addGear: () => Promise.resolve([1]),
  updateGear: (updateInfo, itemID) => Promise.resolve((itemID == 1) ? 1 : 0),
  removeGearById: id => Promise.resolve((id == 1) ? 1 : 0)
}))

describe('gear route tests', () => {
  describe('public routes', () => {

    describe('get single item', () => {
      it('returns with gear item', () => {
        const id = 1

        return request.get(`/api/gear/single/${id}`)
          .expect(200)
          .then(res => {
            const gearItem = res.body

            expect(gearItem.id).toBe(id)
          })
      })

      it('throws err if database fails', () => {
        const id = 0

        return request.get(`/api/gear/single/${id}`)
          .expect(500)
      })

    })

    it('get request for all gear', () => {
      return request.get(`/api/gear/all`)
        .expect(200)
        .then(res => {
          const gearList = res.body

          expect(gearList).toHaveLength(3)
        })
    })
  })

  describe('protected routes', () => {
    const fakeUser = {
      user_id: 1,
      user_name: 'Phoney'
    }

    const fakeToken = createToken(fakeUser, process.env.JWT_SECRET)

    it('can post new gear item', () => {
      const fakeGear = {
        name: 'hand mincer',
        description: 'slow',
        user_id: 1,
        status: "Available",
        trustframework: "One",
        photo_url: 'https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/hires/2013/juigjhfj.jpg'
      }

      return request.post('/api/gear/new')
        .set('Authorization', `Bearer ${fakeToken}`)
        .send(fakeGear)
        .expect(200)
        .then(res => {
          expect(res.body.gear).toBeTruthy()
        })
    })

    it('can update gear item', () => {
      const fakeGearUpdate = {
        name: 'electric mincer',
      }

      const id = 1

      return request.post(`/api/gear/update/${id}`)
        .set('Authorization', `Bearer ${fakeToken}`)
        .send(fakeGearUpdate)
        .expect(200)
        .then(res => {
          expect(res.body.numUpdates).toBe(1)
        }) 
    })

    it('can delete gear item', () => {
      const id = 1

      return request.delete(`/api/gear/delete/${id}`)
        .set('Authorization', `Bearer ${fakeToken}`)
        .send()
        .expect(200) 
    })
  })
})