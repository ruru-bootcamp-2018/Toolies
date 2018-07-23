const server = require('../../../server/server')
const request = require('supertest')(server)
const { createToken } = require('../../../server/auth/token')

require('dotenv').config()

jest.mock('../../../server/db/requests', () => ({
    insertRequest: (fakeRequest) => Promise.resolve([1]),
    getRequests: () => {}
}))

describe('request router tests', () => {
    const fakeUser = {
        user_id: 1,
        user_name: 'Phoney'
    }

    const fakeToken = createToken(fakeUser, process.env.JWT_SECRET)

    const fakeRequest =  { 
        gear_id: '1', 
        owner_id: '1', 
        requester_id: '2', 
        created_at: 12387612, 
        message: "Hey I like your drill, it's not bad. Can I have?" 
      }

    it('post new request', () => {
        return request.post('/api/request/new')
            .set('Authorization', `Bearer ${fakeToken}`)
            .send(fakeRequest)
            .expect(200)
    })
})