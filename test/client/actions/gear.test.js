import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../../client/actions/gear'
import {
    requestGear,
    setGear,
    gearError,
    requestGearSave,
    gearAdd,
    editGearItem,
    editRequest,
    editGear
} from '../../../client/actions/gear'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../../../client/utils/api', () => (method, url, data) => {
    switch (`${method}-${url}`) {
        case 'get-gear/all':
            return Promise.resolve({
                body: [
                    'Drill',
                    'Another Drill'
                ]
            })
        case 'post-gear/new':
            return Promise.resolve({
                body: data
            })
        case 'put-gear/update/1':
            return Promise.resolve()
        default:
            return null
    }
})

describe('thunk tests', () => {
    let store

    beforeEach(() => {
        store = mockStore({})
    })

    it('getGear dispatches success actions correctly', () => {
        const fakeGearList = [
            'Drill',
            'Another Drill'
        ]

        const expectedActions = [
            requestGear(),
            setGear(fakeGearList)
        ]

        return store.dispatch(
            actions.getGear()
        )
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            })
    })

    it('addGearItem dispatches success actions', () => {
        const fakeGear = { name: 'drill' }

        const expectedActions = [
            requestGearSave(),
            gearAdd(fakeGear)
        ]

        return store.dispatch(
            actions.addGearItem(fakeGear)
        )
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            })
    })

    it('editGearItem success actions', () => {
        const fakeUpdate = {
            id: 1,
            name: 'drill'
        }

        const expectedActions = [
            editRequest(),
            editGear(fakeUpdate)
        ]

        return store.dispatch(
            actions.editGearItem(fakeUpdate)
        )
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    })
})

describe('sync action tests', () => {
    it('requestGear action', () => {
        const expectedAction = {
            type: 'GEAR_REQUEST',
            isFetching: true,
            isSaving: false
        }
        expect(actions.requestGear()).toEqual(expectedAction)
    })

    it('setGear', () => {
        const gear = {
            id: 1,
            status: "Available",
            trustframework: "One",
            name: 'Dyna Drill',
            description: 'A drill that can be used on concrete',
            photo_url: 'https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/hires/2013/juigjhfj.jpg',
            user_id: 1
        }
        const expectedAction = {
            type: 'SET_GEAR',
            gear: gear,
            isFetching: false,
            isSaving: false
        }
        expect(actions.setGear(gear)).toEqual(expectedAction)
    })

    it('gearError action', () => {
        const message = 'error grabbing full gear list'
        const expectedAction = {
            type: 'GEAR_ERROR',
            isFetching: false,
            isSaving: false,
            message
        }
        expect(actions.gearError(message)).toEqual(expectedAction)
    })

    it('requestGearSave', () => {
        const expectedAction = {
            type: 'REQUEST_GEAR_SAVE',
            isFetching: false,
            isSaving: true
        }
        expect(actions.requestGearSave()).toEqual(expectedAction)
    })

    it('gearAdd', () => {
        const item = 'Blender'
        const expectedAction = {
            type: 'GEAR_ADD',
            item
        }
        expect(actions.gearAdd(item)).toEqual(expectedAction)
    })
})