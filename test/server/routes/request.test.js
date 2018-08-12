const server = require('../../../server/server')
const request = require('supertest')(server)
const { createToken } = require('../../../server/auth/token')

require('dotenv').config()

jest.mock('../../../server/db/requests', () => ({
    insertRequest: (fakeRequest) => Promise.resolve([1]),
    getRequests: null,
    updateRequest: (id, update) => Promise.resolve(1),
    deleteRequest: id => (typeof id === 'number') ? Promise.resolve(1) : Promise.reject()
}))

describe('request router tests', () => {
    const fakeUser = {
        user_id: 1,
        user_name: 'Phoney'
    }

    const fakeToken = createToken(fakeUser, process.env.JWT_SECRET)

    it('post new request', () => {
        const fakeRequest = {
            gear_id: '1',
            owner_id: '1',
            requester_id: '2',
            created_at: 12387612,
            message: "Hey I like your drill, it's not bad. Can I have?"
        }

        return request.post('/api/request/new')
            .set('Authorization', `Bearer ${fakeToken}`)
            .send(fakeRequest)
            .expect(201)
    })

    it('update request', () => {
        const id = 1

        const fakeUpdate = {
            message: 'new message'
        }

        return request.put(`/api/request/update/${id}`)
            .set('Authorization', `Bearer ${fakeToken}`)
            .send(fakeUpdate)
            .expect(200)
    })

    it('delete request', () => {
        const id = 1

        return request.delete(`/api/request/delete/${id}`)
            .set('Authorization', `Bearer ${fakeToken}`)
            .send()
            .expect(200)
    })
})