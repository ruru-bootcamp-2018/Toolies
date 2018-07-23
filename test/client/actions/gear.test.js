const actions = require('../../../client/actions/gear')


describe('actions', () => {
    it('setting isFetching to true', () => {
        const expectedAction = {
            type: 'GEAR_REQUEST',
            isFetching: true,
            isSaving: false
        }
        expect(actions.requestGear()).toEqual(expectedAction)
    })
})

describe('actions', () => {
    it('is setting gear into state', () => {
        const gear =   {
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
            gear:gear,
            isFetching: false,
            isSaving: false
        }
        expect(actions.setGear(gear)).toEqual(expectedAction)
    })
})

describe('actions', () => {
    it('displaying a  gear error', () => {
        const message = 'error grabbing full gear list'
        const expectedAction = {
            type: 'GEAR_ERROR',
            isFetching: false,
            isSaving: false,
            message
        }
        expect(actions.gearError(message)).toEqual(expectedAction)
    })
})

describe('actions', () => {
    it('setting isSaving to true for adding gear', () => {
        const expectedAction = {
            type: 'REQUEST_GEAR_SAVE',
            isFetching: false,
            isSaving: true
        }
        expect(actions.requestGearSave()).toEqual(expectedAction)
    })
})

describe('actions', () => {
    it('should create a new gear item', () => {
        const item = 'Blender'
        const expectedAction = {
            type: 'GEAR_ADD',
            item
        }
        expect(actions.gearAdd(item)).toEqual(expectedAction)
    })
})
