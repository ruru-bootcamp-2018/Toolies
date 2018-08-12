const server = require('../../../server/server')
const request = require('supertest')(server)
const { createToken } = require('../../../server/auth/token')

require('dotenv').config()

jest.mock('../../../server/db/users', () => ({
    createUser: null,
    userExists: null,
    getUserByName: name => Promise.resolve({ user_name: 'Phoney' }),
    getUserById: null,
    getUsers: null,
    updateUser: (id, newUserObj) => Promise.resolve(1)
}))

jest.mock('../../../server/db/requests', () => ({
    getRequests: id => Promise.resolve([2, 1]),
    insertRequest: null
}))

jest.mock('../../../server/db/gear', () => ({
    getGearWithUsers: null,
    getGear: null,
    getGearByGearId: null,
    getGearByGearIdWithUser: null,
    getGearByUserId: id => Promise.resolve([1, 2]),
    addGear: null,
    updateGear: null,
    removeGearById: null
}))

describe('user route tests', () => {
    const fakeUser = {
        user_id: 1,
        user_name: 'Phoney'
    }

    const fakeToken = createToken(fakeUser, process.env.JWT_SECRET)

    const fakeUpdate = ({
        info: 'info'
    })

    it('update user route returns 200', () => {
        return request.put('/api/user/update')
            .set('Authorization', `Bearer ${fakeToken}`)
            .send(fakeUpdate)
            .expect(200)
    })

    it('get fullprofile returns the correct full User', () => {
        const fakeGearArray = [1, 2]

        const fakeRequests = [2, 1]

        return request.get('/api/user/fullProfile')
            .set('Authorization', `Bearer ${fakeToken}`)
            .expect(200)
            .then(res => {
                expect(res.body.user_name).toEqual(fakeUser.user_name)
                expect(res.body.gear).toEqual(fakeGearArray)
                expect(res.body.messages).toEqual(fakeRequests)
            })
    })
})